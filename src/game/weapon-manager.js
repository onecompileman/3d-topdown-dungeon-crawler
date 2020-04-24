import { Pistol } from './weapons/pistol';
import { Rifle } from './weapons/rifle';
import { WeaponTypes } from '../enums/weapons-types.enum';
import { Shotgun } from './weapons/shotgun';
import { Tesla } from './weapons/tesla';
import { Homing } from './weapons/homing';

export class WeaponManager {
  constructor(inGameUIBottom) {
    this.inGameUIBottom = inGameUIBottom;

    this.unlockedWeapons = [0];

    this.weapons = {
      pistol: new Pistol(),
      rifle: new Rifle(),
      shotgun: new Shotgun(),
      tesla: new Tesla(),
      homing: new Homing(),
    };

    this.activeWeapon = this.weapons.pistol;
  }

  setActiveWeapon(weaponType) {
    switch (weaponType) {
      case WeaponTypes.PISTOL:
        this.activeWeapon = this.weapons.pistol;
        break;
      case WeaponTypes.RIFLE:
        if (this.unlockedWeapons.includes(1))
          this.activeWeapon = this.weapons.rifle;
        break;
      case WeaponTypes.SHOTGUN:
        if (this.unlockedWeapons.includes(2))
          this.activeWeapon = this.weapons.shotgun;
        break;
      case WeaponTypes.TESLA:
        if (this.unlockedWeapons.includes(3))
          this.activeWeapon = this.weapons.tesla;
        break;
      case WeaponTypes.HOMING:
        if (this.unlockedWeapons.includes(4))
          this.activeWeapon = this.weapons.homing;
        break;
    }

    this.updateActiveWeaponUI();
  }

  fire(position, velocity) {
    if (this.activeWeapon.canFire()) {
      if (!this.activeWeapon.isInfinite) {
        const weaponState = {
          cooldown: 0,
          bullets: this.activeWeapon.bullets,
        };

        this.inGameUIBottom[this.activeWeapon.name] = weaponState;
      }

      return this.activeWeapon.fire(position, velocity);
    }

    return null;
  }

  canFire() {
    return this.activeWeapon.canFire();
  }

  update() {
    Object.keys(this.weapons).forEach((name) => {
      const weapon = this.weapons[name];
      weapon.update();

      if (
        !weapon.isInfinite &&
        weapon.reloadCooldown >= 0 &&
        weapon.bullets === 0
      ) {
        const weaponState = {
          cooldown: weapon.reloadPercentage(),
          bullets: weapon.bullets,
        };

        this.inGameUIBottom[name] = weaponState;
      }
    });
  }

  updateActiveWeaponUI() {
    this.inGameUIBottom.setActiveWeapon(this.activeWeapon.name);
  }
}
