const componentStyles = `
    <style>
        .in-game-ui-top {
            height: 60px;
            width: calc(100% - 40px);
            display: flex;
            margin-left: 20px;
            margin-right: 20px;
            align-items: center;
            justify-content: space-between;
            font-family: Arial;
        }

        .life-container {
            display: flex;
            align-items: center;
        }

        .life-text {
            margin-right: 10px;
            color: white;
        }

        .level-text {
            color: white;
            margin-left: -20px;
            font-size: 24px;
        }

        .menu-btn {
            background-color: white;
            height: 32px;
            width: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .life-wrapper {
            width: 300px;
            height: 20px;
        }

        .life-thumb {
            width: 100%;
            background-color: #eee;
            height: 100%;
        }
    </style>
`;
export class InGameUITop extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    this.prop = {
      life: 100,
      level: '1-1',
      onMenuCallback: () => {},
    };

    this.renderHTML();
    this.bindEvents();
  }

  set life(life) {
    this.prop.life = life;
    this.root.querySelector('#lifeThumb').style.width = life + '%';
  }

  set level(level) {
    this.prop.level = level;
    this.root.querySelector('.level-text').innerHTML = level;
  }

  set onMenuCallback(onMenuCallback) {
    this.prop.onMenuCallback = onMenuCallback;
  }

  get life() {
    return this.prop.life;
  }

  get level() {
    return this.prop.level;
  }

  get onMenuCallback() {
    return this.prop.onMenuCallback;
  }

  bindEvents() {
    this.root
      .querySelector('.menu-btn')
      .addEventListener('click', () => this.prop.onMenuCallback());
  }

  renderHTML() {
    this.root.innerHTML = `
            ${componentStyles}
            <div class="in-game-ui-top">
                <div class="life-container">
                    <span class="life-text">Life :</span> 
                    <div class="life-wrapper">
                        <div class="life-thumb" id="lifeThumb"></div>
                    </div>
                </div>

                <span class="level-text">1-1</span>

                <div class="menu-btn">
                    <img src="assets/icons/menu.png" height="24" alt="Menu">
                </div>
            </div>
        `;
  }

  static get observedAttributes() {
    return ['life', 'level', 'onMenuCallback'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'life':
        this.life = newValue;
        break;
      case 'level':
        this.level = newValue;
        break;
      case 'onMenuCallback':
        this.onMenuCallback = newValue;
        break;
    }
  }
}

customElements.define('in-game-ui-top', InGameUITop);
