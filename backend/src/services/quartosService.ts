import { quartos } from '../data/quartosData';
import { Quarto } from '../types/Quarto';

export function listarQuartos() {
  return quartos;
}

export function buscarQuartoPorId(id: number) {
  return quartos.find(quarto => quarto.id === id);
}

export function criarQuarto(data: Omit<Quarto, 'id'>) {
  const novoQuarto: Quarto = {
    id: Date.now(),
    ...data,
  };

  quartos.push(novoQuarto);

  return novoQuarto;
}

export function atualizarQuarto(id: number, data: Omit<Quarto, 'id'>) {
  const index = quartos.findIndex(quarto => quarto.id === id);

  if (index === -1) {
    return null;
  }

  quartos[index] = {
    id,
    ...data,
  };

  return quartos[index];
}

export function excluirQuarto(id: number) {
  const index = quartos.findIndex(quarto => quarto.id === id);

  if (index === -1) {
    return false;
  }

  quartos.splice(index, 1);

  return true;
}