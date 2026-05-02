(function (app) {
  class DiceRoller {
    roll() {
      return Math.floor(Math.random() * 6) + 1;
    }
  }

  app.domain.services.DiceRoller = DiceRoller;
})(window.YahtzeeApp);
