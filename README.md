# Controle Farma

Sistema web para farmácias acompanharem clientes que compram o mesmo medicamento com regularidade. Ele substitui a planilha Excel usada hoje.

## O que o sistema faz

- **Cadastro** de clientes e medicamentos, com edição e inativação.
- **Histórico de compras** com valor (guardado em centavos) e forma de pagamento.
- **Previsão de recompra**: data da compra + dias de uso.
- **Painel com alertas por cor**:
  - 🔴 atrasado
  - 🟢 até 3 dias
  - 🟡 de 4 a 10 dias
  - 🔵 mais de 10 dias
- **Pedido ao fornecedor**: data da recompra prevista − prazo de entrega do fornecedor. Esse prazo é informado em cada medicamento.
- **Financeiro**: total vendido e divisão por forma de pagamento.

> Use apenas dados fictícios no desenvolvimento. O sistema lida com dados de saúde, que são protegidos pela LGPD.

## Estrutura

```
Controle-Farma/
├── frontend/   React + TypeScript + Vite + Tailwind CSS
└── backend/    Node.js + TypeScript + Express + PostgreSQL + Prisma (em construção)
```

## Como rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Por enquanto os dados ficam salvos no `localStorage` do navegador. Quando o backend estiver pronto, eles passarão para o PostgreSQL.

## Stack

| Parte    | Tecnologias |
|----------|-------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router DOM, Axios, Lucide React |
| Backend  | Node.js, TypeScript, Express, PostgreSQL, Prisma, Zod, bcryptjs, JWT, Helmet, CORS, dotenv, express-rate-limit, node-cron |
