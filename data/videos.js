window.VIDEOS = [
  {
    title: "Resumo GP Austrália",
    url: "https://www.youtube.com/embed/lw1R0VQpFjI"
  },
  {
    title: "Resumo GP China",
    url: "https://www.youtube.com/embed/yG6cKcZ0e6Q"
  },
  {
    title: "Melhores ultrapassagens F1",
    url: "https://www.youtube.com/embed/6x7kzY1Kc1Q"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("videos-list");
  if (!container) return;

  window.VIDEOS.forEach(v => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${v.title}</h3>
      <iframe width="100%" height="315"
        src="${v.url}"
        frameborder="0"
        allowfullscreen></iframe>
    `;
    container.appendChild(div);
  });
});
