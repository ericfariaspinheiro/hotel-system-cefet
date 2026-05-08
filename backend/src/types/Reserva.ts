export type StatusReserva = 'Pendente' | 'Confirmada' | 'Cancelada' | 'Finalizada';

export interface Reserva {
  id: number;
  hospedeId: number;
  quartoId: number;
  dataEntrada: string;
  dataSaida: string;
  status: StatusReserva;
  valorTotal: number;
}