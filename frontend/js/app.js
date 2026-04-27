// js/app.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

  // Proteção de rota: se não houver token, redireciona para login
  const token = localStorage.getItem('token');
  if (!token && window.location.pathname.includes('index.html')) {
    window.location.href = 'login.html';
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
          localStorage.setItem('token', data.token);
          document.getElementById('loginMessage').innerHTML =
            '<div class="alert alert-success">Login realizado com sucesso!</div>';
          setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
          document.getElementById('loginMessage').innerHTML =
            `<div class="alert alert-danger">${data.error || 'Erro no login'}</div>`;
        }
      } catch (err) {
        document.getElementById('loginMessage').innerHTML =
          '<div class="alert alert-danger">Falha na conexão com servidor</div>';
      }
    });
  }

  // Função de logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert('Sessão encerrada com sucesso!');
      window.location.href = 'login.html';
    });
  }
});