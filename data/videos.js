window.VIDEOS = [
  { title: "Resumo GP Austrália 2026", url: "https://www.youtube.com/embed/example1" },
  { title: "Resumo GP China 2026", url: "https://www.youtube.com/embed/example2" },
  { title: "Melhores ultrapassagens F1 2026", url: "https://www.youtube.com/embed/example3" },
  { title: "Curiosidades da F1", url: "https://www.youtube.com/embed/example4" }
];

document.addEventListener("DOMContentLoaded", () => {
  const videosDiv = document.getElementById("videos-list");
  if (!videosDiv) return;

  videosDiv.innerHTML = "";
  window.VIDEOS.forEach(video => {
    const container = document.createElement("div");
    container.className = "video-item";
    container.innerHTML = `
      <h4>${video.title}</h4>
      <iframe width="560" height="315" src="${video.url}" 
        title="${video.title}" frameborder="0" allowfullscreen></iframe>
    `;
    videosDiv.appendChild(container);
  });
});
