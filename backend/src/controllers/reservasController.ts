import { Request, Response } from 'express';

import {
  atualizarReserva,
  buscarReservaPorId,
  criarReserva,
  excluirReserva,
  listarReservas,
} from '../services/reservasService';

export function index(req: Request, res: Response) {
  return res.json(listarReservas());
}

export function show(req: Request, res: Response) {
  const id = Number(req.params.id);

  const reserva = buscarReservaPorId(id);

  if (!reserva) {
    return res.status(404).json({
      message: 'Reserva não encontrada.',
    });
  }

  return res.json(reserva);
}

export function store(req: Request, res: Response) {
  const reserva = criarReserva(req.body);

  if (!reserva) {
    return res.status(400).json({
      message: 'Hóspede ou quarto inválido.',
    });
  }

  return res.status(201).json(reserva);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const reserva = atualizarReserva(id, req.body);

  if (!reserva) {
    return res.status(404).json({
      message: 'Reserva não encontrada ou dados inválidos.',
    });
  }

  return res.json(reserva);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const deleted = excluirReserva(id);

  if (!deleted) {
    return res.status(404).json({
      message: 'Reserva não encontrada.',
    });
  }

  return res.status(204).send();
}