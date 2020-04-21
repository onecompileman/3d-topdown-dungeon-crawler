const componentStyles = `
    <style>
        .pause-screen {
            height: 100%;
            width: 100%;
            background-color: rgba(201, 195, 174, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: Arial;
        }

         .pause-panel {
            background-color: #EDE8CF;
            width: 100%;
            max-width: 600px;
        }

        .pause-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 15px;
            padding-right: 15px;
            font-size: 20px;
            height: 36px;
            background-color: #46443D;
            color: #EDE8CF;
        }

        .pause-body {
            padding: 20px;
            color: #46443D;
            line-height: 18px;
            font-size: 18px;
            display: flex;
            flex-direction: column;
        }

        .pause-footer {
            padding: 10px;
            border-top: 1px solid #46443D;
            display: flex;
            justify-content: flex-end;
        }

        .pause-action-item {
            height: 32px;
            width: 120px;
            font-size: 14px;
            color: #EDE8CF;
            background-color: #46443D;
            display: flex;
            align-items: center; 
            justify-content: center;
            cursor: pointer;
            margin-left: 15px;
        }
        
        .action-container {
            display: flex;
        }

        .rating {
            height: 100px;
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #46443D;
            font-size: 42px;
            margin-right: 30px;
        }

        .stats {
            font-size: 16px;
            display: flex;
            flex-direction: column;
        }

        .stats span {
            margin-top: 6px;
        }

        .stats-container {
            display: flex;
        }

        .weapon-unlocked {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
        }

        .weapon-unlocked-text {
            font-size: 18px;
        }

        .weapon-container {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
        }

    </style>
`;

export class FloorCleared extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      quitCallback: () => {},
      nextCallback: () => {},
    };
    this.renderHTML();
    this.bindEvents();
  }

  get quitCallback() {
    return this.prop.quitCallback;
  }

  set quitCallback(quitCallback) {
    this.prop.quitCallback = quitCallback;
  }

  get nextCallback() {
    return this.prop.nextCallback;
  }

  set nextCallback(nextCallback) {
    this.prop.nextCallback = nextCallback;
  }

  bindEvents() {
    this.root
      .querySelector('#quit')
      .addEventListener('click', () => this.prop.quitCallback());
    this.root
      .querySelector('#next')
      .addEventListener('click', () => this.prop.nextCallback());
  }

  renderHTML() {
    this.root.innerHTML = `
            ${componentStyles}
            <div class="pause-screen">
                <div class="pause-panel">
                    <div class="pause-header">
                        ■ Level Cleared
                    </div>
                    <div class="pause-body">
                        <span class="weapon-unlocked-text">
                            Rating
                        </span>
                        <div class="stats-container">
                             <div class="rating" id="rating">
                                A
                            </div>
                            <div class="stats">
                                <span>
                                    Damage taken: <b id="damageTaken">100</b>
                                </span>
                                <span>
                                    Bullets Fired: <b id="bulletsFired">100</b>
                                </span>
                                <span>
                                    Bullets hit: <b id="bulletsHit">100</b>
                                </span>
                            </div>
                        </div>
                        <div id="weaponContainer" class="weapon-unlocked">
                            <span class="weapon-unlocked-text">
                                Weapon Unlocked
                            </span>
                            <div class="weapon-container">
                                <img src="assets/icons/rifle.png" height="70" width="70" alt="Weapon" id="weapon">
                                <span class="weapon-text">
                                    Rifle
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pause-footer">
                        <div class="action-container">
                            <div id="quit" class="pause-action-item">
                                Quit
                            </div>
                            <div id="next" class="pause-action-item">
                                Next Level
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  static get observedAttributes() {
    return ['quitCallback', 'nextCallback'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'quitCallback':
        this.quitCallback = newValue;
        break;
      case 'nextCallback':
        this.nextCallback = newValue;
        break;
    }
  }
}

customElements.define('floor-cleared', FloorCleared);
