import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path={`/login`} element={''} />
      <Route path={'*'} element={<Navigate to={`/`} />} />
    </Routes>
  );
}

export default App;
