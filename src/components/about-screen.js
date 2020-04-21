const componentStyles = `
    <style>
        .about-screen {
            height: 100%;
            width: 100%;
            background-color: rgba(201, 195, 174, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: Arial;
        }

        .close {
            cursor: pointer;
        }

        .about-panel {
            background-color: #EDE8CF;
            width: 100%;
            max-width: 600px;
        }

        .about-header {
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

        .about-body {
            padding: 20px;
            color: #46443D;
            line-height: 18px;
            font-size: 18px;
        }
    </style>
`;

export class AboutScreen extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      closeCallback: () => {},
    };
    this.renderHTML();
    this.bindEvents();
  }

  get closeCallback() {
    return this.prop.closeCallback;
  }

  set closeCallback(closeCallback) {
    this.prop.closeCallback = closeCallback;
  }

  bindEvents() {
    this.root
      .querySelector('#close')
      .addEventListener('click', () => this.prop.closeCallback());
  }

  renderHTML() {
    this.root.innerHTML = `
            ${componentStyles}
            <div class="about-screen">
                <div class="about-panel">
                    <div class="about-header">
                      <span>■ About the game</span> <span id="close" class="close">X</span>
                    </div>
                    <div class="about-body">
                        <p>
                            <h3>
                                [B]ug Hunter
                            </h3>
                            is a game heavily inspired by <b>[N]ier Automata: 9s hacking</b>, was a bullet hell game using basic geometry shapes, and ambience to make it look and feel like Neir Automata.
                        </p>  

                        <p>
                            This game is made from scratch by <a href="https://onecompileman.com/about">Stephen Vinuya</a>. <br>
                            Using three.js, webpack, HTML, CSS, Web components, ES6 and Javascript
                        </p>
                    </div>
                </div>
            </div>
        `;
  }

  static get observedAttributes() {
    return ['closeCallback'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'closeCallback':
        this.closeCallback = newValue;
        break;
    }
  }
}

customElements.define('about-screen', AboutScreen);
