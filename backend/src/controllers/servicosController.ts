import { Request, Response } from 'express';

import {
  atualizarServico,
  buscarServicoPorId,
  criarServico,
  excluirServico,
  listarServicos,
} from '../services/servicosService';

export function index(req: Request, res: Response) {
  return res.json(listarServicos());
}

export function show(req: Request, res: Response) {
  const id = Number(req.params.id);

  const servico = buscarServicoPorId(id);

  if (!servico) {
    return res.status(404).json({
      message: 'Serviço não encontrado.',
    });
  }

  return res.json(servico);
}

export function store(req: Request, res: Response) {
  const servico = criarServico(req.body);

  return res.status(201).json(servico);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const servico = atualizarServico(id, req.body);

  if (!servico) {
    return res.status(404).json({
      message: 'Serviço não encontrado.',
    });
  }

  return res.json(servico);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const deleted = excluirServico(id);

  if (!deleted) {
    return res.status(404).json({
      message: 'Serviço não encontrado.',
    });
  }

  return res.status(204).send();
}