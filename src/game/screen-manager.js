export class ScreenManager {
  constructor() {
    this.screens = {
      inGameUITop: document.querySelector('in-game-ui-top'),
      inGameUIBottom: document.querySelector('in-game-ui-bottom'),
    };
  }

  showScreen(name) {
    this.screens[name].style.display = 'block';
  }

  hideAllScreens() {
    Object.keys(this.screens).forEach((screen) => {
      this.screens[screen].style.display = 'none';
    });
  }
}
