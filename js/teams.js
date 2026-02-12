// js/teams.js

document.addEventListener("DOMContentLoaded", () => {

if (!window.teamsData) {
console.error("teamsData não carregado");
return;
}

const container = document.getElementById("teams-container");

teamsData.forEach(team => {
const card = document.createElement("div");
card.className = "team-card";

card.innerHTML = `  
  <img src="${team.image}" alt="${team.name}">  
  <h2>${team.name}</h2>  
  <p>${team.drivers.join(" & ")}</p>  
`;  

container.appendChild(card);

});

});
