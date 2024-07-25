import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Modal } from '../../components';

const wsUrl = import.meta.env.VITE_WS_URL;

const Admin = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [progressWidth, setProgressWidth] = useState('0%');

	const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl, {
		onOpen: () => console.log('WebSocket connection established.'),

		onMessage: (message) => {
			const data = JSON.parse(message.data);

			if (data.type === 'progress') {
				setProgressWidth(`${parseInt(data.progress)}%`);
			} else if (data.type === 'createdAllProducts') {
				if (data.success) {
					activeModal("50 produtos criados com sucesso.", 1500);
				} else {
					activeModal("Erro ao criar produtos.", 2500);
				}

			} else if (data.type === 'deletedAllProducts') {
				if (data.success) {
					activeModal("Todos os produtos foram excluídos com sucesso.", 1500);
				} else {
					activeModal("Erro ao excluir produtos.", 2500);
				}
			}

		},
		onClose: () => console.log('Disconnected from WebSocket server'),
	});

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
		}, time);
	};

	const handleCreateProducts = () => {
		sendMessage(JSON.stringify({ type: 'createProducts' }));
	};

	const handleDeleteAllProducts = () => {
		sendMessage(JSON.stringify({ type: 'deleteAllProducts' }));
	};

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2 className="text-2xl font-bold text-gray-700 mb-6">Administração</h2>

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

				<div className="flex gap-4">
					<button
						className="btn py-2 px-4 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration-300 w-1/2"
						onClick={handleCreateProducts}
					>
						Criar 50 Produtos
					</button>

					<button
						className="btn py-2 px-4 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration-300 w-1/2"
						onClick={handleDeleteAllProducts}
					>
						Excluir Todos os Produtos
					</button>
				</div>

				<div className="w-3/4 mt-4">
					<div className="mb-1 text-lg font-medium text-white">Avanço {progressWidth}</div>
					<div className="w-full h-6 rounded-full bg-gray-700">
						<div className="h-6 rounded-full bg-blue-700" style={{ width: progressWidth }}></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { Admin };


