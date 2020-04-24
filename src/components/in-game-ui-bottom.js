const componentStyles = `
    <style>
        .in-game-ui-bottom {
            height: 60px;
            width: calc(100% - 40px);
            display: flex;
            margin-left: 20px;
            margin-right: 20px;
            align-items: center;
            justify-content: space-between;
            font-family: Arial;
        }

        .weapons-container {
            display: flex;
            width: 100%;
            margin-bottom: 20px;
        }

        .weapon, .skill {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 20px;
        }
        
        .weapon div {
            text-align: center;
            font-size: 12px;
        }

        .skill div {
            text-align: center;
        }

        img {
            opacity: 0.9;
        }  

        .active img {
            border: 2px solid #fefefe;
        }

        
        .hotkey {
          font-size: 10px;
          padding: 4px;
          padding-left: 6px;
          padding-right: 6px;
          background-color: rgba(220, 220, 220, 1);
          color: black;
          position: absolute;
          top: -25px;
          margin-left: 12px;
          z-index: 9999;
        }

        .skill {
            margin-left: 40px;
        }

        .skill .hotkey {
            margin-left: 5px;
        }

      
        .cooldown {
            width: 42px;
            position: absolute;
            top: -11px;
            z-index: 9998;
            background-color: rgba(220, 220, 220, 0.6);
        }
    </style>
`;
export class InGameUIBottom extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    this.prop = {
      dash: 0,
      rifle: {
        cooldown: 0,
        bullets: 30,
      },
      shotgun: {
        cooldown: 0,
        bullets: 8,
      },
      telsa: {
        cooldown: 0,
        bullets: 15,
      },
      homing: {
        cooldown: 0,
        bullets: 5,
      },
      weapons: [1],
    };

    this.renderHTML();
  }

  set dash(dash) {
    this.prop.dash = dash;
    const dashEl = this.root.querySelector('#dash');
    dashEl.querySelector('.cooldown').style.height = 42 * (dash / 100) + '%';
  }

  get dash() {
    return this.prop.dash;
  }

  set rifle(rifle) {
    this.prop.rifle = rifle;

    const { cooldown, bullets } = rifle;
    const rifleEl = this.root.querySelector('#rifle');

    rifleEl.querySelector('.cooldown').style.height =
      42 * (cooldown / 100) + '%';
    rifleEl.querySelector('.bullets').innerHTML = bullets;
  }

  get rifle() {
    return this.prop.shotgun;
  }

  set shotgun(shotgun) {
    this.prop.shotgun = shotgun;

    const { cooldown, bullets } = shotgun;
    const rifleEl = this.root.querySelector('#shotgun');

    rifleEl.querySelector('.cooldown').style.height =
      42 * (cooldown / 100) + '%';
    rifleEl.querySelector('.bullets').innerHTML = bullets;
  }

  get shotgun() {
    return this.prop.shotgun;
  }

  set tesla(tesla) {
    this.prop.tesla = tesla;

    const { cooldown, bullets } = tesla;
    const rifleEl = this.root.querySelector('#tesla');

    rifleEl.querySelector('.cooldown').style.height =
      42 * (cooldown / 100) + '%';
    rifleEl.querySelector('.bullets').innerHTML = bullets;
  }

  get tesla() {
    return this.prop.tesla;
  }

  set homing(homing) {
    this.prop.homing = homing;

    const { cooldown, bullets } = homing;
    const rifleEl = this.root.querySelector('#homing');

    rifleEl.querySelector('.cooldown').style.height =
      42 * (cooldown / 100) + '%';
    rifleEl.querySelector('.bullets').innerHTML = bullets;
  }

  get homing() {
    return this.prop.homing;
  }

  set weapons(weapons) {
    this.prop.weapons = weapons;

    if (weapons.includes(1)) {
      this.root.querySelector('#rifle').style.display = 'flex';
    } else {
      this.root.querySelector('#rifle').style.display = 'none';
    }

    if (weapons.includes(2)) {
      this.root.querySelector('#shotgun').style.display = 'flex';
    } else {
      this.root.querySelector('#shotgun').style.display = 'none';
    }

    if (weapons.includes(3)) {
      this.root.querySelector('#tesla').style.display = 'flex';
    } else {
      this.root.querySelector('#tesla').style.display = 'none';
    }

    if (weapons.includes(4)) {
      this.root.querySelector('#homing').style.display = 'flex';
    } else {
      this.root.querySelector('#homing').style.display = 'none';
    }
  }

  get weapons() {
    return this.prop.weapons;
  }

  renderHTML() {
    this.root.innerHTML = `
            ${componentStyles}
            <div class="in-game-ui-bottom">
                <div class="weapons-container">
                    <div class="weapon active" id="pistol">
                       <div> 
                            <span class="hotkey">1</span>
                            <img src="assets/icons/pistol.png" height="42">
                            <div class="cooldown"></div>
                        </div> 
                        <div><span class="bullets">&#8734;</span></div>
                    </div>
                    <div class="weapon" id="rifle">
                       <div> 
                            <span class="hotkey">2</span>
                            <img src="assets/icons/rifle.png" height="42">
                            <div class="cooldown"></div>
                        </div> 
                        <div><span class="bullets">30</span> / 30</div>
                    </div>
                    <div class="weapon" id="shotgun">
                       <div> 
                            <span class="hotkey">3</span>
                            <img src="assets/icons/shotgun.png" height="42">
                            <div class="cooldown"></div>
                        </div> 
                        <div><span class="bullets">8</span> / 8</div>
                    </div>
                    <div class="weapon" id="tesla">
                       <div> 
                            <span class="hotkey">4</span>
                            <img src="assets/icons/tesla.png" height="42">
                            <div class="cooldown"></div>
                        </div> 
                        <div><span class="bullets">15</span> / 15</div>
                    </div>
                    <div class="weapon" id="homing">
                       <div> 
                            <span class="hotkey">5</span>
                            <img src="assets/icons/homing.png" height="42">
                            <div class="cooldown"></div>
                        </div> 
                        <div><span class="bullets">5</span> / 5</div>
                    </div>
                    <div class="skill" id="dash">
                       <div> 
                            <span class="hotkey">Shift</span>
                            <img src="assets/icons/dash.png" height="42">
                            <div class="cooldown"></div>
                        </div> 
                    </div>
                </div>
            </div>
        `;
  }

  setActiveWeapon(weapon) {
    const weapons = ['pistol', 'rifle', 'shotgun', 'tesla', 'homing'];

    weapons.forEach((w) =>
      this.root.querySelector(`#${w}`).classList.remove('active')
    );

    this.root.querySelector(`#${weapon}`).classList.add('active');
  }

  static get observedAttributes() {
    return ['dash', 'rifle', 'shotgun', 'tesla', 'homing', 'weapons'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'dash':
        this.rifle = newValue;
        break;
      case 'rifle':
        this.rifle = newValue;
        break;
      case 'shotgun':
        this.shotgun = newValue;
        break;
      case 'tesla':
        this.tesla = newValue;
        break;
      case 'homing':
        this.homing = newValue;
        break;
      case 'weapons':
        this.weapons = newValue;
        break;
    }
  }
}

customElements.define('in-game-ui-bottom', InGameUIBottom);
