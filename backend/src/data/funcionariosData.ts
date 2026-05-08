import { Funcionario } from '../types/Funcionario';

export let funcionarios: Funcionario[] = [
  {
    id: 1,
    nome: 'Ana Paula',
    cpf: '111.222.333-44',
    email: 'ana@hotel.com',
    telefone: '(22) 97777-3333',
    cargo: 'Recepcionista',
    salario: 2500,
    turno: 'Manhã',
  },
  {
    id: 2,
    nome: 'João Mendes',
    cpf: '555.666.777-88',
    email: 'joao@hotel.com',
    telefone: '(22) 96666-4444',
    cargo: 'Gerente',
    salario: 5200,
    turno: 'Tarde',
  },
];