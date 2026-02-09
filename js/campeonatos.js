<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <title>Campeonato F1 2026 – Austrália</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

<header class="main-header">
  <nav class="nav">
    <a href="../index.html">Calendário</a>
    <a href="../teams.html">Equipas</a>
    <a href="../f1noticias.html">Notícias</a>
  </nav>
</header>

<main>
  <section class="championship-wrapper">

    <!-- TABELA PILOTOS -->
    <div class="championship-card">
      <h3>Campeonato de Pilotos – Austrália</h3>
      <table class="championship-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Piloto</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody id="drivers-standings">
          <!-- Preenchido pelo JS -->
        </tbody>
      </table>
      <a href="../index.html" class="back-calendar-btn">← Voltar ao calendário</a>
    </div>

    <!-- TABELA CONSTRUTORES -->
    <div class="championship-card">
      <h3>Campeonato de Construtores – Austrália</h3>
      <table class="championship-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Construtor</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody id="teams-standings">
          <!-- Preenchido pelo JS -->
        </tbody>
      </table>
    </div>

  </section>
</main>

<footer style="text-align:center;padding:20px;opacity:.6">
  F1 2026
</footer>

<script src="campeonatos.js"></script>
</body>
</html>
