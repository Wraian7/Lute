window.onload = () => {
  renderDiario();
  renderContador();
  renderFeedback();
};

function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.style.opacity = 0;
  });

  const next = document.getElementById(tabId);
  setTimeout(() => {
    next.classList.add('active');
    next.style.opacity = 1;
  }, 100);
}

function renderDiario() {
  const diario = document.getElementById("diario");
  diario.innerHTML = ""; // Limpar antes de renderizar
  for (let i = 1; i <= 30; i++) {
    diario.innerHTML += `
      <div class="card">
        <h3>Dia ${i}</h3>
        <label>Data: <input type="date" /></label>
        <label>Recaída:
          <select>
            <option value="">---</option>
            <option>Com pornografia</option>
            <option>Sem pornografia</option>
          </select>
        </label>
        <label>Gatilhos: <textarea></textarea></label>
        <label>O que fiz para escapar: <textarea></textarea></label>
        <label>Como me senti: <textarea></textarea></label>
        <label>Nota do dia (0–10): <input type="number" min="0" max="10" /></label>
      </div>
    `;
  }
}

function renderContador() {
  const container = document.getElementById("contador");
  const registro = JSON.parse(localStorage.getItem("dias-limpos")) || { inicio: new Date().toISOString() };

  const diasLimpos = Math.floor((new Date() - new Date(registro.inicio)) / (1000 * 60 * 60 * 24));
  const plural = diasLimpos === 1 ? "dia" : "dias";

  container.innerHTML = `
    <div class="card">
      <h2>🧼 Você está limpo há ${diasLimpos} ${plural}</h2>
      <button onclick="reiniciarContador()">Reiniciar contador</button>
    </div>
  `;
}

window.reiniciarContador = () => {
  const confirmar = confirm("Tem certeza que deseja reiniciar seu contador?");
  if (confirmar) {
    const agora = new Date().toISOString();
    localStorage.setItem("dias-limpos", JSON.stringify({ inicio: agora }));
    renderContador();
    alert("Contador reiniciado com sucesso! 🧼");
  }
};

function renderFeedback() {
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = ""; // Limpar antes de renderizar
  for (let i = 1; i <= 4; i++) {
    feedback.innerHTML += `
      <div class="card">
        <h3>Semana ${i}</h3>
        <textarea placeholder="Como foi sua semana ${i}?"></textarea>
      </div>
    `;
  }
}