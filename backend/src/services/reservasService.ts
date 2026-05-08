import { reservas } from '../data/reservasData';
import { hospedes } from '../data/hospedesData';
import { quartos } from '../data/quartosData';
import { Reserva } from '../types/Reserva';

export function listarReservas() {
  return reservas;
}

export function buscarReservaPorId(id: number) {
  return reservas.find(reserva => reserva.id === id);
}

export function criarReserva(data: Omit<Reserva, 'id'>) {
  const hospedeExiste = hospedes.some(hospede => hospede.id === data.hospedeId);
  const quartoExiste = quartos.some(quarto => quarto.id === data.quartoId);

  if (!hospedeExiste || !quartoExiste) {
    return null;
  }

  const novaReserva: Reserva = {
    id: Date.now(),
    ...data,
  };

  reservas.push(novaReserva);

  return novaReserva;
}

export function atualizarReserva(id: number, data: Omit<Reserva, 'id'>) {
  const index = reservas.findIndex(reserva => reserva.id === id);

  if (index === -1) {
    return null;
  }

  const hospedeExiste = hospedes.some(hospede => hospede.id === data.hospedeId);
  const quartoExiste = quartos.some(quarto => quarto.id === data.quartoId);

  if (!hospedeExiste || !quartoExiste) {
    return null;
  }

  reservas[index] = {
    id,
    ...data,
  };

  return reservas[index];
}

export function excluirReserva(id: number) {
  const index = reservas.findIndex(reserva => reserva.id === id);

  if (index === -1) {
    return false;
  }

  reservas.splice(index, 1);

  return true;
}