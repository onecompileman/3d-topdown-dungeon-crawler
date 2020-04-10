import { PlayerBullet } from '../game-objects/player-bullet';
import { Vector2, MathUtils } from 'three';
import { WeaponTypes } from '../../enums/weapons-types.enum';

export class Tesla {
  constructor() {
    this.damage = 5.5;

    this.maxDistance = 30;
    this.speed = 10;

    this.reloadCooldown = 0;
    this.reloadCooldownRate = 150;

    this.bullets = 15;
    this.maxBullets = 15;

    this.fireRate = 18;
    this.fireCooldown = 0;

    this.name = 'tesla';
  }

  fire(position, velocity) {
    const bullet = new PlayerBullet(
      position.clone(),
      velocity.clone(),
      this.speed,
      this.maxDistance,
      this.damage,
      WeaponTypes.TESLA
    );

    this.bullets--;

    if (this.bullets === 0) {
      this.reloadCooldown = this.reloadCooldownRate;
    }

    this.fireCooldown = this.fireRate;

    return [bullet];
  }

  canFire() {
    return this.fireCooldown <= 0 && this.bullets > 0;
  }

  isReloading() {
    return this.reloadCooldown > 0;
  }

  update() {
    this.fireCooldown--;

    if (this.bullets === 0) {
      this.reloadCooldown--;
      if (this.reloadCooldown <= 0) {
        this.bullets = this.maxBullets;
      }
    }
  }

  reloadPercentage() {
    if (this.reloadCooldown <= 0) {
      return 0;
    }
    return (this.reloadCooldown / this.reloadCooldownRate) * 100;
  }
}
