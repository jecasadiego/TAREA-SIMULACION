(function (app) {
  class ScoreCalculator {
    calculateScore(category, diceValues) {
      const counts = this.buildCounts(diceValues);
      const total = this.sum(diceValues);

      switch (category.type) {
        case "upper":
          return diceValues
            .filter((value) => value === category.targetValue)
            .reduce((accumulator, value) => accumulator + value, 0);
        case "three-of-a-kind":
          return this.hasCount(counts, 3) ? total : 0;
        case "four-of-a-kind":
          return this.hasCount(counts, 4) ? total : 0;
        case "full-house":
          return this.isFullHouse(counts) ? 25 : 0;
        case "small-straight":
          return this.isSmallStraight(diceValues) ? 30 : 0;
        case "large-straight":
          return this.isLargeStraight(diceValues) ? 40 : 0;
        case "yahtzee":
          return this.hasCount(counts, 5) ? 50 : 0;
        case "chance":
          return total;
        default:
          return 0;
      }
    }

    buildCounts(diceValues) {
      return diceValues.reduce((map, value) => {
        map.set(value, (map.get(value) ?? 0) + 1);
        return map;
      }, new Map());
    }

    hasCount(counts, minimum) {
      return [...counts.values()].some((count) => count >= minimum);
    }

    isFullHouse(counts) {
      const occurrences = [...counts.values()].sort((left, right) => left - right);
      return occurrences.length === 2 && occurrences[0] === 2 && occurrences[1] === 3;
    }

    isSmallStraight(diceValues) {
      const uniqueValues = [...new Set(diceValues)].sort((left, right) => left - right);
      const patterns = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6]
      ];

      return patterns.some((pattern) => pattern.every((value) => uniqueValues.includes(value)));
    }

    isLargeStraight(diceValues) {
      const uniqueValues = [...new Set(diceValues)].sort((left, right) => left - right);
      const normalized = uniqueValues.join(",");
      return normalized === "1,2,3,4,5" || normalized === "2,3,4,5,6";
    }

    sum(diceValues) {
      return diceValues.reduce((accumulator, value) => accumulator + value, 0);
    }
  }

  app.domain.services.ScoreCalculator = ScoreCalculator;
})(window.YahtzeeApp);
