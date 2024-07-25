const Instructions = () => {


	return (
		<div className="container mx-auto p-4 bg-white m-4 rounded">
			<h1 className="text-3xl font-bold mb-4">Manual do Usuário</h1>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Introdução</h2>
				<p>Bem-vindo ao sistema de gerenciamento de produtos! Este manual irá guiá-lo através das principais funcionalidades da aplicação. Certifique-se de estar logado para acessar todas as funcionalidades.</p>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Acesso à Aplicação</h2>
				<ul className="list-disc pl-4">
					<li><strong>Login:</strong> Insira suas credenciais (nome de usuário e senha) na página de login para acessar a aplicação.</li>
					<li><strong>Registro:</strong> Se você ainda não tem uma conta, use a página de registro para criar uma nova conta.</li>
				</ul>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Navegação na Aplicação</h2>
				<ul className="list-disc pl-4">
					<li><strong>Página Principal:</strong> Nesta página, você pode ver todos os produtos disponíveis. Aqui você verá uma lista de produtos com detalhes importantes.</li>
					<li><strong>Adicionar Novo Produto:</strong> Clique no botão "Adicionar Produto" para abrir o formulário de registro de produto. Preencha os campos necessários e envie o formulário para adicionar um novo produto à lista.</li>
					<li><strong>Editar Produto:</strong> Para editar um produto existente, localize o produto na lista e clique no botão de edição ao lado dele. Faça as alterações necessárias no formulário e salve as mudanças.</li>
					<li><strong>Excluir Produto:</strong> Na lista de produtos, você pode excluir um produto clicando no botão de exclusão. Confirme a exclusão quando solicitado.</li>
				</ul>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Funcionalidades Adicionais</h2>
				<ul className="list-disc pl-4">
					<li><strong>Carregar Produtos de Teste:</strong> Clique no botão "Carregar Produtos de Teste" para adicionar automaticamente 50 produtos de teste ao banco de dados.</li>
					<li><strong>Eliminar Todos os Produtos:</strong> Clique no botão "Eliminar Todos os Produtos" para iniciar o procedimento de eliminação de todos os produtos. Uma barra de progresso será exibida e atualizará em tempo real, mostrando o estado da eliminação de 0% a 100%.</li>
					<li><strong>Tela de Logs:</strong> Acesse a tela de logs para ver uma lista de produtos que foram eliminados. Esta tela mostrará detalhes sobre os produtos que foram removidos do sistema.</li>
					<li><strong>Pesquisa e Filtragem:</strong> Utilize a funcionalidade de pesquisa para encontrar produtos específicos na lista. Aplique filtros para visualizar produtos com base em critérios específicos.</li>
				</ul>
			</div>

			<p className="mt-8">Obrigado por utilizar o nosso sistema de gerenciamento de produtos!</p>
		</div>


	);
};

export { Instructions };
