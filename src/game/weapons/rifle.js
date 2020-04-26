import {
  PlayerBullet
} from '../game-objects/player-bullet';
import {
  Vector2,
  MathUtils
} from 'three';
import {
  WeaponTypes
} from '../../enums/weapons-types.enum';

export class Rifle {
  constructor() {
    this.damage = 3.5;

    this.maxDistance = 30;
    this.speed = 40;

    this.reloadCooldown = 0;
    this.reloadCooldownRate = 70;

    this.bullets = 30;
    this.maxBullets = 30;

    this.fireRate = 8;
    this.fireCooldown = 0;

    this.name = 'rifle';
  }

  fire(position, velocity, objectPoolManager) {
    const bullet = new PlayerBullet(
      position.clone(),
      velocity.clone(),
      40,
      30,
      this.damage,
      WeaponTypes.RIFLE,
      objectPoolManager
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