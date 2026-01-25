document.addEventListener("DOMContentLoaded", () => {
  if(typeof races === "undefined") return;
  initCountdown();
  initInternalCountdown();
  initRaceDetails();
  initScrollTopButton();
});

function initCountdown(){
  const countdownEl = document.getElementById("countdown");
  const raceLink = document.getElementById("race-link");
  if(!countdownEl) return;
  const now = new Date();
  const upcoming = races.filter(r=>new Date(r.sessions.FP1)>now);
  const nextRace = upcoming.length ? upcoming[0] : races[races.length-1];
  countdownEl.dataset.raceId = nextRace.id;
  if(raceLink){
    raceLink.href=`race-${nextRace.id}.html`;
    raceLink.textContent="Ver página da corrida →";
  }
  updateCountdown(countdownEl, new Date(nextRace.sessions.FP1));
  setInterval(()=>updateCountdown(countdownEl,new Date(nextRace.sessions.FP1)),1000);
}

function initInternalCountdown(){
  const internalCountdown=document.getElementById("internal-countdown");
  const raceId=document.body.dataset.raceId;
  if(!internalCountdown||!raceId) return;
  const race=races.find(r=>r.id===raceId);
  if(!race) return;
  updateCountdown(internalCountdown,new Date(race.sessions.FP1));
  setInterval(()=>updateCountdown(internalCountdown,new Date(race.sessions.FP1)),1000);
}

function updateCountdown(element,raceDate){
  const now=new Date();
  const diff=raceDate-now;
  if(diff<=0){ element.textContent="Sessão em andamento ou terminada"; return;}
  const days=Math.floor(diff/(1000*60*60*24));
  const hours=Math.floor((diff/(1000*60*60))%24);
  const minutes=Math.floor((diff/(1000*60))%60);
  const seconds=Math.floor((diff/1000)%60);
  element.textContent=`${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Preencher dados da corrida dinamicamente
function initRaceDetails(){
  const raceId=document.body.dataset.raceId;
  if(!raceId) return;
  const race=races.find(r=>r.id===raceId);
  if(!race) return;

  // Sessões 2026
  const sessionContainer=document.getElementById("sessions-2026");
  if(sessionContainer){
    let html="<table border='1' cellpadding='5'><tr><th>Session</th><th>Data/Hora</th></tr>";
    for(let s in race.sessions){
      html+=`<tr><td>${s}</td><td>${new Date(race.sessions[s]).toLocaleString("pt-PT",{dateStyle:"short",timeStyle:"short"})}</td></tr>`;
      // Preencher resultados 2026 dinamicamente (placeholder)
      race.results2026[s]={winner:"TBD", time:"TBD"};
    }
    html+="</table>";
    sessionContainer.innerHTML=html;
  }

  // Ficha técnica + histórico 2025
  const historyContainer=document.getElementById("history-2025");
  if(historyContainer){
    const h=race.history2025;
    let html=`<ul>
      <li>Clima: ${h.weather}</li>
      <li>Pole 2025: ${h.poleTime}</li>
      <li>Melhor volta: ${h.fastestLap}</li>
      <li>Tempo total corrida: ${h.totalRaceTime}</li>
      <li>Top 3: ${h.top3.join(", ")}</li>
    </ul>`;
    historyContainer.innerHTML=html;
  }

  // Resultados placeholder 2026
  const resultsContainer=document.getElementById("results-2026");
  if(resultsContainer){
    let html="<table border='1' cellpadding='5'><tr><th>Session</th><th>Vencedor</th><th>Tempo</th></tr>";
    for(let s in race.results2026){
      html+=`<tr><td>${s}</td><td>${race.results2026[s].winner}</td><td>${race.results2026[s].time}</td></tr>`;
    }
    html+="</table>";
    resultsContainer.innerHTML=html;
  }
}

// Scroll-top
function initScrollTopButton(){
  const btn=document.createElement("button");
  btn.textContent="↑ Topo";
  btn.className="scroll-top";
  btn.onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
  document.body.appendChild(btn);
}

// Botão imprimir
function printPage(){ window.print(); }
