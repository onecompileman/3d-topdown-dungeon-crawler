import {
  PlayerBullet
} from '../game-objects/player-bullet';
import {
  Vector2,
  MathUtils,
  Vector3
} from 'three';
import {
  WeaponTypes
} from '../../enums/weapons-types.enum';
import {
  angleToVector2
} from '../../utils/angle-to-vector2';

export class Homing {
  constructor() {
    this.damage = 5.5;

    this.maxDistance = 30;
    this.speed = 10;

    this.reloadCooldown = 0;
    this.reloadCooldownRate = 100;

    this.bullets = 5;
    this.maxBullets = 5;

    this.fireRate = 30;
    this.fireCooldown = 0;

    this.pellets = 12;

    this.name = 'homing';
  }

  fire(position, velocity, objectPoolManager) {
    let bullets = [];
    const spread = Math.PI * 0.75;

    for (let i = 0; i < this.pellets; i++) {
      const angle = new Vector2(velocity.x, velocity.z).angle();

      const angleDamp = MathUtils.randFloat(-spread, spread);

      const dampVector2d = angleToVector2(angle + angleDamp);

      const velocityDamped = velocity
        .clone()
        .add(
          new Vector3(dampVector2d.x, MathUtils.randFloat(0, 3), dampVector2d.y)
        );

      const bullet = new PlayerBullet(
        position.clone(),
        velocityDamped.clone(),
        this.speed + MathUtils.randFloat(0, 4),
        30,
        this.damage,
        WeaponTypes.HOMING, objectPoolManager
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