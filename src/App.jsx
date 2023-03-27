import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/style.css';
import Home from './pages/Home';
import Course from './pages/Course';
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/course/:id'} element={<Course />} />
				<Route path={'*'} element={'empty'} />
			</Routes>
		</Router>
	);
};

export default App;
