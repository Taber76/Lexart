import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, List } from '../../components';

const Items = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [itemList, setItemList] = useState([])
  const [deleteItem, setDeleteItem] = useState(false)
  const navigate = useNavigate()

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  const columnWidths = {
    brand: '10%',
    model: '10%',
    description: '40%',
    quantity: '15%',
    updated_at: '15%',
  }

  useEffect(() => {
    const getItems = async () => {
      const res = await apiService.get('products/getall')
      if (res.status === 200) {
        const data = await res.json()
        const items = data.products.map(({ image, active, created_at, ...rest }) => rest)
        if (window.innerWidth < 640) {
          items.forEach((item) => {
            item.brand = `Marca: ${item.brand}`
            item.model = `Modelo: ${item.model}`
            item.description = `Descrição: ${item.description}`
            item.quantity = `Estoque: ${item.quantity}`
            item.updated_at = `Atualizado: ${item.updated_at}`
          })
        }
        setItemList(items)
      } else {
        activeModal('Não foi possível carregar os itens.')
      }
    }

    getItems()
  }, [deleteItem])

  return (
    <div className="py-4 md:py-6 bg-gray-100">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-700">Produtos</h2>
        <div className="flex flex-col gap-4 mt-4 w-2/3">

          {showModal && (
            <Modal
              text={modalText}
              width="300px"
              height="150px"
              color="blue"
              textColor="white"
              margin="0"
            />
          )}

          <div className="hidden sm:block flex items-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row bg-blue-500 rounded-md shadow-md p-4 w-full">

              <div className={`mb-2 sm:mb-0 items-center justify-center flex`} style={{ minWidth: `${columnWidths.brand}` }}>
                <h3 className="text-md text-white font-semibold">Marca</h3>
              </div>

              <div className={`mb-2 sm:mb-0 items-center justify-center flex`} style={{ minWidth: `${columnWidths.model}` }}>
                <h3 className="text-md text-white font-semibold">Modelo</h3>
              </div>

              <div className={`mb-2 sm:mb-0 items-center justify-center flex`} style={{ minWidth: `${columnWidths.description}` }}>
                <h3 className="text-md text-white font-semibold">Descrição</h3>
              </div>

              <div className={`mb-2 sm:mb-0 items-center justify-center flex`} style={{ minWidth: `${columnWidths.quantity}` }}>
                <h3 className="text-md text-white font-semibold">Estoque</h3>
              </div>

              <div className={`mb-2 sm:mb-0 items-center justify-center flex`} style={{ minWidth: `${columnWidths.updated_at}` }}>
                <h3 className="text-md text-white font-semibold">Atualizado</h3>
              </div>

              <div className={`flex items-center justify-end mb-2 sm:mb-0`} style={{ minWidth: `10%` }}>
                <FaPlus
                  className="text-green-500 mr-2 cursor-pointer"
                  title="Novo"
                  onClick={() => navigate('/items/register')}
                />
              </div>

            </div>
          </div>

          {itemList && (
            <List
              items={itemList}
              columnWidths={columnWidths}
              handleDelete={() => setDeleteItem(prevDeleteItem => !prevDeleteItem)}
              type="products"
            />)}

        </div>
      </div>
    </div>
  )

}

export { Items }