// ========= COUNTDOWN =========
const raceDate = new Date("2026-03-08T04:00:00");
const countdown = document.getElementById("countdown");
function updateCountdown() {
  const now = new Date();
  const diff = raceDate - now;
  if(diff <= 0){countdown.textContent="🏁 Corrida em andamento";return;}
  const d=Math.floor(diff/(1000*60*60*24));
  const h=Math.floor((diff/(1000*60*60))%24);
  const m=Math.floor((diff/(1000*60))%60);
  countdown.textContent=`${d}d ${h}h ${m}m`;
}
updateCountdown();
setInterval(updateCountdown,60000);

// ========= BOTÃO VOLTAR AO TOPO =========
document.getElementById("btn-topo").onclick = () => { window.scrollTo({ top:0, behavior:"smooth" }); };

// ========= PILOTOS 2026 =========
const pilotos=[
  {pos:1,nome:"Max Verstappen",equipe:"Red Bull",pontos:26},
  {pos:2,nome:"Sergio Pérez",equipe:"Red Bull",pontos:18},
  {pos:3,nome:"Lewis Hamilton",equipe:"Mercedes",pontos:15},
  {pos:4,nome:"George Russell",equipe:"Mercedes",pontos:12},
  {pos:5,nome:"Charles Leclerc",equipe:"Ferrari",pontos:10},
  {pos:6,nome:"Carlos Sainz",equipe:"Ferrari",pontos:8},
  {pos:7,nome:"Lando Norris",equipe:"McLaren",pontos:6},
  {pos:8,nome:"Oscar Piastri",equipe:"McLaren",pontos:4},
  {pos:9,nome:"Fernando Alonso",equipe:"Aston Martin",pontos:2},
  {pos:10,nome:"Lance Stroll",equipe:"Aston Martin",pontos:1},
  {pos:11,nome:"Esteban Ocon",equipe:"Alpine",pontos:0},
  {pos:12,nome:"Pierre Gasly",equipe:"Alpine",pontos:0},
  {pos:13,nome:"Logan Sargeant",equipe:"Williams",pontos:0},
  {pos:14,nome:"Alexander Albon",equipe:"Williams",pontos:0},
  {pos:15,nome:"Kevin Magnussen",equipe:"Haas",pontos:0},
  {pos:16,nome:"Nico Hülkenberg",equipe:"Haas",pontos:0},
  {pos:17,nome:"Valtteri Bottas",equipe:"Cadillac",pontos:0},
  {pos:18,nome:"Sergio Pérez",equipe:"Cadillac",pontos:0},
  {pos:19,nome:"Oliver Bearman",equipe:"Haas",pontos:0},
  {pos:20,nome:"Gabriel Bortoleto",equipe:"Audi",pontos:0},
  {pos:21,nome:"Franco Colapinto",equipe:"Alpine",pontos:0},
  {pos:22,nome:"Isack Hadjar",equipe:"Red Bull",pontos:0}
];

// ========= CONSTRUTORES 2026 =========
const construtores=[
  {pos:1,equipe:"Red Bull",pontos:44},
  {pos:2,equipe:"Mercedes",pontos:27},
  {pos:3,equipe:"Ferrari",pontos:18},
  {pos:4,equipe:"McLaren",pontos:10},
  {pos:5,equipe:"Aston Martin",pontos:3},
  {pos:6,equipe:"Alpine",pontos:0},
  {pos:7,equipe:"Williams",pontos:0},
  {pos:8,equipe:"Haas",pontos:0},
  {pos:9,equipe:"Cadillac",pontos:0},
  {pos:10,equipe:"Audi",pontos:0},
  {pos:11,equipe:"Racing Bulls",pontos:0}
];

// ========= LOCALSTORAGE =========
const storagePilotosKey="f12026_pontos_pilotos";
const storageConstrutoresKey="f12026_pontos_construtores";
const savedPilotos=localStorage.getItem(storagePilotosKey);
if(savedPilotos){JSON.parse(savedPilotos).forEach((p,i)=>pilotos[i].pontos=p.pontos);}
const savedConstrutores=localStorage.getItem(storageConstrutoresKey);
if(savedConstrutores){JSON.parse(savedConstrutores).forEach((c,i)=>construtores[i].pontos=c.pontos);}

// ========= RENDER PILOTOS =========
const tbodyPilotos=document.querySelector("#pilotos-table tbody");
function renderPilotos(){tbodyPilotos.innerHTML=""; pilotos.forEach(p=>{const tr=document.createElement("tr"); tr.innerHTML=`<td>${p.pos}</td><td>${p.nome}</td><td>${p.equipe}</td><td>${p.pontos}</td>`; tbodyPilotos.appendChild(tr);});}
renderPilotos();

// ========= RENDER CONSTRUTORES =========
const tbodyConstrutores=document.querySelector("#construtores-table tbody");
function renderConstrutores(){tbodyConstrutores.innerHTML=""; construtores.forEach(c=>{const tr=document.createElement("tr"); tr.innerHTML=`<td>${c.pos}</td><td>${c.equipe}</td><td>${c.pontos}</td>`; tbodyConstrutores.appendChild(tr);});}
renderConstrutores();

// ========= CALENDÁRIO + HISTÓRICO 2025 + SESSÕES =========
const corridas=[
  {gp:"Austrália", data:"2026-03-08T04:00:00", circuito:"Melbourne GP Circuit",
   sessoes:{
     FP1:"02:00", FP2:"05:00", FP3:"08:00", Qualificacao:"10:00", Corrida:"04:00"
   },
   historico:{
    pole:{piloto:"Max Verstappen", tempo:"1:18.123"},
    melhorVolta:{piloto:"Lewis Hamilton", tempo:"1:19.456"},
    podio:["Max Verstappen","Charles Leclerc","Lewis Hamilton"],
    meteorologia:"Ensolarado, 25°C"
   }
  },
  {gp:"Bahrein", data:"2026-03-15T04:00:00", circuito:"Sakhir GP Circuit",
   sessoes:{FP1:"02:00", FP2:"05:00", FP3:"08:00", Qualificacao:"10:00", Corrida:"04:00"},
   historico:{
    pole:{piloto:"Charles Leclerc", tempo:"1:29.321"},
    melhorVolta:{piloto:"Sergio Pérez", tempo:"1:30.111"},
    podio:["Charles Leclerc","Sergio Pérez","George Russell"],
    meteorologia:"Nublado, 22°C"
   }
  }
  // Adicionar as outras corridas 2026 aqui
];

const corridasList=document.getElementById("corridas-list");

corridas.forEach((c,i)=>{
  const card=document.createElement("div");
  card.className="race-card";
  let sessoesHtml="";
  for(const key in c.sessoes){sessoesHtml+=`<p>${key}: ${c.sessoes[key]} (PT)</p>`;}
  card.innerHTML=`<strong>${c.gp}</strong> - ${new Date(c.data).toLocaleDateString()}<br>${c.circuito}${sessoesHtml}`;
  
  const historicoDiv=document.createElement("div");
  historicoDiv.className="historico";
  historicoDiv.innerHTML=`<p>🌡️ Meteorologia: ${c.historico.meteorologia}</p>
                          <p>🏁 Pole position: ${c.historico.pole.piloto} - ${c.historico.pole.tempo}</p>
                          <p>⏱️ Melhor volta: ${c.historico.melhorVolta.piloto} - ${c.historico.melhorVolta.tempo}</p>
                          <p>🥇🥈🥉 Pódio: ${c.historico.podio.join(", ")}</p>`;
  
  card.addEventListener("click",()=>{historicoDiv.style.display=historicoDiv.style.display==="none"?"block":"none";});
  card.appendChild(historicoDiv);
  corridasList.appendChild(card);
});
