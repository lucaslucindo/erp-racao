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
         localStorage.setItem("userName", data.name); // salva o nome
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

// document.addEventListener('DOMContentLoaded', () => {
//   const userNameSpan = document.getElementById('userName');
//   const userName = localStorage.getItem('userName');
//   if (userName && userNameSpan) {
//     userNameSpan.textContent = userName;
//   }
// });