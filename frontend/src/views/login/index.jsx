import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { setUser } from '../../store/userSlice';
import { Modal } from '../../components';

const Login = () => {
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.postPut('POST', 'auth/login', formData);
			if (res.status === 200) {
				const data = await res.json();
				localStorage.setItem('token', data.token);
				dispatch(setUser(data.user));
				navigate('/');
			} else if (res.status === 400) {
				activeModal("Usuário ou senha incorretos.", 3000);
			} else {
				activeModal("Erro interno do servidor, tente novamente mais tarde.", 3000);
			}
		} catch (error) {
			activeModal("Erro interno do servidor, tente novamente mais tarde.", 3000);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2 className="text-2xl font-bold text-gray-700">Login</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-2/3">

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

					<input
						className="bg-blue-100 text-xs rounded p-2"
						type="text"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						placeholder="Email..."
					/>

					<input
						className="bg-blue-100 text-xs rounded p-2"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						placeholder="Senha..."
					/>

					<input type="submit" value="Entrar" className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
				</form>

				<p className="mt-4 text-gray-600">
					Não tem uma conta?{' '}
					<a href="/register" className="text-blue-500 hover:underline">
						Registre-se
					</a>
				</p>
			</div>
		</div>
	);
};

export { Login };

