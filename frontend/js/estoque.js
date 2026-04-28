const API_URL = "http://localhost:3000";

// Carregar movimentações
async function loadMovimentacoes() {
  const res = await fetch(`${API_URL}/stock/movements`);
  const data = await res.json();
  const tbody = document.querySelector("#movimentacoesTable tbody");
  tbody.innerHTML = "";

  let entradas = 0, saidas = 0;

  data.movements.forEach(m => {
    tbody.innerHTML += `
      <tr>
        <td>${new Date(m.date).toLocaleDateString()}</td>
        <td>${m.product}</td>
        <td>${m.quantity}</td>
        <td>${m.type}</td>
      </tr>`;
    if (m.type === "entrada") entradas += m.quantity;
    else saidas += m.quantity;
  });

  renderChart(entradas, saidas);
}

// Salvar movimentação
document.querySelector("#movimentacaoForm").addEventListener("submit", async e => {
  e.preventDefault();
  const produto = document.querySelector("#produto").value;
  const quantidade = document.querySelector("#quantidade").value;
  const tipo = document.querySelector("#tipo").value;

  await fetch(`${API_URL}/stock/movements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product: produto, quantity: quantidade, type: tipo })
  });

  loadMovimentacoes();
  bootstrap.Modal.getInstance(document.querySelector("#movimentacaoModal")).hide();
});

// Renderizar gráfico
function renderChart(entradas, saidas) {
  const ctx = document.getElementById("estoqueChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Entradas", "Saídas"],
      datasets: [{
        data: [entradas, saidas],
        backgroundColor: ["#28a745", "#dc3545"]
      }]
    }
  });
}

// Inicialização
loadMovimentacoes();