export type StatusQuarto = 'Disponível' | 'Ocupado' | 'Reservado' | 'Manutenção';

export type StatusReserva = 'Pendente' | 'Confirmada' | 'Cancelada' | 'Finalizada';

export type TurnoFuncionario = 'Manhã' | 'Tarde' | 'Noite';

export interface Hospede {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: string;
}

export interface Quarto {
  id: number;
  numero: string;
  tipo: string;
  capacidade: number;
  precoDiaria: number;
  status: StatusQuarto;
  descricao: string;
}

export interface Reserva {
  id: number;
  hospedeId: number;
  quartoId: number;
  dataEntrada: string;
  dataSaida: string;
  status: StatusReserva;
  valorTotal: number;
}

export interface Funcionario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cargo: string;
  salario: number;
  turno: TurnoFuncionario;
}

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  categoria: string;
}