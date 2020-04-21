import { GameStateService } from '../services/game-state.service';
import { ScreenManager } from '../game/screen-manager';

const componentStyles = `
    <style>
        .load-game {
            height: 100%;
            width: 100%;
            background-color: rgba(201, 195, 174, 0.6);
            display: flex;
            align-items: center;
            flex-direction: column;
            font-family: Arial;
        }

        .load-game-container {
            display: flex;
            flex-direction: column;
        }

        .load-game-slot {
            display: flex;
            flex-direction: column;
            padding: 8px;
            width: 300px;
            background-color: #46443D;
            color: #EDE8CF; 
            margin-top: 15px;
            transition: 0.2s linear;
            cursor: pointer;
        }

        .load-game-slot:hover {
            color: #46443D;
            background-color: #EDE8CF;
            transform: scale(1.01);
        }

        .slot {
            font-size: 22px;
        }

        .progress {
            font-size: 14px;
            margin-top: 8px;
        }

        .select {
            color: #46443D;
            font-size: 28px;
            margin-top: 160px;
        }

        .load-game-header {
            margin-top: 30px;
            width: 700px;
        }

        .back {
            cursor: pointer;
            font-size: 18px;
            color: #46443D;
        }
    </style>
`;

export class LoadGame extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      backCallback: () => {},
      saveSlots: {},
      newGame: false,
    };

    this.renderHTML();
    this.bindEvents();
  }

  set saveSlots(saveSlots) {
    this.prop.saveSlots = saveSlots;

    const slotNames = Object.keys(saveSlots);
    slotNames.forEach((slotName) => {
      const floors = saveSlots[slotName].floors;
      const saveSlot = this.root.querySelector(`#${slotName}`);

      if (floors) {
        const progress = Math.round(floors.length / 25) * 100;

        saveSlot.querySelector(
          '.progress'
        ).innerHTML = `Progress: ${progress} %`;
      } else {
        saveSlot.querySelector('.progress').innerHTML = 'No game slot';
      }
    });
  }

  get saveSlots() {
    return this.prop.saveSlots;
  }

  get backCallback() {
    return this.prop.backCallback;
  }

  set backCallback(backCallback) {
    this.prop.backCallback = backCallback;
  }

  get newGame() {
    return this.prop.newGame;
  }

  set newGame(newGame) {
    this.prop.newGame = newGame;
  }

  bindEvents() {
    const screenManager = new ScreenManager();

    this.root
      .querySelector('#back')
      .addEventListener('click', () => this.prop.backCallback());

    const gameSlotsEl = this.root.querySelectorAll('.load-game-slot');
    for (let i = 0; i < gameSlotsEl.length; i++) {
      gameSlotsEl[i].addEventListener('click', () => {
        const gameState = new GameStateService();
        const slotName = gameSlotsEl[i].getAttribute('id');

        if (gameState.isSlotExisting(slotName)) {
          if (!this.prop.newGame) {
            gameState.initSlot(slotName);
            screenManager.hideAllScreens();
            screenManager.showScreen('levelSelect');
          } else {
            const areYouSureComponent = document.querySelector('are-you-sure');
            areYouSureComponent.style.display = 'block';

            areYouSureComponent.message = `${slotName} is already taken, this will data there!`;
            areYouSureComponent.cancelCallback = () => {
              areYouSureComponent.style.display = 'none';
            };
            areYouSureComponent.confirmCallback = () => {
              gameState.initSlot(slotName);
              screenManager.hideAllScreens();
              screenManager.showScreen('levelSelect');
            };
          }
        } else {
          if (this.prop.newGame) {
            gameState.initSlot(slotName);
            screenManager.hideAllScreens();
            screenManager.showScreen('levelSelect');
          }
        }
      });
    }
  }

  renderHTML() {
    this.root.innerHTML = `
            ${componentStyles}
            <div class="load-game">
            <div class="load-game-header">
                <span class="back" id="back">
                    Back   
                </span>
            </div>    
            <span class="select">
                    Select game slot:
                </span>  
                <div class="load-game-container">
                   <div class="load-game-slot" id="saveSlot1">
                    <span class="slot">
                       ■ Load Slot 1 
                    </span>
                    <span class="progress">
                        No game slot
                    </span>
                   </div> 
                   <div class="load-game-slot" id="saveSlot2">
                    <span class="slot">
                       ■ Load Slot 2 
                    </span>
                    <span class="progress">
                        No game slot
                    </span>
                   </div> 
                   <div class="load-game-slot" id="saveSlot3">
                    <span class="slot">
                       ■ Load Slot 3 
                    </span>
                    <span class="progress">
                        No game slot
                    </span>
                   </div> 
                </div>
            </div>
            `;
  }

  static get observedAttributes() {
    return ['backCallback', 'newGame', 'saveSlots'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'backCallback':
        this.backCallback = newValue;
        break;
      case 'newGame':
        this.newGame = newValue;
        break;
      case 'saveSlots':
        this.saveSlots = newValue;
        break;
    }
  }
}

customElements.define('load-game', LoadGame);
