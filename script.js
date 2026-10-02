// Painel de Atendimento - JavaScript puro + LocalStorage
const CHAVE = "painel-atendimento:chamados";

const STATUS = {
  aberto: "Aberto",
  andamento: "Em andamento",
  resolvido: "Resolvido",
};
const PRIORIDADE = { alta: "Alta", media: "Média", baixa: "Baixa" };

const form = document.getElementById("form-chamado");
const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const resumo = document.getElementById("resumo");
const busca = document.getElementById("busca");
const filtroStatus = document.getElementById("filtro-status");
const filtroPrioridade = document.getElementById("filtro-prioridade");

let chamados = carregar();

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE));
    if (Array.isArray(dados)) return dados;
  } catch (e) {
    // dados corrompidos: começa do zero
  }
  return [
    {
      id: Date.now(),
      cliente: "Maria (exemplo)",
      assunto: "Não consigo redefinir minha senha",
      descricao: "O e-mail de redefinição não chega.",
      prioridade: "alta",
      status: "aberto",
      criadoEm: new Date().toISOString(),
    },
  ];
}

function salvar() {
  localStorage.setItem(CHAVE, JSON.stringify(chamados));
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function formatarData(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function renderResumo() {
  const contar = (s) => chamados.filter((c) => c.status === s).length;
  resumo.innerHTML = `
    <div><strong>${chamados.length}</strong><span>Total</span></div>
    <div><strong>${contar("aberto")}</strong><span>Abertos</span></div>
    <div><strong>${contar("andamento")}</strong><span>Em andamento</span></div>
    <div><strong>${contar("resolvido")}</strong><span>Resolvidos</span></div>
  `;
}

function filtrar() {
  const termo = busca.value.trim().toLowerCase();
  return chamados.filter((c) => {
    const texto = `${c.cliente} ${c.assunto}`.toLowerCase();
    return (
      texto.includes(termo) &&
      (filtroStatus.value === "todos" || c.status === filtroStatus.value) &&
      (filtroPrioridade.value === "todas" || c.prioridade === filtroPrioridade.value)
    );
  });
}

function renderLista() {
  const ordemPrioridade = { alta: 0, media: 1, baixa: 2 };
  const visiveis = filtrar().sort(
    (a, b) =>
      (a.status === "resolvido") - (b.status === "resolvido") ||
      ordemPrioridade[a.prioridade] - ordemPrioridade[b.prioridade] ||
      new Date(b.criadoEm) - new Date(a.criadoEm)
  );

  lista.innerHTML = visiveis
    .map(
      (c) => `
    <li class="chamado ${c.prioridade} ${c.status}" data-id="${c.id}">
      <h3>${escapar(c.assunto)}</h3>
      <p>${escapar(c.descricao || "Sem descrição.")}</p>
      <div class="meta">
        <span class="tag">${PRIORIDADE[c.prioridade]}</span>
        <span class="tag">${STATUS[c.status]}</span>
        <span>👤 ${escapar(c.cliente)}</span>
        <span>🕒 ${formatarData(c.criadoEm)}</span>
      </div>
      <div class="acoes">
        ${
          c.status === "aberto"
            ? '<button data-acao="andamento">Iniciar atendimento</button>'
            : ""
        }
        ${
          c.status !== "resolvido"
            ? '<button data-acao="resolvido">Marcar como resolvido</button>'
            : '<button class="secundario" data-acao="aberto">Reabrir</button>'
        }
        <button class="perigo" data-acao="excluir">Excluir</button>
      </div>
    </li>`
    )
    .join("");

  vazio.hidden = visiveis.length > 0;
}

function renderizar() {
  renderResumo();
  renderLista();
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  chamados.push({
    id: Date.now(),
    cliente: document.getElementById("cliente").value.trim(),
    assunto: document.getElementById("assunto").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    prioridade: document.getElementById("prioridade").value,
    status: "aberto",
    criadoEm: new Date().toISOString(),
  });
  salvar();
  form.reset();
  document.getElementById("prioridade").value = "media";
  renderizar();
});

lista.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;
  const id = Number(botao.closest(".chamado").dataset.id);
  const acao = botao.dataset.acao;

  if (acao === "excluir") {
    if (!confirm("Excluir este chamado?")) return;
    chamados = chamados.filter((c) => c.id !== id);
  } else {
    const chamado = chamados.find((c) => c.id === id);
    if (chamado) chamado.status = acao;
  }
  salvar();
  renderizar();
});

[busca, filtroStatus, filtroPrioridade].forEach((el) =>
  el.addEventListener("input", renderLista)
);

renderizar();
