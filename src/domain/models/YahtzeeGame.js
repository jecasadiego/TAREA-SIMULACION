(function (app) {
  const { Player } = app.domain.entities;

  class YahtzeeGame {
    constructor({ playerNames, categories, scoreCalculator, diceRoller }) {
      this.categories = categories;
      this.scoreCalculator = scoreCalculator;
      this.diceRoller = diceRoller;
      this.maxRollsPerTurn = 3;
      this.players = playerNames.map((name) => new Player(name, categories));
      this.resetGame();
    }

    resetGame() {
      this.players.forEach((player) => player.resetScoreCard());
      this.currentPlayerIndex = 0;
      this.rollsUsed = 0;
      this.dice = this.createInitialDice();
      this.isGameOver = false;
      this.message = "Lanza los dados para comenzar el turno.";
    }

    createInitialDice() {
      return Array.from({ length: 5 }, (_, index) => ({
        id: index,
        value: null,
        kept: false
      }));
    }

    get currentPlayer() {
      return this.players[this.currentPlayerIndex];
    }

    get rollsLeft() {
      return this.maxRollsPerTurn - this.rollsUsed;
    }

    rollDice() {
      if (this.isGameOver) {
        return false;
      }

      if (this.rollsUsed >= this.maxRollsPerTurn) {
        this.message = "Ya no tienes mas lanzamientos en este turno.";
        return false;
      }

      this.dice = this.dice.map((die) => {
        if (this.rollsUsed === 0 || !die.kept) {
          return { ...die, value: this.diceRoller.roll() };
        }

        return die;
      });

      this.rollsUsed += 1;
      this.message =
        this.rollsUsed < this.maxRollsPerTurn
          ? "Puedes conservar dados o volver a lanzar."
          : "Selecciona una categoria para registrar el puntaje.";

      return true;
    }

    toggleDieKeep(dieId) {
      if (this.rollsUsed === 0 || this.rollsUsed >= this.maxRollsPerTurn || this.isGameOver) {
        return;
      }

      this.dice = this.dice.map((die) => (die.id === dieId ? { ...die, kept: !die.kept } : die));
    }

    canScoreCategory(categoryKey) {
      return !this.currentPlayer.hasUsedCategory(categoryKey) && this.rollsUsed > 0 && !this.isGameOver;
    }

    getPotentialScore(categoryKey) {
      const category = this.categories.find((entry) => entry.key === categoryKey);
      if (!category || this.dice.some((die) => die.value === null)) {
        return 0;
      }

      return this.scoreCalculator.calculateScore(
        category,
        this.dice.map((die) => die.value)
      );
    }

    selectCategory(categoryKey) {
      if (!this.canScoreCategory(categoryKey)) {
        return false;
      }

      const score = this.getPotentialScore(categoryKey);
      this.currentPlayer.registerScore(categoryKey, score);
      this.advanceTurn();
      return true;
    }

    advanceTurn() {
      if (this.players.every((player) => player.hasCompletedCard())) {
        this.isGameOver = true;
        this.message = "La partida ha terminado.";
        return;
      }

      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.rollsUsed = 0;
      this.dice = this.createInitialDice();
      this.message = "Turno cambiado. Lanza los dados para comenzar.";
    }

    getWinner() {
      const [playerOne, playerTwo] = this.players;
      const scoreOne = playerOne.getTotalScore();
      const scoreTwo = playerTwo.getTotalScore();

      if (scoreOne === scoreTwo) {
        return { type: "draw", text: `Empate con ${scoreOne} puntos.` };
      }

      const winner = scoreOne > scoreTwo ? playerOne : playerTwo;
      return { type: "winner", text: `${winner.name} gana con ${winner.getTotalScore()} puntos.` };
    }
  }

  app.domain.models.YahtzeeGame = YahtzeeGame;
})(window.YahtzeeApp);
