document.querySelectorAll('input[type="range"]').forEach(slider => {
  slider.addEventListener('input', function () {
    document.getElementById(`${this.id}-value`).innerText = this.value;
  });
});

document.getElementById("analyze-risk-btn").addEventListener("click", () => {
  const threat = document.getElementById("threat").value;

  const damage = parseInt(document.getElementById("damage").value);
  const reproducibility = parseInt(document.getElementById("reproducibility").value);
  const exploitability = parseInt(document.getElementById("exploitability").value);
  const affectedUsers = parseInt(document.getElementById("affected-users").value);
  const discoverability = parseInt(document.getElementById("discoverability").value);

  const riskScore = damage + reproducibility + exploitability + affectedUsers + discoverability;
  document.getElementById("risk-score").innerText = `Total Skor Risiko: ${riskScore}`;

  let recommendation = "";
  if (riskScore > 40) {
    recommendation = `Risiko tinggi! Ambil tindakan segera untuk mengatasi ancaman ${threat}. Terapkan kontrol keamanan seperti enkripsi, pemantauan, dan autentikasi multi-faktor.`;
  } else if (riskScore > 20) {
    recommendation = `Risiko sedang. Atasi ancaman ${threat} dengan validasi sisi server, logging yang ditingkatkan, dan kontrol akses yang lebih ketat.`;
  } else {
    recommendation = `Risiko rendah. Lanjutkan pemantauan dan pertahankan praktik keamanan dasar untuk ancaman ${threat}.`;
  }

  document.getElementById("recommendation").innerText = recommendation;
});
