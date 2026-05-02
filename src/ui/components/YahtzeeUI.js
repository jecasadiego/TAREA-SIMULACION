(function (app) {
  class YahtzeeUI {
    constructor({ game, diceFaceRenderer }) {
      this.game = game;
      this.diceFaceRenderer = diceFaceRenderer;
      this.isRolling = false;
      this.elements = this.getElements();
    }

    getElements() {
      return {
        turnIndicator: document.getElementById("turn-indicator"),
        currentPlayerName: document.getElementById("current-player-name"),
        rollsLeft: document.getElementById("rolls-left"),
        gameMessage: document.getElementById("game-message"),
        rollButton: document.getElementById("roll-button"),
        restartButton: document.getElementById("restart-button"),
        diceContainer: document.getElementById("dice-container"),
        categoryList: document.getElementById("category-list"),
        scoreboard: document.getElementById("scoreboard"),
        finalResult: document.getElementById("final-result")
      };
    }

    initialize() {
      this.bindEvents();
      this.render();
    }

    bindEvents() {
      this.elements.rollButton.addEventListener("click", async () => {
        if (this.isRolling) {
          return;
        }

        this.isRolling = true;
        this.render();
        await this.waitForRollAnimation();
        this.game.rollDice();
        this.isRolling = false;
        this.render();
      });

      this.elements.restartButton.addEventListener("click", () => {
        this.game.resetGame();
        this.render();
      });
    }

    render() {
      this.renderStatus();
      this.renderDice();
      this.renderCategories();
      this.renderScoreboard();
      this.renderFinalResult();
    }

    renderStatus() {
      const turnText = this.game.isGameOver ? "Partida finalizada" : `Ronda de ${this.game.currentPlayer.name}`;

      this.elements.turnIndicator.textContent = turnText;
      this.elements.currentPlayerName.textContent = this.game.currentPlayer.name;
      this.elements.rollsLeft.textContent = `${this.game.rollsLeft} restantes`;
      this.elements.gameMessage.textContent = this.game.message;
      this.elements.rollButton.disabled = this.game.rollsLeft === 0 || this.game.isGameOver || this.isRolling;
    }

    renderDice() {
      this.elements.diceContainer.innerHTML = "";

      this.game.dice.forEach((die) => {
        const dieButton = document.createElement("button");
        dieButton.type = "button";
        dieButton.className = `die-button ${die.kept ? "selected" : ""} ${this.isRolling ? "rolling" : ""}`.trim();
        dieButton.disabled =
          this.game.rollsUsed === 0 || this.game.rollsUsed >= this.game.maxRollsPerTurn || this.game.isGameOver || this.isRolling;
        dieButton.innerHTML = `
          ${this.diceFaceRenderer.render(die.value)}
          <span class="die-label">${die.kept ? "Conservado" : "Disponible"}</span>
        `;

        dieButton.addEventListener("click", () => {
          this.game.toggleDieKeep(die.id);
          this.render();
        });

        this.elements.diceContainer.appendChild(dieButton);
      });
    }

    renderCategories() {
      this.elements.categoryList.innerHTML = "";

      this.game.categories.forEach((category) => {
        const categoryButton = document.createElement("button");
        const alreadyUsed = this.game.currentPlayer.hasUsedCategory(category.key);
        const scorePreview = this.game.getPotentialScore(category.key);

        categoryButton.type = "button";
        categoryButton.className = "category-button";
        categoryButton.disabled = alreadyUsed || !this.game.canScoreCategory(category.key);
        categoryButton.innerHTML = `
          <span>${category.label}</span>
          <strong>${alreadyUsed ? "Usada" : `${scorePreview} pts`}</strong>
        `;

        categoryButton.addEventListener("click", () => {
          this.game.selectCategory(category.key);
          this.render();
        });

        this.elements.categoryList.appendChild(categoryButton);
      });
    }

    renderScoreboard() {
      this.elements.scoreboard.innerHTML = "";

      this.game.categories.forEach((category) => {
        const row = document.createElement("div");
        row.className = "scoreboard-row";
        row.innerHTML = `
          <span class="scoreboard-category">${category.label}</span>
          <strong>${this.game.players
            .map((player) => `${player.name}: ${player.scoreCard[category.key] ?? "-"}`)
            .join(" | ")}</strong>
        `;

        this.elements.scoreboard.appendChild(row);
      });

      const totalRow = document.createElement("div");
      totalRow.className = "scoreboard-row total";
      totalRow.innerHTML = `
        <span>Total</span>
        <strong>${this.game.players.map((player) => `${player.name}: ${player.getTotalScore()}`).join(" | ")}</strong>
      `;

      this.elements.scoreboard.appendChild(totalRow);
    }

    renderFinalResult() {
      if (!this.game.isGameOver) {
        this.elements.finalResult.classList.add("hidden");
        this.elements.finalResult.innerHTML = "";
        return;
      }

      this.elements.finalResult.classList.remove("hidden");
      this.elements.finalResult.innerHTML = `
        <h3>Resultado final</h3>
        <p>${this.game.getWinner().text}</p>
      `;
    }

    waitForRollAnimation() {
      return new Promise((resolve) => {
        window.setTimeout(resolve, 550);
      });
    }
  }

  app.ui.components.YahtzeeUI = YahtzeeUI;
})(window.YahtzeeApp);
