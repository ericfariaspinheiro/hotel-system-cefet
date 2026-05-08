import { Request, Response } from 'express';

import {
  atualizarHospede,
  buscarHospedePorId,
  criarHospede,
  excluirHospede,
  listarHospedes,
} from '../services/hospedesService';

export function index(req: Request, res: Response) {
  return res.json(listarHospedes());
}

export function show(req: Request, res: Response) {
  const id = Number(req.params.id);

  const hospede = buscarHospedePorId(id);

  if (!hospede) {
    return res.status(404).json({
      message: 'Hóspede não encontrado.',
    });
  }

  return res.json(hospede);
}

export function store(req: Request, res: Response) {
  const hospede = criarHospede(req.body);

  return res.status(201).json(hospede);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const hospede = atualizarHospede(id, req.body);

  if (!hospede) {
    return res.status(404).json({
      message: 'Hóspede não encontrado.',
    });
  }

  return res.json(hospede);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const deleted = excluirHospede(id);

  if (!deleted) {
    return res.status(404).json({
      message: 'Hóspede não encontrado.',
    });
  }

  return res.status(204).send();
}