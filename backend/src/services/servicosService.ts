import { servicos } from '../data/servicosData';
import { Servico } from '../types/Servico';

export function listarServicos() {
  return servicos;
}

export function buscarServicoPorId(id: number) {
  return servicos.find(servico => servico.id === id);
}

export function criarServico(data: Omit<Servico, 'id'>) {
  const novoServico: Servico = {
    id: Date.now(),
    ...data,
  };

  servicos.push(novoServico);

  return novoServico;
}

export function atualizarServico(id: number, data: Omit<Servico, 'id'>) {
  const index = servicos.findIndex(servico => servico.id === id);

  if (index === -1) {
    return null;
  }

  servicos[index] = {
    id,
    ...data,
  };

  return servicos[index];
}

export function excluirServico(id: number) {
  const index = servicos.findIndex(servico => servico.id === id);

  if (index === -1) {
    return false;
  }

  servicos.splice(index, 1);

  return true;
}