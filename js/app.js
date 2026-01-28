function formatLocalTime(utc) {
  const d = new Date(utc);
  return d.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function startCountdown(targetUtc, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function tick() {
    const diff = new Date(targetUtc) - new Date();
    if (diff <= 0) {
      el.textContent = "A decorrer";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    el.textContent = `${d}d ${h}h ${m}m`;
  }

  tick();
  setInterval(tick, 60000);
}

function loadRacePage(raceId) {
  const race = F1_2026_DATA.races.find(r => r.id === raceId);
  if (!race) return;

  document.getElementById("race-title").textContent = race.name;
  document.getElementById("hero").style.backgroundImage = `url(${race.hero})`;

  startCountdown(race.sessions.race, "countdown");

  const sessionsEl = document.getElementById("sessions");
  sessionsEl.innerHTML = "";

  if (race.sprint) {
    sessionsEl.innerHTML += `<p>FP1 – ${formatLocalTime(race.sessions.fp1)}</p>`;
    sessionsEl.innerHTML += `<p>Sprint Qualifying – ${formatLocalTime(race.sessions.sprintQuali)}</p>`;
    sessionsEl.innerHTML += `<p>Sprint – ${formatLocalTime(race.sessions.sprint)}</p>`;
  } else {
    sessionsEl.innerHTML += `<p>FP1 – ${formatLocalTime(race.sessions.fp1)}</p>`;
    sessionsEl.innerHTML += `<p>FP2 – ${formatLocalTime(race.sessions.fp2)}</p>`;
    sessionsEl.innerHTML += `<p>FP3 – ${formatLocalTime(race.sessions.fp3)}</p>`;
  }

  sessionsEl.innerHTML += `<p>Qualificação – ${formatLocalTime(race.sessions.quali)}</p>`;
  sessionsEl.innerHTML += `<p>Corrida – ${formatLocalTime(race.sessions.race)}</p>`;

  const h = race.history2025;
  document.getElementById("history").innerHTML = `
    <p>Meteorologia: ${h.weather}</p>
    <p>Pole: ${h.pole}</p>
    <p>Melhor volta: ${h.fastestLap}</p>
    <p>Tempo total: ${h.totalTime}</p>
    <p>Pódio: ${h.podium}</p>
  `;
}
