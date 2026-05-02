(function (app) {
  app.config.categories = [
    { key: "ones", label: "Unos", type: "upper", targetValue: 1 },
    { key: "twos", label: "Doses", type: "upper", targetValue: 2 },
    { key: "threes", label: "Treses", type: "upper", targetValue: 3 },
    { key: "fours", label: "Cuatros", type: "upper", targetValue: 4 },
    { key: "fives", label: "Cincos", type: "upper", targetValue: 5 },
    { key: "sixes", label: "Seises", type: "upper", targetValue: 6 },
    { key: "threeOfAKind", label: "Tres iguales", type: "three-of-a-kind" },
    { key: "fourOfAKind", label: "Cuatro iguales", type: "four-of-a-kind" },
    { key: "fullHouse", label: "Full House", type: "full-house" },
    { key: "smallStraight", label: "Escalera pequena", type: "small-straight" },
    { key: "largeStraight", label: "Escalera grande", type: "large-straight" },
    { key: "yahtzee", label: "Yahtzee", type: "yahtzee" },
    { key: "chance", label: "Chance", type: "chance" }
  ];
})(window.YahtzeeApp);
