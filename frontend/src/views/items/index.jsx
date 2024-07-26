import { FaPlus, FaSync } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { setProducts } from '../../store/productsSlice';
import { Modal, List, Filter } from '../../components';

const Items = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const items = useSelector(state => state.products.products)
  const filteredItems = useSelector(state => state.products.filteredProducts)
  const dispatch = useDispatch();
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
    const maxAttempts = 3
    let attempts = 0

    const getItems = async () => {
      const res = await apiService.get('products/getall')
      if (res.status === 200) {
        const data = await res.json()
        const itemsList = data.products.map(({ image, active, created_at, ...rest }) => rest)
        if (window.innerWidth < 640) {
          itemsList.forEach((item) => {
            item.brand = `Marca: ${item.brand}`
            item.model = `Modelo: ${item.model}`
            item.description = `Descrição: ${item.description}`
            item.quantity = `Estoque: ${item.quantity}`
            item.updated_at = `Atualizado: ${item.updated_at}`
          })
        }
        dispatch(setProducts(itemsList))
      } else {
        activeModal('Não foi possível carregar os itens.')
      }
    }
    const attemptFetch = () => {
      if (items.length === 0 && attempts < maxAttempts) {
        attempts++
        getItems()
      }
      if (attempts >= maxAttempts) {
        clearInterval(interval)
      }
    }

    if (items.length === 0) {
      getItems()
      const interval = setInterval(attemptFetch, 10000)
      return () => clearInterval(interval)
    }

  }, [filteredItems, items])


  const handleRefreshProducts = async () => {
    const res = await apiService.reloadProducts();
    if (res) dispatch(setProducts(res));
  }


  return (
    <div className="py-4 md:py-6 bg-gray-100">

      <div className="flex flex-col text-center items-center">
        <div className="flex text-center items-center">
          <h2 className="flex items-center text-2xl font-bold text-gray-700 w-1/2">
            Produtos
            <FaSync
              className="text-blue-500 ml-2 cursor-pointer "
              style={{ fontSize: '12px' }}
              title="Refresh"
              onClick={handleRefreshProducts}
            />
          </h2>
          <div className="flex gap-1">
            <Filter type='brand' />
            <Filter type='model' />
          </div>
        </div>

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

          {filteredItems.length > 0 && (
            <List
              items={filteredItems}
              columnWidths={columnWidths}
              handleDelete={() => setDeleteItem(prevDeleteItem => !prevDeleteItem)}
              type="products"
              options={true}
            />)}

        </div>
      </div>
    </div>
  )

}

export { Items }