# Hotel Manager

Sistema web de gerenciamento hoteleiro desenvolvido com **React**, **TypeScript**, **Material UI**, **Node.js** e **Express**.

O projeto simula um painel administrativo para hotéis, permitindo o gerenciamento de hóspedes, quartos, reservas, funcionários e serviços. A aplicação possui front-end integrado com uma API própria em Node.js, utilizando dados em memória no backend.

---

## Visão geral

O **Hotel Manager** foi desenvolvido para a disciplina de Programação de Framework Front-end com TypeScript.

O sistema possui uma interface moderna em estilo **dark dashboard**, inspirada em painéis administrativos de front office hoteleiro, com navegação superior, cards de métricas, feedback visual e telas completas de CRUD.

---

## Tecnologias utilizadas

### Front-end

- React
- TypeScript
- Vite
- Material UI
- React Router DOM
- Axios

### Back-end

- Node.js
- Express
- TypeScript
- CORS
- ts-node-dev

---

## Funcionalidades principais

O sistema possui 5 CRUDs completos:

### Hóspedes

- Cadastrar hóspede
- Listar hóspedes
- Editar hóspede
- Excluir hóspede
- Buscar por nome ou CPF
- Visualizar detalhes do hóspede

### Quartos

- Cadastrar quarto
- Listar quartos
- Editar quarto
- Excluir quarto
- Buscar por número, tipo ou status
- Visualizar detalhes do quarto

### Reservas

- Cadastrar reserva
- Listar reservas
- Editar reserva
- Excluir reserva
- Buscar por hóspede, quarto ou status
- Visualizar detalhes da reserva
- Relacionamento com hóspede e quarto

### Funcionários

- Cadastrar funcionário
- Listar funcionários
- Editar funcionário
- Excluir funcionário
- Buscar por nome, CPF ou cargo
- Visualizar detalhes do funcionário

### Serviços

- Cadastrar serviço
- Listar serviços
- Editar serviço
- Excluir serviço
- Buscar por nome ou categoria
- Visualizar detalhes do serviço
- Controle de disponibilidade

---

## Interface

A interface foi criada com Material UI e possui:

- Layout escuro em estilo dashboard
- Header superior com identidade visual do sistema
- Menu horizontal de navegação
- Cards de métricas
- Componentes reutilizáveis
- Feedback visual com Snackbar
- Dialogs de confirmação
- Busca/filtro nas listagens
- Responsividade

---
