(function (app) {
  class Player {
    constructor(name, categories) {
      this.name = name;
      this.scoreCard = this.createEmptyScoreCard(categories);
    }

    createEmptyScoreCard(categories) {
      return categories.reduce((scoreCard, category) => {
        scoreCard[category.key] = null;
        return scoreCard;
      }, {});
    }

    resetScoreCard() {
      Object.keys(this.scoreCard).forEach((categoryKey) => {
        this.scoreCard[categoryKey] = null;
      });
    }

    hasUsedCategory(categoryKey) {
      return this.scoreCard[categoryKey] !== null;
    }

    registerScore(categoryKey, score) {
      this.scoreCard[categoryKey] = score;
    }

    getTotalScore() {
      return Object.values(this.scoreCard).reduce((total, score) => total + (score ?? 0), 0);
    }

    hasCompletedCard() {
      return Object.values(this.scoreCard).every((score) => score !== null);
    }
  }

  app.domain.entities.Player = Player;
})(window.YahtzeeApp);
