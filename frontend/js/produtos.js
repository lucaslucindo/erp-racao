const API_URL = "http://localhost:3000";

// Cadastro e carrega produtos
async function loadProdutos() {
  const res = await fetch(`${API_URL}/api/products`);
  const data = await res.json();
  const tbody = document.querySelector("#produtosTable tbody");
  tbody.innerHTML = "";

  let totalEstoque = 0;
  
  const produtos = data.products || data;

  produtos.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${formatCurrency(p.price)}</td>
        <td>${p.stock}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProduto(${p.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deletarProduto(${p.id})">Excluir</button>
        </td>
      </tr>`;
    totalEstoque += p.stock;
  });

  const preco = parseFloat(document.querySelector("#preco").value.replace(/\./g, "").replace(",", "."));
  const custo = parseFloat(document.querySelector("#custo").value.replace(/\./g, "").replace(",", "."));

  renderChart(totalEstoque);
}

document.querySelector("#produtoForm").addEventListener("submit", async e => {
  e.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const preco = document.querySelector("#preco").value.trim();
  const estoque = document.querySelector("#estoque").value.trim();
  const categoria = document.querySelector("#categoria").value.trim();
  const custo = document.querySelector("#custo").value.trim();
  const min_stock = document.querySelector("#min_stock").value.trim();

  // Validação simples
  if (!nome || !preco || !estoque || !categoria || !custo || !min_stock) {
    showToast("Preencha todos os campos obrigatórios!", "warning");
    return;
  }

  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nome,
      category: categoria,
      cost: parseFloat(custo),
      price: parseFloat(preco),
      stock: parseInt(estoque),
      min_stock: parseInt(min_stock)
    })
  });  

  if (res.ok) {
    loadProdutos();
    bootstrap.Modal.getInstance(document.querySelector("#produtoModal")).hide();
    showToast("Produto criado com sucesso!", "success"); // ✅ apenas aqui
  } else {
    const data = await res.json();
    showToast(data.error || "Erro ao salvar produto", "error");
  }
});

// Editar produto
async function editarProduto(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) {
    showToast("Erro ao carregar produto para edição", "error");
    return;
  }
  const produto = await res.json();

  document.querySelector("#editId").value = produto.id;
  document.querySelector("#editNome").value = produto.name;
  document.querySelector("#editCategoria").value = produto.category;
  document.querySelector("#editCusto").value = produto.cost;
  document.querySelector("#editPreco").value = produto.price;
  document.querySelector("#editEstoque").value = produto.stock;
  document.querySelector("#editMinStock").value = produto.min_stock;

  const preco = parseFloat(document.querySelector("#editPreco").value.replace(/\./g, "").replace(",", "."));
  const custo = parseFloat(document.querySelector("#editCusto").value.replace(/\./g, "").replace(",", "."));

  const modal = new bootstrap.Modal(document.querySelector("#editarProdutoModal"));
  modal.show();
}

// Listener único para salvar edição
document.querySelector("#editarProdutoForm").addEventListener("submit", async e => {
  e.preventDefault();
  const id = document.querySelector("#editId").value;
  const nome = document.querySelector("#editNome").value;
  const categoria = document.querySelector("#editCategoria").value;
  const custo = parseFloat(document.querySelector("#editCusto").value);
  const preco = parseFloat(document.querySelector("#editPreco").value);
  const estoque = parseInt(document.querySelector("#editEstoque").value);
  const min_stock = parseInt(document.querySelector("#editMinStock").value);

  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nome, category: categoria, cost: custo, price: preco, stock: estoque, min_stock: min_stock })
  });

  if (res.ok) {
    loadProdutos();
    bootstrap.Modal.getInstance(document.querySelector("#editarProdutoModal")).hide();
    showToast("Produto atualizado com sucesso!", "success");
  } else {
    const data = await res.json();
    showToast(data.error || "Erro ao atualizar produto", "error");
  }
});

// Deletar produto
function deletarProduto(id) {
  fetch(`${API_URL}/api/products/${id}`)
    .then(res => res.json())
    .then(produto => {
      document.querySelector("#deleteId").value = produto.id;
      document.querySelector("#deleteNome").textContent = produto.name;
      const modal = new bootstrap.Modal(document.querySelector("#excluirProdutoModal"));
      modal.show();
    })
    .catch(() => showToast("Erro ao carregar produto para exclusão", "error"));
}

// Listener único para confirmar exclusão
document.querySelector("#confirmDeleteBtn").addEventListener("click", async () => {
  const id = document.querySelector("#deleteId").value;
  const res = await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });

  if (res.ok) {
    loadProdutos();
    bootstrap.Modal.getInstance(document.querySelector("#excluirProdutoModal")).hide();
    showToast("Produto excluído com sucesso!", "success");
  } else {
    const data = await res.json();
    showToast(data.error || "Erro ao excluir produto", "error");
  }
});

// Renderizar gráfico
function renderChart(totalEstoque) {
  const ctx = document.getElementById("estoqueChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Estoque Total"],
      datasets: [{
        label: "Quantidade",
        data: [totalEstoque],
        backgroundColor: "#007bff"
      }]
    }
  });
}

//alertas mensagem estilo (toast - Bootstrap 5)
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");
  const bgClass = type === "success" ? "bg-success" : type === "error" ? "bg-danger" : "bg-warning";

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center text-white ${bgClass} border-0`;
  toastEl.role = "alert";
  toastEl.ariaLive = "assertive";
  toastEl.ariaAtomic = "true";
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  // Remove o toast do DOM após desaparecer
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

function formatCurrency(value) {
  if (!value) return "R$ 0,00";
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatInputCurrency(input) {
  let raw = input.value.replace(/\./g, "").replace(",", ".");
  let numericValue = parseFloat(raw);

  if (isNaN(numericValue)) {
    input.value = "";
    return;
  }

  // Aplica nos campos de cadastro
  document.querySelector("#preco").addEventListener("blur", e => formatInputCurrency(e.target));
  document.querySelector("#custo").addEventListener("blur", e => formatInputCurrency(e.target));

  // Aplica nos campos de edição
  document.querySelector("#editPreco").addEventListener("blur", e => formatInputCurrency(e.target));
  document.querySelector("#editCusto").addEventListener("blur", e => formatInputCurrency(e.target));

  // Mostra com vírgula e duas casas
  input.value = numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });  
}

// Resetar modal de cadastro ao fechar
  document.querySelector("#produtoModal").addEventListener("hidden.bs.modal", () => {
  document.querySelector("#produtoForm").reset();
});

// Resetar modal de edição ao fechar
  document.querySelector("#editarProdutoModal").addEventListener("hidden.bs.modal", () => {
  document.querySelector("#editarProdutoForm").reset();
});

// Inicialização
loadProdutos();

// Atualização automática a cada 10 segundos
setInterval(loadProdutos, 10000);