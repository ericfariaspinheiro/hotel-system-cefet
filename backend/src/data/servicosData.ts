import { Servico } from '../types/Servico';

export let servicos: Servico[] = [
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