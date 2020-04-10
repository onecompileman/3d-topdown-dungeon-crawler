import { PlayerBullet } from '../game-objects/player-bullet';
import { Vector2, MathUtils, Vector3 } from 'three';
import { WeaponTypes } from '../../enums/weapons-types.enum';
import { angleToVector2 } from '../../utils/angle-to-vector2';

export class Shotgun {
  constructor() {
    this.damage = 2.5;

    this.maxDistance = 30;
    this.speed = 40;

    this.reloadCooldown = 0;
    this.reloadCooldownRate = 80;

    this.bullets = 8;
    this.maxBullets = 8;

    this.fireRate = 20;
    this.fireCooldown = 0;

    this.pellets = 6;

    this.name = 'shotgun';
  }

  fire(position, velocity) {
    let bullets = [];
    const spread = Math.PI / 3;

    for (let i = 0; i < this.pellets; i++) {
      const angle = new Vector2(velocity.x, velocity.z).angle();

      const angleDamp = MathUtils.randFloat(-spread, spread);

      const dampVector2d = angleToVector2(angle + angleDamp);

      const velocityDamped = velocity
        .clone()
        .add(new Vector3(dampVector2d.x, 0, dampVector2d.y));

      const bullet = new PlayerBullet(
        position.clone(),
        velocityDamped.clone(),
        40,
        30,
        this.damage,
        WeaponTypes.SHOTGUN
      );

      bullets.push(bullet);
    }

    this.bullets--;

    if (this.bullets === 0) {
      this.reloadCooldown = this.reloadCooldownRate;
    }

    this.fireCooldown = this.fireRate;

    return bullets;
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
