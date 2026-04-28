const API_URL = "http://localhost:3000";

// Carregar produtos
async function loadProdutos() {
  const res = await fetch(`${API_URL}/api/products`);
  const data = await res.json();
  const tbody = document.querySelector("#produtosTable tbody");
  tbody.innerHTML = "";

  let totalEstoque = 0;

  // Se o back-end retorna { products: [...] }
  const produtos = data.products || data;

  produtos.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>R$ ${parseFloat(p.price).toFixed(2)}</td>
        <td>${p.stock}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProduto(${p.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deletarProduto(${p.id})">Excluir</button>
        </td>
      </tr>`;
    totalEstoque += p.stock;
  });

  renderChart(totalEstoque);
}

// Salvar produto
// document.querySelector("#produtoForm").addEventListener("submit", async e => {
//   e.preventDefault();
//   const nome = document.querySelector("#nome").value;
//   const preco = parseFloat(document.querySelector("#preco").value);
//   const estoque = parseInt(document.querySelector("#estoque").value);

//   await fetch(`${API_URL}/products`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name: nome, price: preco, stock: estoque })
//   });

//   loadProdutos();
//   bootstrap.Modal.getInstance(document.querySelector("#produtoModal")).hide();
// });

document.querySelector("#produtoForm").addEventListener("submit", async e => {
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const preco = parseFloat(document.querySelector("#preco").value);
  const estoque = parseInt(document.querySelector("#estoque").value);
  const categoria = document.querySelector("#categoria").value;
  const custo = parseFloat(document.querySelector("#custo").value);
  const min_stock = parseInt(document.querySelector("#min_stock").value);

  const res = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nome,
      category: categoria,
      cost: custo,
      price: preco,
      stock: estoque,
      min_stock: min_stock
    })
  });

  if (res.ok) {
    loadProdutos();
    bootstrap.Modal.getInstance(document.querySelector("#produtoModal")).hide();
  } else {
    const data = await res.json();
    alert(data.error || "Erro ao salvar produto");
  }
});

// Editar produto
async function editarProduto(id) {
  const novoNome = prompt("Novo nome do produto:");
  const novoPreco = prompt("Novo preço:");
  const novoEstoque = prompt("Novo estoque:");

  if (novoNome && novoPreco && novoEstoque) {
    await fetch(`${API_URL}/api/products${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: novoNome, price: parseFloat(novoPreco), stock: parseInt(novoEstoque) })
    });
    loadProdutos();
  }
}

// Deletar produto
async function deletarProduto(id) {
  if (confirm("Deseja realmente excluir este produto?")) {
    await fetch(`${API_URL}/api/products${id}`, { method: "DELETE" });
    loadProdutos();
  }
}

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

// Inicialização
loadProdutos();