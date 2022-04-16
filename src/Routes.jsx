import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Appointments from './pages/Appointments';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/appointments' element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
