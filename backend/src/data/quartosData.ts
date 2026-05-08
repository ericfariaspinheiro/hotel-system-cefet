import { Quarto } from '../types/Quarto';

export let quartos: Quarto[] = [
  {
    id: 1,
    numero: '101',
    tipo: 'Standard',
    capacidade: 2,
    precoDiaria: 180,
    status: 'Disponível',
    descricao: 'Quarto standard com cama de casal.',
  },
  {
    id: 2,
    numero: '202',
    tipo: 'Luxo',
    capacidade: 3,
    precoDiaria: 320,
    status: 'Reservado',
    descricao: 'Quarto luxo com varanda e vista para a cidade.',
  },
];