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
    </style>
`;

export class PauseScreen extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      quitCallback: () => {},
      resumeCallback: () => {},
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

  get resumeCallback() {
    return this.prop.resumeCallback;
  }

  set resumeCallback(resumeCallback) {
    this.prop.resumeCallback = resumeCallback;
  }

  bindEvents() {
    this.root
      .querySelector('#quit')
      .addEventListener('click', () => this.prop.quitCallback());
    this.root
      .querySelector('#resume')
      .addEventListener('click', () => this.prop.resumeCallback());
  }

  renderHTML() {
    this.root.innerHTML = `
            ${componentStyles}
            <div class="pause-screen">
                <div class="pause-panel">
                    <div class="pause-header">
                        ■ Pause screen
                    </div>
                    <div class="pause-body">
                        <p>
                            Game is Paused
                        </p>
                    </div>
                    <div class="pause-footer">
                        <div class="action-container">
                            <div id="quit" class="pause-action-item">
                                Quit
                            </div>
                            <div id="resume" class="pause-action-item">
                                Resume
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  static get observedAttributes() {
    return ['quitCallback', 'resumeCallback'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'quitCallback':
        this.quitCallback = newValue;
        break;
      case 'resumeCallback':
        this.resumeCallback = newValue;
        break;
    }
  }
}

customElements.define('pause-screen', PauseScreen);
