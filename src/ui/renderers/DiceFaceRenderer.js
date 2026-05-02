(function (app) {
  class DiceFaceRenderer {
    constructor() {
      this.activePipsByValue = {
        null: [],
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
      };
    }

    render(value) {
      const activePips = this.activePipsByValue[value] ?? [];
      const cells = Array.from({ length: 9 }, (_, index) => {
        const visibleClass = activePips.includes(index) ? "pip visible" : "pip";
        return `<span class="${visibleClass}"></span>`;
      }).join("");

      return `<div class="die-face" aria-label="Dado con valor ${value ?? "sin lanzar"}">${cells}</div>`;
    }
  }

  app.ui.renderers.DiceFaceRenderer = DiceFaceRenderer;
})(window.YahtzeeApp);
