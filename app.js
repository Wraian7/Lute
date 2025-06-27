window.onload = () => {
  renderDiario();
  renderContador();
  renderFeedback();
};

function switchTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
    tab.style.opacity = 0;
  });

  const next = document.getElementById(tabId);
  setTimeout(() => {
    next.classList.add("active");
    next.style.opacity = 1;
  }, 100);
}

// ⏳ SALVAR/RESTAR os campos dos cartões
function salvarCampo(tipo, indice, campo, valor) {
  const chave = `noFap-${tipo}-${indice}`;
  const dados = JSON.parse(localStorage.getItem(chave)) || {};
  dados[campo] = valor;
  localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarCampo(tipo, indice, campo) {
  const chave = `noFap-${tipo}-${indice}`;
  const dados = JSON.parse(localStorage.getItem(chave)) || {};
  return dados[campo] || "";
}

function renderDiario() {
  const diario = document.getElementById("diario");
  diario.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    diario.innerHTML += `
      <div class="card" data-index="${i}">
        <h3>Dia ${i}</h3>
        <label>Data: <input type="date" id="data-${i}" /></label>
        <label>Recaída:
          <select id="recaida-${i}">
            <option value="">---</option>
            <option>Com pornografia</option>
            <option>Sem pornografia</option>
          </select>
        </label>
        <label>Gatilhos: <textarea id="gatilhos-${i}"></textarea></label>
        <label>O que fiz para escapar: <textarea id="escapou-${i}"></textarea></label>
        <label>Como me senti: <textarea id="sentimento-${i}"></textarea></label>
        <label>Nota do dia (0–10): <input type="number" min="0" max="10" id="nota-${i}" /></label>
      </div>
    `;

    // Preenche campos salvos
    setTimeout(() => {
      document.getElementById(`data-${i}`).value = carregarCampo("diario", i, "data");
      document.getElementById(`recaida-${i}`).value = carregarCampo("diario", i, "recaida");
      document.getElementById(`gatilhos-${i}`).value = carregarCampo("diario", i, "gatilhos");
      document.getElementById(`escapou-${i}`).value = carregarCampo("diario", i, "escapou");
      document.getElementById(`sentimento-${i}`).value = carregarCampo("diario", i, "sentimento");
      document.getElementById(`nota-${i}`).value = carregarCampo("diario", i, "nota");

      // Observadores para salvar ao digitar
      document.getElementById(`data-${i}`).addEventListener("input", e => salvarCampo("diario", i, "data", e.target.value));
      document.getElementById(`recaida-${i}`).addEventListener("input", e => salvarCampo("diario", i, "recaida", e.target.value));
      document.getElementById(`gatilhos-${i}`).addEventListener("input", e => salvarCampo("diario", i, "gatilhos", e.target.value));
      document.getElementById(`escapou-${i}`).addEventListener("input", e => salvarCampo("diario", i, "escapou", e.target.value));
      document.getElementById(`sentimento-${i}`).addEventListener("input", e => salvarCampo("diario", i, "sentimento", e.target.value));
      document.getElementById(`nota-${i}`).addEventListener("input", e => salvarCampo("diario", i, "nota", e.target.value));
    }, 0);
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
  feedback.innerHTML = "";

  for (let i = 1; i <= 4; i++) {
    const campoId = `feedback-${i}`;
    feedback.innerHTML += `
      <div class="card">
        <h3>Semana ${i}</h3>
        <textarea id="${campoId}" placeholder="Como foi sua semana ${i}?"></textarea>
      </div>
    `;

    setTimeout(() => {
      document.getElementById(campoId).value = carregarCampo("feedback", i, "texto");
      document.getElementById(campoId).addEventListener("input", e => {
        salvarCampo("feedback", i, "texto", e.target.value);
      });
    }, 0);
  }
}

// Exportar dados como JSON
window.exportarBackup = () => {
  const backup = {};
  Object.keys(localStorage).forEach(chave => {
    if (chave.startsWith("noFap-") || chave === "dias-limpos") {
      backup[chave] = localStorage.getItem(chave);
    }
  });
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "backup-noFap.json";
  link.click();

  URL.revokeObjectURL(url);
};

// Importar backup a partir de um arquivo
window.importarBackup = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        Object.keys(data).forEach(key => {
          localStorage.setItem(key, data[key]);
        });
        alert("Backup restaurado com sucesso! Recarregando página...");
        location.reload();
      } catch {
        alert("Erro ao importar backup. Certifique-se de que o arquivo está correto.");
      }
    };
    reader.readAsText(file);
  };
  input.click();
};