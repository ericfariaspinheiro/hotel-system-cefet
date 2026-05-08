import { Request, Response } from 'express';

import {
  atualizarQuarto,
  buscarQuartoPorId,
  criarQuarto,
  excluirQuarto,
  listarQuartos,
} from '../services/quartosService';

export function index(req: Request, res: Response) {
  return res.json(listarQuartos());
}

export function show(req: Request, res: Response) {
  const id = Number(req.params.id);

  const quarto = buscarQuartoPorId(id);

  if (!quarto) {
    return res.status(404).json({
      message: 'Quarto não encontrado.',
    });
  }

  return res.json(quarto);
}

export function store(req: Request, res: Response) {
  const quarto = criarQuarto(req.body);

  return res.status(201).json(quarto);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const quarto = atualizarQuarto(id, req.body);

  if (!quarto) {
    return res.status(404).json({
      message: 'Quarto não encontrado.',
    });
  }

  return res.json(quarto);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const deleted = excluirQuarto(id);

  if (!deleted) {
    return res.status(404).json({
      message: 'Quarto não encontrado.',
    });
  }

  return res.status(204).send();
}