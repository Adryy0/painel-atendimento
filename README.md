# 🎧 Painel de Atendimento

Sistema simples de chamados de suporte (helpdesk) feito com **HTML, CSS e JavaScript puro**.
Os dados ficam salvos no navegador (LocalStorage), então não precisa de servidor.

🔗 **Demo:** _(coloque aqui o link do GitHub Pages)_

## 💡 Por que fiz este projeto

Tenho experiência real em atendimento ao cliente e quis unir isso com programação:
construir a ferramenta que eu gostaria de ter usado no dia a dia do suporte.

## ✨ Funcionalidades

- Abrir chamados com cliente, assunto, descrição e prioridade (alta, média, baixa)
- Alterar o status: **Aberto → Em andamento → Resolvido** (e reabrir)
- Busca por cliente ou assunto
- Filtros por status e prioridade
- Resumo com a contagem de chamados
- Ordenação automática: resolvidos por último, urgentes primeiro
- Dados persistem ao recarregar a página
- Layout responsivo (funciona no celular)

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (Grid, variáveis CSS, responsivo)
- JavaScript (DOM, eventos, `localStorage`, `filter`, `sort`)

## ▶️ Como rodar

1. Baixe ou clone o repositório
2. Abra o arquivo `index.html` no navegador

## 🧠 O que aprendi

- Manipular o DOM e organizar o código em funções pequenas
- Persistir dados com LocalStorage
- Evitar injeção de HTML escapando o texto digitado pelo usuário
- Usar delegação de eventos em listas dinâmicas

## 🚀 Próximos passos

- [ ] Backend com Node.js + SQLite
- [ ] Login de atendente
- [ ] Comentários dentro de cada chamado
- [ ] Exportar chamados para CSV
