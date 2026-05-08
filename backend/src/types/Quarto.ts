export type StatusQuarto = 'Disponível' | 'Ocupado' | 'Reservado' | 'Manutenção';

export interface Quarto {
  id: number;
  numero: string;
  tipo: string;
  capacidade: number;
  precoDiaria: number;
  status: StatusQuarto;
  descricao: string;
}