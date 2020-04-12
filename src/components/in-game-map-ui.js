const componentStyles = `
    <style>
        .in-game-map-ui {
            display: flex;
            flex-direction: column;
        }

        .row {
            display: flex;
        }

        .room-container {
            display: flex; 
            flex-direction: column;
            align-items: center;
        }

        .room-connector-container {
            display: flex;
            align-items: center;
        }

        .connector-left {
            height: 10px;
            background-color: #fff;
            width: 25px;
        }
        
        .connector-top {
            height: 25px;
            background-color: #fff;
            width: 13px;
        }

        .room {
            width: 60px;
            height: 60px;
            border: 2px solid #fff;
        }
    </style>
`;

export class InGameMapUI extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    this.renderHTML();
  }

  renderHTML() {
    this.root.innerHTML = `
        ${componentStyles}
        <div class="in-game-map-ui">
            <div class="row">
                <div class="room-container" id="0-0">
                    <div class="room">
                    </div>
                </div>
                <div class="room-container" id="0-1">
                    <div class="room-connector-container">
                        <div class="connector-left"></div>
                        <div class="room">
                        </div>
                        <div class="connector-left"></div>
                    </div>
                    
                </div>
                    <div class="room-container" id="0-2">
                    <div class="room">
                    </div>
                </div>  
            </div>
            <div class="row">
                <div class="room-container" id="1-0">
                    <div class="connector-top">
                    </div>
                    <div class="room">
                    </div>
                    <div class="connector-top">
                    </div>
                </div>
                <div class="room-container" id="1-1">
                    <div class="connector-top">
                    </div>
                    <div class="room-connector-container">
                        <div class="connector-left"></div>
                        <div class="room">
                        </div>
                        <div class="connector-left"></div>
                    </div>
                    <div class="connector-top">
                    </div>
                </div>
                <div class="room-container" id="1-2">
                    <div class="connector-top">
                    </div>
                    <div class="room">
                    </div>
                    <div class="connector-top">
                    </div>
                </div>
                </div>  
        </div>
        <div class="row">
                <div class="room-container" id="2-0">
                    <div class="room">
                    </div>
                </div>
                <div class="room-container" id="2-1">
                    <div class="room-connector-container">
                        <div class="connector-left"></div>
                        <div class="room">
                        </div>
                        <div class="connector-left"></div>
                    </div>
                  
                </div>
                    <div class="room-container" id="2-2">
                    <div class="room">
                    </div>
                </div>  
            </div>
        </div>
        `;
  }
}

customElements.define('in-game-map-ui', InGameMapUI);
