// js/app.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  // Proteção de rota: se não houver token, redireciona para login
  const token = localStorage.getItem('token');
  if (!token && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
  }

  // Exibir nome do usuário logado no menu de perfil
  const userNameSpan = document.getElementById('userName');
  const userName = localStorage.getItem('userName');
  if (userName && userNameSpan) {
    userNameSpan.textContent = userName;
  }

  // Função de login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userEmail", data.email); // salva também o email
          document.getElementById("loginMessage").innerHTML =
            '<div class="alert alert-success">Login realizado com sucesso!</div>';
          setTimeout(() => (window.location.href = "index.html"), 1000);
        } else {
          document.getElementById("loginMessage").innerHTML =
            `<div class="alert alert-danger">${data.error || "Erro no login"}</div>`;
        }
      } catch (err) {
        document.getElementById('loginMessage').innerHTML =
          '<div class="alert alert-danger">Falha na conexão com servidor</div>';
      }
    });
  }

  // Após navbar carregada via fetch, atualiza nome e ativa nome logado e botão logout no menu de perfil  
  const navbarContainer = document.getElementById('navbar');
  if (navbarContainer) {
    const observer = new MutationObserver(() => {
      const userNameSpan = document.getElementById('userName');
      const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

      // Atualiza nome do usuário
      if (userNameSpan) {
        const userName = localStorage.getItem('userName');
        if (userName) userNameSpan.textContent = userName;
      }

      // Listener do botão de logout
      if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', () => {
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');

          const modalElement = document.getElementById('logoutModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) modalInstance.hide();

          if (window.location.pathname.includes('/pages/')) {
            window.location.href = '../login.html';
          } else {
            window.location.href = 'login.html';
          }
        });
      }
    });

    observer.observe(navbarContainer, { childList: true });
  }

  // Atualiza dados na página de Configurações
  const configUserName = document.getElementById('configUserName');
  const configUserEmail = document.getElementById('configUserEmail');
  if (configUserName) {
    const userName = localStorage.getItem('userName');
    if (userName) configUserName.textContent = userName;
  }
  if (configUserEmail) {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) configUserEmail.textContent = userEmail;
  }

  // Listener para o botão de confirmação do modal de logout
  setTimeout(() => {
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    if (confirmLogoutBtn) {
      confirmLogoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');

        // Fecha o modal
        const modalElement = document.getElementById('logoutModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();

        // Redireciona para login
        if (window.location.pathname.includes('/pages/')) {
          window.location.href = '../login.html';
        } else {
          window.location.href = 'login.html';
        }
      });
    }
  }, 500); // espera navbar ser carregada
});