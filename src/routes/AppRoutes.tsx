import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { HospedesPage } from '../modules/hospedes/HospedesPage';
import { Quartos } from '../pages/Quartos';
import { Reservas } from '../pages/Reservas';
import { Funcionarios } from '../pages/Funcionarios';
import { Servicos } from '../pages/Servicos';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hospedes" element={<HospedesPage />} />
          <Route path="/quartos" element={<Quartos />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/servicos" element={<Servicos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}