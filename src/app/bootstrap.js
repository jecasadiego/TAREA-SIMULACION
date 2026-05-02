(function (app) {
  function initializeApplication() {
    const { categories } = app.config;
    const { ScoreCalculator, DiceRoller } = app.domain.services;
    const { YahtzeeGame } = app.domain.models;
    const { DiceFaceRenderer } = app.ui.renderers;
    const { YahtzeeUI } = app.ui.components;

    const game = new YahtzeeGame({
      playerNames: ["Jugador 1", "Jugador 2"],
      categories,
      scoreCalculator: new ScoreCalculator(),
      diceRoller: new DiceRoller()
    });

    const ui = new YahtzeeUI({
      game,
      diceFaceRenderer: new DiceFaceRenderer()
    });

    ui.initialize();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApplication);
  } else {
    initializeApplication();
  }
})(window.YahtzeeApp);
