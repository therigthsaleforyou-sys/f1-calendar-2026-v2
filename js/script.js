// ========= COUNTDOWN =========
const raceDate = new Date("2026-03-08T04:00:00");
const countdown = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    countdown.textContent = "🏁 Corrida em andamento";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  countdown.textContent = `${d}d ${h}h ${m}m`;
}

updateCountdown();
setInterval(updateCountdown, 60000);

// ========= BOTÃO VOLTAR AO TOPO =========
document.getElementById("btn-topo").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ========= PILOTOS – DADOS DINÂMICOS =========
const pilotos = [
  { pos: 1, nome: "Max Verstappen", equipe: "Red Bull", pontos: 26 },
  { pos: 2, nome: "Lewis Hamilton", equipe: "Mercedes", pontos: 18 },
  { pos: 3, nome: "Charles Leclerc", equipe: "Ferrari", pontos: 15 },
  { pos: 4, nome: "Sergio Pérez", equipe: "Red Bull", pontos: 12 },
  { pos: 5, nome: "George Russell", equipe: "Mercedes", pontos: 10 }
];

// ======== LOCALSTORAGE =========
const storageKey = "f12026_pontos";
const saved = localStorage.getItem(storageKey);

if (saved) {
  const savedData = JSON.parse(saved);
  savedData.forEach((p, i) => pilotos[i].pontos = p.pontos);
}

// ========= PREENCHER TABELA =========
const tbody = document.querySelector("#pilotos-table tbody");

function renderPilotos() {
  tbody.innerHTML = "";
  pilotos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.pos}</td><td>${p.nome}</td><td>${p.equipe}</td><td>${p.pontos}</td>`;
    tbody.appendChild(tr);
  });
}

renderPilotos();
