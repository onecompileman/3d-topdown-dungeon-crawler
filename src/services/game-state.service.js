import { isEmpty } from 'lodash';

export class GameStateService {
  constructor() {
    this.saveSlots = {
      saveSlot1: {},
      saveSlot2: {},
      saveSlot3: {},
    };

    this.loadSaveSlots();
  }

  loadSaveSlots() {
    const saveSlot1 = localStorage.getItem('saveSlot1');
    const saveSlot2 = localStorage.getItem('saveSlot2');
    const saveSlot3 = localStorage.getItem('saveSlot3');

    this.saveSlots = {
      saveSlot1: saveSlot1 ? JSON.parse(saveSlot1) : {},
      saveSlot2: saveSlot2 ? JSON.parse(saveSlot2) : {},
      saveSlot3: saveSlot3 ? JSON.parse(saveSlot3) : {},
    };
  }

  initSlot(slotName) {
    this.saveSlots[slotName] = {
      level: 1,
      floor: 1,
      weapons: [0],
      floors: [],
    };

    localStorage.setItem(slotName, JSON.stringify(this.saveSlots[slotName]));
  }

  isSlotExisting(slotName) {
    return !isEmpty(this.saveSlots[slotName]);
  }

  saveWeapons(weapon, slotName) {
    const weapons = this.saveSlots[slotName].weapons;

    if (!weapons.includes(weapon)) {
      weapons.push(weapon);

      localStorage.setItem(slotName, JSON.stringify(this.saveSlots[slotName]));
    }
  }

  saveFloor(floorData, slotName) {
    const { level, floor } = floorData;
    const floors = this.saveSlots[slotName].floors;

    const existingFloor = floors.find((f) => {
      return f.level == level && f.floor == floor;
    });

    if (existingFloor) {
      if (existingFloor.rating > floorData.rating) {
        Object.keys(floorData).forEach((key) => {
          existingFloor[key] = floorData[key];
        });
      }
    } else {
      floors.push(floorData);
    }

    localStorage.setItem(slotName, JSON.stringify(this.saveSlots[slotName]));
  }
}
