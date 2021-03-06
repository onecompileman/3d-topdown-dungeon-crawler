const componentStyles = `
    <style> 
        .level-select {
            height: 100%;
            width: 100%;
            background-color: rgba(201, 195, 174, 0.9);
            display: flex;
            align-items: center;
            flex-direction: column;
            font-family: Arial;
        }

        .level-select-top {
            margin-top: 50px;
            width: 700px;
        }

        .back {
            cursor: pointer;
            font-size: 18px;
            color: #46443D;
        }

        .select-level-text {
            color: #46443D;
            font-size: 28px;
            margin-top: 40px;
        }

        .level-select-container {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .progress-container {
            width: 250px;
            padding: 7px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #EDE8CF;
            color: #46443D;
            margin-bottom: 20px;
        }

        .progress-placeholder {
            display: flex;
        }

        .progress-text {
            font-size: 14px;
        }

        .progress-wrapper {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
        }

        .progress {
            height: 16px;
            width: 170px;
            background-color: rgb(201, 195, 174);
        }

        .progress-thumb {
            height: 100%;
            width: 20%;
            background-color: #46443D;
        }

        .progress-percentage {
            margin-top: 5px;
            font-size: 11px;
        }

        .level-select-wrapper {
            padding: 7px;
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: center;
            max-height: 300px;
            overflow-y: scroll;
            overflow-x: hidden;
        }

        .level-select-wrapper::-webkit-scrollbar {
            width: 4px;
        }

        .level-select-wrapper::-webkit-scrollbar-thumb {
            background-color: #46443D;
        }

        .level-item {
            height: 36px;
            cursor: pointer;
            padding-top: 6px;
            padding-bottom: 6px;
            font-size: 14px;
            color: #EDE8CF;
            background-color: #46443D;;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.2s linear;
            margin-top: 5px;
        }

        .level-item:hover {
            color: #46443D;
            background-color: #EDE8CF;
            transform: scale(1.01);
        }

        .level-item.active {
            border: 1px solid #46443D;
            color: #46443D;
            background-color: #EDE8CF;
        }

        .level-panel {
            background-color: #EDE8CF;
            width: 100%;
            max-width: 400px;
            margin-left: 50px;
            height: fit-content;
        }

        .level-panel-header {
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

        .level-panel-body {
            padding: 20px;
            color: #46443D;
            line-height: 18px;
            font-size: 18px;
            display: flex;
        }

        .rating {
            height: 120px;
            width: 100px;
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

        .level-panel-footer {
            padding: 10px;
            border-top: 1px solid #46443D;
            display: flex;
            justify-content: flex-end;
        }

        .action-item {
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

        .not-allowed {
            cursor: not-allowed !important;
            background-color: #68665F;
        }
  

    </style>
`;

export class LevelSelect extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      levelSelectCallback: (level, floor, slotName) => {},
      backCallback: () => {},
      floors: [],
      activeSlotName: '',
      activeLevelIndex: '1-1',
    };
    this.renderHTML();
    this.bindEvents();
  }

  get activeSlotName() {
    return this.prop.activeSlotName;
  }

  set activeSlotName(activeSlotName) {
    this.prop.activeSlotName = activeSlotName;
  }

  get floors() {
    return this.prop.floors;
  }

  set floors(floors) {
    this.prop.floors = floors;

    const percentage = Math.round(floors.length / 25 * 100);

    this.root.querySelector('#progress').style.width = percentage + '%';
    this.root.querySelector('#progressText').innerHTML = percentage + '%';

    const levelItemsEl = this.root.querySelectorAll('.level-item');

    for (let i = 0; i < levelItemsEl.length; i++) {
      levelItemsEl[i].classList.remove('not-allowed');
      const id = levelItemsEl[i].getAttribute('id');
      const [level, floor] = id.split('-');

      if (i > floors.length && i !== 0) {
        levelItemsEl[i].classList.add('not-allowed');
      }

      if (i === floors.length || (floor.length === 25 && i === 24)) {
        levelItemsEl[i].click();
      }
    }
  }

  get levelSelectCallback() {
    return this.prop.levelSelectCallback;
  }

  set levelSelectCallback(levelSelectCallback) {
    this.prop.levelSelectCallback = levelSelectCallback;
  }

  get backCallback() {
    return this.prop.backCallback;
  }

  set backCallback(backCallback) {
    this.prop.backCallback = backCallback;
  }

  bindEvents() {
    const levelItemsEl = this.root.querySelectorAll('.level-item');

    for (let i = 0; i < levelItemsEl.length; i++) {
      levelItemsEl[i].addEventListener('click', () => {
        if (!levelItemsEl[i].classList.contains('not-allowed')) {
          for (let j = 0; j < levelItemsEl.length; j++) {
            levelItemsEl[j].classList.remove('active');
          }

          levelItemsEl[i].classList.add('active');

          const id = levelItemsEl[i].getAttribute('id');
          const [level, floor] = id.split('-');

          const ff = this.prop.floors.find(
            (f) => f.floor == +floor + 1 && f.level == +level + 1
          );

          if (ff) {
            this.root.querySelector('#rating').innerHTML = ff.rating;
            this.root.querySelector('#damageTaken').innerHTML = ff.damageTaken;
            this.root.querySelector('#bulletsFired').innerHTML =
              ff.bulletsFired;
            this.root.querySelector('#bulletsHit').innerHTML = ff.bulletsHit;
          } else {
            this.root.querySelector('#rating').innerHTML = 'N/A';
            this.root.querySelector('#damageTaken').innerHTML = 'N/A';
            this.root.querySelector('#bulletsFired').innerHTML = 'N/A';
            this.root.querySelector('#bulletsHit').innerHTML = 'N/A';
          }

          this.prop.activeLevelIndex = `${+level + 1}-${+floor + 1}`;
        }
      });
    }

    this.root
      .querySelector('#back')
      .addEventListener('click', () => this.prop.backCallback());
    this.root.querySelector('#play').addEventListener('click', () => {
      const [level, floor] = this.prop.activeLevelIndex.split('-');
      this.prop.levelSelectCallback(+level, +floor, this.prop.activeSlotName);
    });
  }

  renderHTML() {
    const levelItemsHTML = Array(5)
      .fill(1)
      .reduce((acc, n, level) => {
        Array(5)
          .fill(1)
          .forEach((n1, floor) => {
            acc += `
                <div class="level-item" id="${level}-${floor}">
                    ■ Level ${level + 1}  - Floor: ${floor + 1}
                </div>
            `;
          });
        return acc;
      }, '');

    this.root.innerHTML = `
         ${componentStyles}
            <div class="level-select">
                <div class="level-select-top">
                    <span class="back" id="back">
                        Back
                    </span>
                </div>
                <span class="select-level-text">
                    Level Select
                </span>
                <div class="level-select-container">
                    <div class="progress-container">
                        <div class="progress-placeholder">
                        <span class="progress-text">
                            Progress:
                        </span>

                        <div class="progress-wrapper">
                            <div class="progress">
                                <div class="progress-thumb" id="progress">
                                </div>
                            </div>
                            <span class="progress-percentage" id="progressText">
                                10%
                            </span>
                        </div>
                        </div>
                        <div class="level-select-wrapper">
                            ${levelItemsHTML}
                        </div>
                    </div>
                    <div class="level-panel">
                        <div class="level-panel-header">
                            ■ Level Info
                        </div>
                        <div class="level-panel-body">
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
                        <div class="level-panel-footer">
                             <div class="action-container">
                            <div id="play" class="action-item">
                                Play
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  static get observedAttributes() {
    return ['levelSelectCallback', 'backCallback', 'floors', 'activeSlotName'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'levelSelectCallback':
        this.levelSelectCallback = newValue;
        break;
      case 'backCallback':
        this.backCallback = newValue;
        break;
      case 'floors':
        this.floors = newValue;
        break;
      case 'activeSlotName':
        this.activeSlotName = newValue;
        break;
    }
  }
}

customElements.define('level-select', LevelSelect);
