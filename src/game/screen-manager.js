export class ScreenManager {
  constructor() {
    this.screens = {
      inGameUITop: document.querySelector('in-game-ui-top'),
      inGameUIBottom: document.querySelector('in-game-ui-bottom'),
      inGameMapUI: document.querySelector('in-game-map-ui'),
      mainMenu: document.querySelector('main-menu'),
      loadingScreen: document.querySelector('loading-screen'),
      aboutScreen: document.querySelector('about-screen'),
      loadGame: document.querySelector('load-game'),
      areYouSure: document.querySelector('are-you-sure'),
      pauseScreen: document.querySelector('pause-screen'),
      levelSelect: document.querySelector('level-select'),
      floorCleared: document.querySelector('floor-cleared'),
    };
  }

  showScreen(name) {
    this.screens[name].style.display = 'block';
  }

  hideScreen(name) {
    this.screens[name].style.display = 'none';
  }

  hideAllScreens() {
    Object.keys(this.screens).forEach((screen) => {
      this.screens[screen].style.display = 'none';
    });
  }
}
