import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormRegister } from '../../components';

const ItemUpdate = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navegate = useNavigate()

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  useEffect(() => {
    const getData = async () => {
      const res = await apiService.get(`products/getById/${location.state.item_id}`)
      if (res.status === 200) {
        const data = await res.json();
        setFormData(data.product)
      } else {
        activeModal('Erro ao obter os dados do produto.', 2500)
      }
    }
    getData()
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await apiService.postPut('PUT', 'products/update/' + location.state.item_id, formData)
      if (res.status === 200) {
        activeModal("Produto atualizado com sucesso.", 1500)
        setTimeout(() => {
          navegate('/items')
        }, 1500)
      } else {
        activeModal("Erro ao tentar atualizar o produto.", 2500)
      }
    } catch (error) {
      activeModal("Erro ao tentar atualizar o produto.", 2500)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const formDetail = [
    { type: 'text', name: 'brand', value: formData.brand, onChange: handleChange, required: true, placeholder: 'Marca' },
    { type: 'text', name: 'model', value: formData.model, onChange: handleChange, required: true, placeholder: 'Modelo' },
    { type: 'text', name: 'description', value: formData.description, onChange: handleChange, required: true, placeholder: 'Descrição' },
    { type: 'number', name: 'quantity', value: formData.quantity, onChange: handleChange, required: true, placeholder: 'Estoque' },
    { type: 'number', name: 'price', value: formData.price, onChange: handleChange, required: true, placeholder: 'Preço' },
  ]


  return (
    <div className="py-4 md:py-6">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-700">Atualize os dados</h2>

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

        <FormRegister
          formDetails={formDetail}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          buttonText="Atualizar"
        />

      </div>
    </div>
  )
}

export { ItemUpdate }