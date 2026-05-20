// js/configuracoes.js

document.addEventListener('DOMContentLoaded', () => {
  // Preenche dados do usuário logado
  const configUserName = document.getElementById('configUserName');
  const configUserEmail = document.getElementById('configUserEmail');
  if (configUserName) configUserName.textContent = localStorage.getItem('userName') || '';
  if (configUserEmail) configUserEmail.textContent = localStorage.getItem('userEmail') || '';

  const editarPerfilModal = document.getElementById('editarPerfilModal');
  if (editarPerfilModal) {
    editarPerfilModal.addEventListener('show.bs.modal', () => {
      document.getElementById('editNome').value = localStorage.getItem('userName') || '';
      document.getElementById('editEmail').value = localStorage.getItem('userEmail') || '';

      // Se você salvar a permissão no localStorage, pode preencher também:
      const permissao = localStorage.getItem('userPermissao') || 'usuario';
      if (permissao === 'admin') {
        document.getElementById('editPermissaoAdmin').checked = true;
      } else {
        document.getElementById('editPermissaoComum').checked = true;
      }
    });
  }

  // Listener do formulário de edição de perfil
  const editarPerfilForm = document.getElementById('editarPerfilForm');
  if (editarPerfilForm) {
    editarPerfilForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = document.getElementById('editNome').value;
      const email = document.getElementById('editEmail').value;
      const senhaAtual = document.getElementById('editSenhaAtual').value;
      const novaSenha = document.getElementById('editNovaSenha').value;
      const confirmarSenha = document.getElementById('editConfirmarSenha').value;
      const permissao = document.querySelector('input[name="editPermissao"]:checked').value;

      if (novaSenha !== confirmarSenha) {
        alert("A nova senha e a confirmação não coincidem!");
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/users/update', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ nome, email, senhaAtual, novaSenha, permissao })
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("userName", data.nome);
          localStorage.setItem("userEmail", data.email);
          alert("Perfil atualizado com sucesso!");
          window.location.reload();
        } else {          
          if (data.error && data.error.toLowerCase().includes("senha")) {
            alert("Senha atual incorreta. Tente novamente.");
          } else {
            alert(data.error || "Erro ao atualizar perfil");
          }
        }
      } catch (err) {
        alert("Falha na conexão com servidor");
      }
    });
  }

  // Listener do formulário de novo usuário
  const novoUsuarioForm = document.getElementById('novoUsuarioForm');
  if (novoUsuarioForm) {
    novoUsuarioForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = document.getElementById('novoNome').value;
      const email = document.getElementById('novoEmail').value;
      const senha = document.getElementById('novaSenha').value;
      const permissao = document.getElementById('permissao').value;

      try {
        const res = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ nome, email, senha, permissao })
        });

        const data = await res.json();
        if (res.ok) {
          alert("Usuário criado com sucesso!");
          window.location.reload();
        } else {
          alert(data.error || "Erro ao criar usuário");
        }
      } catch (err) {
        alert("Falha na conexão com servidor");
      }
    });
  }
});