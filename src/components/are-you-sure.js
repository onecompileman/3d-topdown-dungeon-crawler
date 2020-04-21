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

export class AreYouSure extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      cancelCallback: () => {},
      confirmCallback: () => {},
      message: '',
    };
    this.renderHTML();
    this.bindEvents();
  }

  get message() {
    return this.prop.message;
  }

  set message(message) {
    this.root.querySelector('#message').innerHTML = message;
    this.prop.message = message;
  }

  get cancelCallback() {
    return this.prop.cancelCallback;
  }

  set cancelCallback(cancelCallback) {
    this.prop.cancelCallback = cancelCallback;
  }

  get confirmCallback() {
    return this.prop.confirmCallback;
  }

  set resumeCallback(confirmCallback) {
    this.prop.confirmCallback = confirmCallback;
  }

  bindEvents() {
    this.root
      .querySelector('#quit')
      .addEventListener('click', () => this.prop.cancelCallback());
    this.root
      .querySelector('#resume')
      .addEventListener('click', () => this.prop.confirmCallback());
  }

  renderHTML() {
    this.root.innerHTML = `
            ${componentStyles}
            <div class="pause-screen">
                <div class="pause-panel">
                    <div class="pause-header">
                        ■ Are you sure?
                    </div>
                    <div class="pause-body">
                        <p id="message">
                        </p>
                    </div>
                    <div class="pause-footer">
                        <div class="action-container">
                            <div id="quit" class="pause-action-item">
                                Cancel
                            </div>
                            <div id="resume" class="pause-action-item">
                                Confirm
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  static get observedAttributes() {
    return ['cancelCallback', 'confirmCallback', 'message'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'cancelCallback':
        this.cancelCallback = newValue;
        break;
      case 'confirmCallback':
        this.confirmCallback = newValue;
        break;
      case 'message':
        this.message = newValue;
        break;
    }
  }
}

customElements.define('are-you-sure', AreYouSure);
