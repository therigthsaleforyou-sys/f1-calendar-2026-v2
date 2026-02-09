<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>F1 Notícias 2026</title>

  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- ================= HEADER ================= -->
  <header>
    <nav class="nav-main">
      <a href="index.html">Calendário</a>
      <a href="f1noticias.html" class="active">Notícias</a>
      <a href="teams.html">Equipas</a>
      <a href="resultados.html">Resultados</a>
    </nav>
  </header>

  <!-- ================= HERO ================= -->
  <section id="hero">
    <img id="hero-image" src="" alt="Hero Corrida">
    <h2 id="hero-title"></h2>
  </section>

  <!-- ================= CARDS ================= -->
  <section class="cards-wrapper">
    <div id="race-cards">

      <!-- ===== CARD NOVIDADES ===== -->
      <div class="race-card" data-id="novidades">
        <img class="race-image" src="assets/heroes/novidades.jpg" alt="Novidades F1">

        <div class="race-header">
          <h3>Novidades F1</h3>
        </div>

        <div class="race-details hidden">
          <p>
            Acompanhe aqui as últimas notícias, vídeos e destaques
            da última corrida de Fórmula 1.
          </p>
        </div>
      </div>

      <!-- Os restantes race-card são gerados dinamicamente pelo noticias.js -->

    </div>
  </section>

  <!-- ================= BACK TO TOP ================= -->
  <button id="back-to-top">↑</button>

  <!-- ================= SCRIPTS ================= -->
  <script src="data/calendar2026-v2.js?v=3"></script>
  <script src="js/noticias.js?v=2"></script>

</body>
</html>
