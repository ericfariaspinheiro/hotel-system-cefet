import { Request, Response } from 'express';

import {
  atualizarFuncionario,
  buscarFuncionarioPorId,
  criarFuncionario,
  excluirFuncionario,
  listarFuncionarios,
} from '../services/funcionariosService';

export function index(req: Request, res: Response) {
  return res.json(listarFuncionarios());
}

export function show(req: Request, res: Response) {
  const id = Number(req.params.id);

  const funcionario = buscarFuncionarioPorId(id);

  if (!funcionario) {
    return res.status(404).json({
      message: 'Funcionário não encontrado.',
    });
  }

  return res.json(funcionario);
}

export function store(req: Request, res: Response) {
  const funcionario = criarFuncionario(req.body);

  return res.status(201).json(funcionario);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const funcionario = atualizarFuncionario(id, req.body);

  if (!funcionario) {
    return res.status(404).json({
      message: 'Funcionário não encontrado.',
    });
  }

  return res.json(funcionario);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const deleted = excluirFuncionario(id);

  if (!deleted) {
    return res.status(404).json({
      message: 'Funcionário não encontrado.',
    });
  }

  return res.status(204).send();
}