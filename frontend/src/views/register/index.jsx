import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { setUser } from '../../store/userSlice';
import { Modal, FormRegister } from '../../components';

const Register = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
		}, time);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.postPut('POST', 'auth/register', formData);
			if (res.status === 201) {
				activeModal("Usuário registrado com sucesso.", 1500);
				const data = await res.json();
				localStorage.setItem('token', data.token);
				dispatch(setUser(data.user));
				navigate('/');
			} else {
				activeModal("Erro ao tentar registrar o usuário.", 2500);
			}
		} catch (error) {
			activeModal("Erro ao tentar registrar o usuário.", 2500);
		}
	};

	const formDetail = [
		{ type: 'text', name: 'username', value: formData.username, onChange: handleChange, required: true, placeholder: 'Nome de usuário' },
		{ type: 'email', name: 'email', value: formData.email, onChange: handleChange, required: false, placeholder: 'Email' },
		{ type: 'password', name: 'password', value: formData.password, onChange: handleChange, required: true, placeholder: 'Senha' },
	];

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2 className="text-2xl font-bold text-gray-700">Registro de Usuário</h2>

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
					buttonText="Registrar"
				/>

			</div>
		</div>
	);
};

export { Register };
