import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './layouts/Home';
import { APP_URL } from './utils/const';

function App() {
  return (
    <Routes>
      <Route path={APP_URL} element={<Home />} />
      <Route path={'*'} element={<Navigate to={APP_URL} />} />
    </Routes>
  );
}

export default App;
