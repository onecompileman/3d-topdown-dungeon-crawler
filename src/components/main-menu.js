const componentStyles = `
    <style>
        .main-menu {
            height: 100%;
            width: 100%;
            background-color: rgba(201, 195, 174, 0.6);
            display: flex;
            align-items: center;
            flex-direction: column;
            font-family: Arial;
        }

        .title {
            margin-top: 150px;
            font-size: 50px;
            color: #333333;
            font-weight: 400;
        }
        
        .menu-container {
            margin-top: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .menu-item {
            padding-left: 10px;
            height: 42px;
            background-color: #46443D;
            display: flex;
            align-items: center;
            width: 250px;
            color: #BAB59F;
            margin: 10px; 
            transition: 0.2s linear;
            cursor: pointer;
        }

        .menu-item:hover {
            color: #46443D;
            background-color: #EDE8CF;
            transform: scale(1.01);
        }
    </style>
`;

export class MainMenu extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      newGameCallback: () => {},
      loadGameCallback: () => {},
      aboutCallback: () => {},
    };

    this.renderHTML();
    this.bindEvents();
  }

  get newGameCallback() {
    return this.prop.newGameCallback;
  }

  set newGameCallback(newGameCallback) {
    this.prop.newGameCallback = newGameCallback;
  }

  get loadGameCallback() {
    return this.prop.loadGameCallback;
  }

  set loadGameCallback(loadGameCallback) {
    this.prop.loadGameCallback = loadGameCallback;
  }

  get aboutCallback() {
    return this.prop.aboutCallback;
  }

  set aboutCallback(aboutCallback) {
    this.prop.aboutCallback = aboutCallback;
  }

  bindEvents() {
    this.root
      .querySelector('#newGame')
      .addEventListener('click', () => this.prop.newGameCallback());
    this.root
      .querySelector('#loadGame')
      .addEventListener('click', () => this.prop.loadGameCallback());
    this.root
      .querySelector('#about')
      .addEventListener('click', () => this.prop.aboutCallback());
  }

  renderHTML() {
    this.root.innerHTML = `
            ${componentStyles}
            <div class="main-menu">
                <div class="title">
                    [B]ug Hunter
                </div>
                <div class="menu-container">
                    <div id="newGame" class="menu-item">
                       ■ New Game
                    </div>

                    <div id="loadGame" class="menu-item">
                       ■ Load Game
                    </div>

                    <div id="about" class="menu-item">
                       ■ About
                    </div>
                </div>
            </div>
        `;
  }

  static get observedAttributes() {
    return ['newGameCallback', 'loadGameCallback', 'aboutCallback'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'newGameCallback':
        this.newGameCallback = newValue;
        break;
      case 'loadGameCallback':
        this.loadGameCallback = newValue;
        break;
      case 'aboutCallback':
        this.aboutCallback = newValue;
        break;
    }
  }
}

customElements.define('main-menu', MainMenu);
