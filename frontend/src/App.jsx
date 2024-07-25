import { Home, Login, Register, ItemRegister, ItemUpdate, Items, ItemsLog, Instructions } from './views';
import { NavBar, Footer, PrivateRoute } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App bg-gray-900">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/instructions" element={<Instructions />} />
					<Route element={<PrivateRoute />}>
						<Route path="/items" element={<Items />} />
						<Route path="/items/log" element={<ItemsLog />} />
						<Route path="/items/register" element={<ItemRegister />} />
						<Route path="/items/update" element={<ItemUpdate />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;

