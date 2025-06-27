window.onload = () => {
  renderDiario();
  renderContador();
  renderFeedback();
};

function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function renderDiario() {
  const diario = document.getElementById("diario");
  for (let i = 1; i <= 30; i++) {
    diario.innerHTML += `
      <div class="card">
        <h3>Dia ${i}</h3>
        <label>Data: <input type="date" /></label><br/>
        <label>Recaída: 
          <select>
            <option value="">---</option>
            <option>Com pornografia</option>
            <option>Sem pornografia</option>
          </select>
        </label><br/>
        <label>Gatilhos: <textarea></textarea></label><br/>
        <label>O que fiz para escapar: <textarea></textarea></label><br/>
        <label>Como me senti: <textarea></textarea></label><br/>
        <label>Nota do dia (0-10): <input type="number" min="0" max="10"/></label>
      </div>`;
  }
}

function renderContador() {
  const dias = JSON.parse(localStorage.getItem("dias-limpos")) || { inicio: new Date().toISOString() };
  const container = document.getElementById("contador");

  function atualizarContador() {
    const diasLimpos = Math.floor((new Date() - new Date(dias.inicio)) / (1000 * 60 * 60 * 24));
    container.innerHTML = `
      <h2>Você está limpo há ${diasLimpos} dias 🧼</h2>
      <button onclick="reiniciarContador()">Reiniciar</button>
    `;
  }

  atualizarContador();
  window.reiniciarContador = () => {
    localStorage.setItem("dias-limpos", JSON.stringify({ inicio: new Date().toISOString() }));
    atualizarContador();
  };
}

function renderFeedback() {
  const feedback = document.getElementById("feedback");
  for (let i = 1; i <= 4; i++) {
    feedback.innerHTML += `
      <div class="card">
        <h3>Semana ${i}</h3>
        <textarea placeholder="Como foi sua semana ${i}?"></textarea>
      </div>
    `;
  }
}