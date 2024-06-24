import './App.css';
import './main.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login  from './pages/login'
import Home  from './pages/dashboard/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/register' element={ <Register />}  /> */}
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
