import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { HospedesPage } from '../modules/hospedes/HospedesPage';
import { QuartosPage } from '../modules/quartos/QuartosPage';
import { ReservasPage } from '../modules/reservas/ReservasPage';
import { FuncionariosPage } from '../modules/funcionarios/FuncionariosPage';
import { ServicosPage } from '../modules/servicos/ServicosPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hospedes" element={<HospedesPage />} />
          <Route path="/quartos" element={<QuartosPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
          <Route path="/funcionarios" element={<FuncionariosPage />} />
          <Route path="/servicos" element={<ServicosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}