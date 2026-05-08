export type TurnoFuncionario = 'Manhã' | 'Tarde' | 'Noite';

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