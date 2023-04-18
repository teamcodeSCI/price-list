import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './layouts/Home';

function App() {
  return (
    <Routes>
      <Route path={`/login`} element={''} />
      <Route path={`/`} element={<Home />} />
      <Route path={'*'} element={<Navigate to={`/`} />} />
    </Routes>
  );
}

export default App;
