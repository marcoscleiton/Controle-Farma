# Controle Farma: frontend

Interface em React + TypeScript + Vite + Tailwind CSS. A descrição completa do projeto está no [README principal](../README.md).

## Comandos

| Comando           | O que faz |
|-------------------|-----------|
| `npm run dev`     | Inicia o servidor de desenvolvimento |
| `npm run build`   | Checa os tipos (TypeScript) e gera a versão de produção em `dist/` |
| `npm run lint`    | Procura problemas no código (oxlint) |
| `npm run preview` | Abre a versão gerada pelo build |

## Pastas de `src/`

- `pages/`: uma tela por arquivo (Painel, Clientes, Medicamentos, Compras, Financeiro).
- `components/layout/`: estrutura fixa da tela (menu lateral e cabeçalho).
- `components/ui/`: peças reutilizáveis (cards, selos de status, estilos).
- `context/`: estado global dos dados.
  - `contexto.ts`: o contexto em si.
  - `DadosContext.tsx`: o provider que lê e salva no localStorage.
  - `useDados.ts`: o hook que as telas usam para acessar os dados.
- `types/`: tipos TypeScript de Cliente, Medicamento e Compra.
- `utils/`: funções puras de datas, dinheiro (centavos), status e previsões.
