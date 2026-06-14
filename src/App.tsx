import { Routes, Route } from 'react-router-dom';
import ViewPage from './pages/ViewPage';
import ManagePage from './pages/ManagePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ViewPage />} />
      <Route path="/manage" element={<ManagePage />} />
    </Routes>
  );
}
