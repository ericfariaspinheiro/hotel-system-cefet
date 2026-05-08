import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { HospedesPage } from '../modules/hospedes/HospedesPage';
import { QuartosPage } from '../modules/quartos/QuartosPage';
import { Reservas } from '../pages/Reservas';
import { FuncionariosPage } from '../modules/funcionarios/FuncionariosPage';
import { Servicos } from '../pages/Servicos';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hospedes" element={<HospedesPage />} />
          <Route path="/quartos" element={<QuartosPage />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/funcionarios" element={<FuncionariosPage />} />
          <Route path="/servicos" element={<Servicos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}