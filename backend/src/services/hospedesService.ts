import { hospedes } from '../data/hospedesData';
import { Hospede } from '../types/Hospedes';

export function listarHospedes() {
  return hospedes;
}

export function buscarHospedePorId(id: number) {
  return hospedes.find(hospede => hospede.id === id);
}

export function criarHospede(data: Omit<Hospede, 'id'>) {
  const novoHospede: Hospede = {
    id: Date.now(),
    ...data,
  };

  hospedes.push(novoHospede);

  return novoHospede;
}

export function atualizarHospede(id: number, data: Omit<Hospede, 'id'>) {
  const index = hospedes.findIndex(hospede => hospede.id === id);

  if (index === -1) {
    return null;
  }

  hospedes[index] = {
    id,
    ...data,
  };

  return hospedes[index];
}

export function excluirHospede(id: number) {
  const index = hospedes.findIndex(hospede => hospede.id === id);

  if (index === -1) {
    return false;
  }

  hospedes.splice(index, 1);

  return true;
}