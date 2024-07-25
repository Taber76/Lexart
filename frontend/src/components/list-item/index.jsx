import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { apiService } from '../../services/apiService';
import { ModalInteractive } from '../modal-interactive';
import { deleteProduct } from '../../store/productsSlice';

const ListItem = ({ item, columnWidths, handleDelete, type, options }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const keys = Object.keys(columnWidths);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTrash = () => {
    setShowModal(true);
    setModalText('Tem certeza de que deseja excluir este registro?');
  }

  const handleComfirmDelete = async () => {
    try {
      const res = await apiService.delete(`${type}/delete/${item.id}`);
      if (res.status === 200) {
        dispatch(deleteProduct({ id: item.id }))
        setShowModal(false);
        handleDelete();
      } else {
        setShowModal(false)
      }
    } catch (error) {
      setShowModal(false);
    }
  }

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex flex-col sm:flex-row bg-white rounded-md shadow-md p-4 w-full">

        {keys.map((key) => (
          <div key={key} className={`mb-2 sm:mb-0 flex items-center justify-center`} style={{ minWidth: `${columnWidths[key]}` }}>
            <p className="text-gray-600 text-xs">
              {key === 'updated_at'
                ? new Date(item[key]).toLocaleDateString('pt-BR')
                : item[key]}
            </p>
          </div>
        ))}

        {options && (
          <div className={`flex items-center justify-end mb-2 sm:mb-0`} style={{ minWidth: `10%` }}>
            <FaEdit
              className="text-green-500 mr-2 cursor-pointer"
              title="Editar"
              onClick={() => navigate(`/items/update`, { state: { item_id: item.id } })}
            />
            <FaTrash
              className="text-red-500 cursor-pointer"
              title="Excluir"
              onClick={handleTrash}
            />
          </div>
        )}

        {showModal && (
          <ModalInteractive
            text={modalText}
            width="350px"
            height="150px"
            color="rgba(0, 0, 255, 0.8)"
            textColor="white"
            margin="0"
            handleNo={() => setShowModal(false)}
            handleSi={handleComfirmDelete}
          />
        )}

      </div>
    </div>
  );
};

export { ListItem };


