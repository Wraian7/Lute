window.exportarPdf = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("🚀 Histórico NoFap Tracker", 105, y, { align: "center" });
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const contador = JSON.parse(localStorage.getItem("dias-limpos"));
  if (contador) {
    const dias = Math.floor((new Date() - new Date(contador.inicio)) / (1000 * 60 * 60 * 24));
    doc.text(`🧼 Dias limpo: ${dias}`, 14, y);
    y += 10;
  }

  for (let i = 1; i <= 30; i++) {
    const dados = JSON.parse(localStorage.getItem(`noFap-diario-${i}`));
    if (dados && y < 270) {
      doc.setFont("helvetica", "bold");
      doc.text(`Dia ${i}`, 14, y += 7);
      doc.setFont("helvetica", "normal");

      if (dados.data) doc.text(`📅 Data: ${dados.data}`, 14, y += 6);
      if (dados.recaida) doc.text(`🔁 Recaída: ${dados.recaida}`, 14, y += 6);
      if (dados.gatilhos) doc.text(`⚠️ Gatilhos: ${dados.gatilhos}`, 14, y += 6);
      if (dados.escapou) doc.text(`🛡️ Escapou: ${dados.escapou}`, 14, y += 6);
      if (dados.sentimento) doc.text(`💭 Sentimento: ${dados.sentimento}`, 14, y += 6);
      if (dados.nota) doc.text(`⭐ Nota: ${dados.nota}/10`, 14, y += 6);
      y += 4;
    }

    if (y >= 270) {
      doc.addPage();
      y = 20;
    }
  }

  for (let i = 1; i <= 4; i++) {
    const dados = JSON.parse(localStorage.getItem(`noFap-feedback-${i}`));
    if (dados?.texto && y < 270) {
      doc.setFont("helvetica", "bold");
      doc.text(`📦 Semana ${i}`, 14, y += 6);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(dados.texto, 180);
      doc.text(lines, 14, y += 6);
      y += lines.length * 6 + 4;
    }

    if (y >= 270) {
      doc.addPage();
      y = 20;
    }
  }

  doc.save("historico-noFap.pdf");
};