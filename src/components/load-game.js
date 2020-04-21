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
    };
    this.renderHTML();
    this.bindEvents();
  }

  get backCallback() {
    return this.prop.backCallback;
  }

  set backCallback(backCallback) {
    this.prop.backCallback = backCallback;
  }

  bindEvents() {
    this.root
      .querySelector('#back')
      .addEventListener('click', () => this.prop.backCallback());
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
                   <div class="load-game-slot"
                    <span class="slot">
                       ■ Load Slot 1 
                    </span>
                    <span class="progress">
                        No game slot
                    </span>
                   </div> 
                   <div class="load-game-slot"
                    <span class="slot">
                       ■ Load Slot 2 
                    </span>
                    <span class="progress">
                        No game slot
                    </span>
                   </div> 
                   <div class="load-game-slot"
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
    return ['backCallback'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'backCallback':
        this.backCallback = newValue;
        break;
    }
  }
}

customElements.define('load-game', LoadGame);
