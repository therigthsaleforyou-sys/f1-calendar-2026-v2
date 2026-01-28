// 🌍 Fuso Lisboa/PT
const fusoLisboa = () => {
    return new Date().toLocaleString("en-US", { timeZone: "Europe/Lisbon" });
};

// 🏁 Calendário oficial 2026
const corridas = [
    { gp: "Austrália – Melbourne", fp1: "06:00", fp2: "09:00", fp3: "12:00", qual: "15:00", sprint: "", corrida: "16:00", data: "2026-03-08T16:00:00" },
    { gp: "China – Shanghai", fp1: "06:00", fp2: "09:00", fp3: "12:00", qual: "15:00", sprint: "17:00", corrida: "16:00", data: "2026-03-15T16:00:00" },
    { gp: "Japão – Suzuka", fp1: "06:00", fp2: "09:00", fp3: "12:00", qual: "15:00", sprint: "", corrida: "16:00", data: "2026-03-29T16:00:00" },
    // Adicionar todas as restantes corridas 2026
];

// 💻 Preencher tabela do calendário
const tbody = document.querySelector("#calendario tbody");
corridas.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${c.gp}</td>
        <td>${c.fp1}</td>
        <td>${c.fp2}</td>
        <td>${c.fp3}</td>
        <td>${c.qual}</td>
        <td>${c.sprint}</td>
        <td>${c.corrida}</td>
    `;
    tbody.appendChild(tr);
});

// ⏱ Countdown Próxima Corrida
function proximaCorrida() {
    const agora = new Date(fusoLisboa());
    let prox = corridas.find(c => new Date(c.data) > agora);
    if (!prox) prox = corridas[0]; // se passar todas, volta à primeira
    document.getElementById("nome-corrida").textContent = prox.gp;
    
    const countdownEl = document.getElementById("countdown");
    function atualizarCountdown() {
        const agora = new Date(fusoLisboa());
        const fim = new Date(prox.data);
        const diff = fim - agora;
        if (diff <= 0) { countdownEl.textContent = "Corrida a decorrer!"; return; }
        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const min = Math.floor((diff / (1000 * 60)) % 60);
        const sec = Math.floor((diff / 1000) % 60);
        countdownEl.textContent = `${dias}d ${horas}h ${min}m ${sec}s`;
    }
    atualizarCountdown();
    setInterval(atualizarCountdown, 1000);
}
proximaCorrida();

// 🏆 Pontos pilotos 2026 (exemplo)
let pilotos2026 = JSON.parse(localStorage.getItem("pilotos2026")) || [
    { nome: "Lewis Hamilton", pontos: 0 },
    { nome: "Max Verstappen", pontos: 0 },
    { nome: "Charles Leclerc", pontos: 0 },
];
localStorage.setItem("pilotos2026", JSON.stringify(pilotos2026));
