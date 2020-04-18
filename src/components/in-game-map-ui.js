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
            justify-content: center;
        }

        .room-connector-container {
            display: flex;
            align-items: center;
        }

        .connector-left {
            height: 10px;
            background-color: #fff;
            width: 12.5px;
        }
        
        .connector-top {
            height: 12.5px;
            background-color: #fff;
            width: 13px;
        }

        .room {
            width: 60px;
            height: 60px;
            border: 2px solid #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .player {
            height: 12px;
            width: 12px;
            background-color: black;
        }
    </style>
`;

export class InGameMapUI extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    this.renderHTML();
  }

  updateMap(roomGrid) {
    roomGrid.forEach((r, rI) => {
      r.forEach((c, cI) => {
        const roomEl = this.root.querySelector(`#c${rI}${cI}`);

        if (c instanceof Array) {
          roomEl.style.opacity = 1;

          const connectorTops = roomEl.querySelectorAll('.connector-top');
          const connectorLefts = roomEl.querySelectorAll('.connector-left');

          for (let i = 0; i < connectorTops.length; ++i) {
            connectorTops[i].style.opacity = 0;
          }

          for (let i = 0; i < connectorLefts.length; ++i) {
            connectorLefts[i].style.opacity = 0;
          }

          c.forEach((p) => {
            roomEl.querySelector(`#p${p}`).style.opacity = 1;
          });
        } else {
          roomEl.style.opacity = 0;
        }
      });
    });
  }

  updatePlayerLocation(r, c) {
    const roomsEl = this.root.querySelectorAll('.room-container');

    for (let i = 0; i < roomsEl.length; i++) {
      const room = roomsEl[i].querySelector('.room');
      room.innerHTML = '';
    }

    const activeRoomEl = this.root.querySelector(`#c${r}${c}`);
    activeRoomEl.querySelector('.room').innerHTML =
      '<div class="player"></div>';
  }

  renderHTML() {
    this.root.innerHTML = `
        ${componentStyles}
        <div class="in-game-map-ui">
            <div class="row">
                <div class="room-container" id="c00">
                    <div class="room-connector-container">
                       
                        <div class="room">
                            <div class="player"></div>
                        </div>
                        <div id="p1" class="connector-left"></div>
                    </div>
                     <div id="p2" class="connector-top">
                    </div>
                </div>
                <div class="room-container" id="c01">
                   <div class="room-connector-container">
                        <div id="p3" class="connector-left"></div>
                       
                        <div class="room">
                        </div>
                        <div id="p1" class="connector-left"></div>
                    </div>
                     <div id="p2" class="connector-top">
                    </div>
                    
                </div>
                    <div class="room-container" id="c02">
                    <div class="room-connector-container">
                        <div id="p3" class="connector-left"></div>
                       
                        <div class="room">
                        </div>
                      
                    </div>
                     <div id="p2" class="connector-top">
                    </div>
                </div>  
            </div>
            <div class="row">
                <div class="room-container" id="c10">
                    <div id="p0" class="connector-top">
                    </div>
                     <div class="room-connector-container">
                       
                       
                        <div class="room">
                        </div>
                         <div id="p1" class="connector-left"></div>
                    </div>
                    <div id="p2" class="connector-top">
                    </div>
                </div>
                <div class="room-container" id="c11">
                    <div id="p0" class="connector-top">
                    </div>
                    <div class="room-connector-container">
                        <div id="p3" class="connector-left"></div>
                        <div class="room">
                        </div>
                        <div id="p1" class="connector-left"></div>
                    </div>
                    <div id="p2" class="connector-top">
                    </div>
                </div>
                <div class="room-container" id="c12">
                     <div id="p0" class="connector-top">
                    </div>
                    <div class="room-connector-container">
                        <div id="p3" class="connector-left"></div>
                        <div class="room">
                        </div>
                       
                    </div>
                    <div id="p2" class="connector-top">
                    </div>
                </div>
                </div>  
        </div>
        <div class="row">
                <div class="room-container" id="c20">
                    <div id="p0" class="connector-top">
                    </div>
                    <div class="room-connector-container">
                      
                        <div class="room">
                        </div>
                        <div id="p1" class="connector-left"></div>
                    </div>
                </div>
                <div class="room-container" id="c21">
                  <div id="p0" class="connector-top">
                    </div>
                    <div class="room-connector-container">
                        <div id="p3" class="connector-left"></div>
                        <div class="room">
                        </div>
                        <div id="p1" class="connector-left"></div>
                    </div>
                   
                  
                </div>
                    <div class="room-container" id="c22">
                   <div id="p0" class="connector-top">
                    </div>
                    <div class="room-connector-container">
                        <div id="p3" class="connector-left"></div>
                        <div class="room">
                        </div>
                       
                    </div>
                </div>  
            </div>
        </div>
        `;
  }
}

customElements.define('in-game-map-ui', InGameMapUI);
