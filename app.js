document.body.style.background = "black";

document.body.innerHTML = `
  <div style="color:white;padding:20px;font-family:sans-serif">
    <h1>JS está a funcionar ✅</h1>
    <p>Hora atual: ${new Date().toLocaleTimeString()}</p>
  </div>
`;
