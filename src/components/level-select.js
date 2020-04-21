const componentStyles = `
    <style>
    </style>
`;

export class LevelSelect extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.prop = {
      levelSelectCallback: (level, floor) => {},
    };
  }

  renderHTML() {
    this.root.innerHTML = `
            <div class="level-select">
                <div class="level-select-top">
                    <span class="back" id="back">
                        Back
                    </span>
                </div>
                <span class="select-level-text">
                    Level Select
                </span>
                <div class="level-select-container">

                </div>
            </div>
        `;
  }
}
