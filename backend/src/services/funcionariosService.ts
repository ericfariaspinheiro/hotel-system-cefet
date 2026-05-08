import { funcionarios } from '../data/funcionariosData';
import { Funcionario } from '../types/Funcionario';

export function listarFuncionarios() {
  return funcionarios;
}

export function buscarFuncionarioPorId(id: number) {
  return funcionarios.find(funcionario => funcionario.id === id);
}

export function criarFuncionario(data: Omit<Funcionario, 'id'>) {
  const novoFuncionario: Funcionario = {
    id: Date.now(),
    ...data,
  };

  funcionarios.push(novoFuncionario);

  return novoFuncionario;
}

export function atualizarFuncionario(id: number, data: Omit<Funcionario, 'id'>) {
  const index = funcionarios.findIndex(funcionario => funcionario.id === id);

  if (index === -1) {
    return null;
  }

  funcionarios[index] = {
    id,
    ...data,
  };

  return funcionarios[index];
}

export function excluirFuncionario(id: number) {
  const index = funcionarios.findIndex(funcionario => funcionario.id === id);

  if (index === -1) {
    return false;
  }

  funcionarios.splice(index, 1);

  return true;
}