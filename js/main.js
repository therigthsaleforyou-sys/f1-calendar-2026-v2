/* css/style.css */
/* Mobile-first — Estado Canónico */

/* ================= GLOBAL ================= */
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: #000;
  color: #fff;
}

/* ================= HEADER ================= */
header {
  background: #111;
  padding: 10px 0;
}

header nav {
  display: flex;
  justify-content: space-around;
}

header a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

/* ================= HERO ================= */
#hero {
  max-width: 420px;
  margin: 0 auto;
  padding: 12px;
  text-align: center;
}

#hero-image {
  width: 100%;
  border-radius: 14px;
  margin-bottom: 12px;
}

#hero-title {
  font-size: 1.9rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 6px #000;
  margin: 0 0 6px 0;
}

#hero-countdown {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ff2a2a;
}

/* ================= CARDS ================= */
#race-cards {
  max-width: 420px;
  margin: 0 auto;
  padding: 10px;
}

.race-card {
  border: 2px solid red;  /* 🔒 vermelho padrão */
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 14px;
  background: #111;

  /* Animação ao renderizar */
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.4s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.race-card img {
  width: 100%;
  display: block;
}

/* Título e botão favorito na mesma linha */
.race-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.race-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 6px #000;
  margin: 0;
}

/* ================= FAVORITO ================= */
.fav-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
}

.race-card.fav {
  border-color: #ffd700; /* 🔶 amarelo quando favorito */
}

.race-card.fav .fav-btn {
  color: #ffd700;
}

/* ================= DROPDOWN ================= */
.race-details {
  padding: 8px;
  font-size: 0.85rem;
  line-height: 1.3;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.35s ease;
  opacity: 0;
}

.race-details.show {
  max-height: 500px; /* suficiente para o conteúdo */
  opacity: 1;
}

.details-toggle {
  width: 100%;
  background: #222;
  color: #fff;
  border: none;
  padding: 8px;
  font-weight: 600;
  cursor: pointer;
  border-top: 1px solid #333;
}

/* ================= BACK TO TOP ================= */
#back-to-top {
  position: fixed;
  bottom: 12px;
  right: 12px;
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  background: #ff2a2a;
  color: #fff;
  font-weight: 700;
  z-index: 1000;
}

/* ================= FOOTER ================= */
footer {
  text-align: center;
  padding: 14px;
  font-size: 0.75rem;
  opacity: 0.7;
}
