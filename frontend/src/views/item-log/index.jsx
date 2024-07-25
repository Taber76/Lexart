import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { setDeletedProducts } from '../../store/productsSlice';
import { List } from '../../components';

const ItemsLog = () => {
  const items = useSelector(state => state.products.deletedProducts)
  const dispatch = useDispatch();

  const columnWidths = {
    brand: '10%',
    model: '15%',
    description: '40%',
    quantity: '15%',
    updated_at: '20%',
  }

  useEffect(() => {
    const getItems = async () => {
      const res = await apiService.get('products/getDeleted')
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
        dispatch(setDeletedProducts(itemsList))
      } else {
        activeModal('Não foi possível carregar os itens.')
      }
    }

    if (items.length === 0) {
      getItems()
    }

  }, [])

  return (
    <div className="py-4 md:py-6 bg-gray-100">

      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-700 w-1/2">Produtos excluídos</h2>

        <div className="flex flex-col gap-4 mt-4 w-2/3">

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

            </div>
          </div>

          {items.length > 0 && (
            <List
              items={items}
              columnWidths={columnWidths}
              handleDelete={() => setDeleteItem(prevDeleteItem => !prevDeleteItem)}
              type="products"
              options={false}
            />)}

        </div>
      </div>
    </div>
  )

}

export { ItemsLog }