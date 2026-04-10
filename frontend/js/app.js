// js/app.js

// Função de login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
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
          window.location.href = 'index.html';
        } else {
          document.getElementById('loginMessage').innerText = data.error || 'Erro no login';
        }
      } catch (err) {
        document.getElementById('loginMessage').innerText = 'Falha na conexão com servidor';
      }
    });
  }

  // Função de logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  }
});
