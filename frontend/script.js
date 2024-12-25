// Простая имитация маршрутов
const routes = {
    "/": "/pages/login.html",
    "/login": "/pages/login.html",
    "/dashboard": "/pages/dashboard.html",
  };
  
  // Эмуляция навигации
  const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
  };
  
  // Роутер
  const router = async () => {
    const path = window.location.pathname;
    const route = routes[path] || "/pages/404.html";
  
    const html = await fetch(route).then((res) => res.text());
    document.getElementById("app").innerHTML = html;
  
    if (path === "/login") setupLoginPage();
    if (path === "/dashboard") setupDashboardPage();
  };
  
  // Логика для страницы логина
  const setupLoginPage = () => {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) throw new Error("Invalid credentials");
  
        const { token } = await response.json();
        localStorage.setItem("token", token);
  
        navigateTo("/dashboard");
      } catch (err) {
        errorMessage.textContent = err.message || "Something went wrong";
        errorMessage.classList.remove("hidden");
      }
    });
  };
  
  // Логика для страницы Dashboard
  const setupDashboardPage = () => {
    const logoutButton = document.getElementById("logout-btn");
  
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      navigateTo("/login");
    });
  
    const token = localStorage.getItem("token");
    if (!token) navigateTo("/login");
  };
  
  // Обработка навигации по клику на ссылки
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  
  // Запуск роутера при загрузке страницы
  window.addEventListener("popstate", router);
  window.addEventListener("DOMContentLoaded", router);
  