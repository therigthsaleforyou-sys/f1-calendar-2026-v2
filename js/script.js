// BOTÃO TOPO
document.getElementById("btn-topo").onclick = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

// PRÓXIMA CORRIDA (exemplo Austrália)
const corrida = new Date("2026-03-08T04:00:00");
const countdown = document.getElementById("countdown");

setInterval(() => {
  const diff = corrida - new Date();
  if (diff <= 0) {
    countdown.textContent = "A corrida já começou!";
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  countdown.textContent = `${d}d ${h}h ${m}m`;
}, 1000);

// PILOTOS 2026
const pilotos = [
  ["Max Verstappen","Red Bull Racing"],
  ["Isack Hadjar","Red Bull Racing"],
  ["Lewis Hamilton","Ferrari"],
  ["Charles Leclerc","Ferrari"],
  ["Lando Norris","McLaren"],
  ["Oscar Piastri","McLaren"],
  ["George Russell","Mercedes"],
  ["Kimi Antonelli","Mercedes"],
  ["Fernando Alonso","Aston Martin"],
  ["Lance Stroll","Aston Martin"],
  ["Carlos Sainz","Williams"],
  ["Alexander Albon","Williams"],
  ["Pierre Gasly","Alpine"],
  ["Franco Colapinto","Alpine"],
  ["Esteban Ocon","Haas"],
  ["Oliver Bearman","Haas"],
  ["Nico Hulkenberg","Audi"],
  ["Gabriel Bortoleto","Audi"],
  ["Sergio Perez","Cadillac"],
  ["Valtteri Bottas","Cadillac"],
  ["Liam Lawson","Racing Bulls"],
  ["Arvid Lindblad","Racing Bulls"]
];

// PONTOS DINÂMICOS
const tabelaPilotos = document.getElementById("tabela-pilotos");
pilotos.forEach(p => {
  const pontos = localStorage.getItem(p[0]) || 0;
  tabelaPilotos.innerHTML += `<tr><td>${p[0]}</td><td>${p[1]}</td><td>${pontos}</td></tr>`;
});

// CONSTRUTORES
const construtores = [
  "Red Bull Racing","Ferrari","McLaren","Mercedes","Aston Martin",
  "Williams","Alpine","Haas","Audi","Cadillac","Racing Bulls"
];

const tabelaConstrutores = document.getElementById("tabela-construtores");
construtores.forEach(e => {
  const pontos = localStorage.getItem(e) || 0;
  tabelaConstrutores.innerHTML += `<tr><td>${e}</td><td>${pontos}</td></tr>`;
});
