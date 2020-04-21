const componentStyles = `
    <style>
        .loading-screen {
            height: 100%;
            width: 100%;
            background-color: rgba(201, 195, 174, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: Arial;
        }

        .loading-progress {
            max-width: 700px;
            width: 100%;
            margin-left: 20px;
            margin-right: 20px;
            background-color: #EDE8CF;
            height: 32px;
        }

        .loading-thumb {
            background-color: #46443D;
            height: 100%;
            width: 70%;
            transition: 0.1s linear;
        }

        .loading-text {
            color: #333;
            margin-top: 15px;
        }
    </style>
`;

export class LoadingScreen extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      progress: 10,
      text: '',
    };
    this.renderHTML();
  }

  get progress() {
    return this.prop.progress;
  }

  set progress(progress) {
    this.root.querySelector('#progress').style.width = progress + '%';
    this.prop.progress = progress;
  }

  get text() {
    return this.prop.text;
  }

  set text(text) {
    this.root.querySelector('#loadingText').innerHTML = text;
    this.prop.text = text;
  }

  renderHTML() {
    this.root.innerHTML = `
        ${componentStyles}
        <div class="loading-screen">
            <div class="loading-progress">
                <div class="loading-thumb" id="progress">
                </div>
            </div>
            <div class="loading-text" id="loadingText">
                Loading Assets 10/10
            </div>
        </div>
      `;
  }

  static get observedAttributes() {
    return ['progress', 'text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'progress':
        this.progress = newValue;
        break;
      case 'text':
        this.text = newValue;
        break;
    }
  }
}

customElements.define('loading-screen', LoadingScreen);
