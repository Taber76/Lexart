import { Home, Login, UserRegister, ItemRegister, ItemUpdate, Items, Instructions } from './views';
import { NavBar, Footer } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App bg-gray-900">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/instructions" element={<Instructions />} />
					<Route path="/items" element={<Items />} />
					<Route path="/items/register" element={<ItemRegister />} />
					<Route path="/items/update" element={<ItemUpdate />} />
					<Route path="/login" element={<Login />} />
					<Route path="/users/register" element={<UserRegister />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
