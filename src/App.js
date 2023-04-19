import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './layouts/Home';
import { APP_URL } from './utils/const';
import Auth from './layouts/Auth';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path={APP_URL} element={<Home />} />
      <Route path={`${APP_URL}/auth`} element={<Auth />}>
        <Route path={`${APP_URL}/auth/login`} element={<Login />} />
        <Route path={`${APP_URL}/auth/register`} element={<Register />} />
        <Route path={`${APP_URL}/auth`} element={<Navigate to={`${APP_URL}/auth/login`} />} />
      </Route>
      <Route path={'*'} element={<Navigate to={APP_URL} />} />
    </Routes>
  );
}

export default App;
