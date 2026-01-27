const raceList = [
  {id:'australia', country:'Austrália', month:'Março', name:'GP Austrália', date:'2026-03-08T04:00:00'},
  {id:'china', country:'China', month:'Abril', name:'GP China', date:'2026-04-12T08:00:00'}
];

// ELEMENTOS
const countdownEl = document.getElementById('countdown');
const nextRaceNameEl = document.getElementById('next-race-name');
const raceLinkEl = document.getElementById('race-link');
const heroRaceNameEl = document.getElementById('hero-next-race');
const filterMonth = document.getElementById('filter-month');
const filterCountry = document.getElementById('filter-country');
const raceListEl = document.getElementById('race-list');
const scrollBtn = document.getElementById('scroll-top-btn');

// PRÓXIMA CORRIDA
let upcomingRace = raceList[0];
nextRaceNameEl.textContent = upcomingRace.name;
raceLinkEl.href = `race-${upcomingRace.id}.html`;
if(heroRaceNameEl) heroRaceNameEl.textContent = `${upcomingRace.name} – F1 2026`;

// FILTROS
function renderRaces(filterMonthVal, filterCountryVal){
  raceListEl.innerHTML='';
  raceList.forEach(r=>{
    if((filterMonthVal==='all'||r.month===filterMonthVal) &&
       (filterCountryVal==='all'||r.country===filterCountryVal)){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = r.name;
      a.href = `race-${r.id}.html`;
      li.appendChild(a);
      raceListEl.appendChild(li);
    }
  });
}
renderRaces('all','all');
filterMonth.addEventListener('change',e=>renderRaces(e.target.value,filterCountry.value));
filterCountry.addEventListener('change',e=>renderRaces(filterMonth.value,e.target.value));

// COUNTDOWN
function updateCountdown(dateStr, el){
  function tick(){
    const diff = new Date(dateStr)-new Date();
    if(diff<=0){el.textContent='Começou!'; clearInterval(interval);}
    else{
      const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000), m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
      el.textContent=`${d}d ${h}h ${m}m ${s}s`;
    }
  }
  tick();
  const interval = setInterval(tick,1000);
}
if(countdownEl) updateCountdown(upcomingRace.date,countdownEl);

// SCROLL TOP
if(scrollBtn){
  scrollBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}
