/* Área principal */
#championships {
  max-width: 1000px;
  margin: 60px auto;
  padding: 0 12px;
}

/* Cards */
.race-card {
  width: 100%;
  margin-bottom: 40px;
  border: 2px solid #ff0000;
  border-radius: 16px;
  box-shadow: 0 0 8px #000;
  padding: 16px;
  background: #1a1a1a;
  color: #fff;
}

/* Imagem Dropbox */
.race-card img.dropbox-toggle {
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 10px;
}

/* Tabelas */
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #222;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #444;
}

/* Linhas escondidas */
tbody tr.hidden {
  display: none;
}

/* =========================
   BOTÃO VOLTAR AO TOPO
   FORMATAÇÃO CANÓNICA
   ACIMA DO DISCLAIMER
========================= */

#backToTop {
  position: fixed;
  right: 20px;
  bottom: 90px; /* acima do footer */

  background: #000;
  color: #fff;

  border: 2px solid #ff0000;
  border-radius: 30px;

  padding: 10px 18px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .5px;
  text-transform: uppercase;

  cursor: pointer;
  display: none;
  z-index: 999;
}

#backToTop:hover {
  background: #ff0000;
  color: #000;
}
