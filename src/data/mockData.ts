import type {
  Funcionario,
  Hospede,
  Quarto,
  Reserva,
  Servico,
} from '../types/hotel';

export const hospedesMock: Hospede[] = [
  {
    id: 1,
    nome: 'Mariana Souza',
    cpf: '123.456.789-00',
    email: 'mariana@email.com',
    telefone: '(21) 99999-1111',
    dataNascimento: '1995-04-12',
    endereco: 'Rua das Flores, 120',
  },
  {
    id: 2,
    nome: 'Carlos Henrique',
    cpf: '987.654.321-00',
    email: 'carlos@email.com',
    telefone: '(11) 98888-2222',
    dataNascimento: '1988-09-23',
    endereco: 'Av. Central, 450',
  },
];

export const quartosMock: Quarto[] = [
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

export const reservasMock: Reserva[] = [
  {
    id: 1,
    hospedeId: 1,
    quartoId: 2,
    dataEntrada: '2026-05-10',
    dataSaida: '2026-05-15',
    status: 'Confirmada',
    valorTotal: 1600,
  },
];

export const funcionariosMock: Funcionario[] = [
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

export const servicosMock: Servico[] = [
  {
    id: 1,
    nome: 'Café da manhã',
    descricao: 'Buffet completo servido das 6h às 10h.',
    preco: 45,
    disponivel: true,
    categoria: 'Alimentação',
  },
  {
    id: 2,
    nome: 'Lavanderia',
    descricao: 'Serviço de lavagem e passagem de roupas.',
    preco: 30,
    disponivel: true,
    categoria: 'Conveniência',
  },
];