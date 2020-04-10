import { PlayerBullet } from '../game-objects/player-bullet';

export class Pistol {
  constructor() {
    this.damage = 1;

    this.isInfinite = true;

    this.maxDistance = 30;
    this.speed = 40;
    this.fireRate = 15;
    this.fireCooldown = 0;
    this.name = 'pistol';
  }

  fire(position, velocity) {
    const bullet = new PlayerBullet(
      position.clone(),
      velocity.clone(),
      40,
      30,
      this.damage
    );

    this.fireCooldown = this.fireRate;

    return [bullet];
  }

  canFire() {
    return this.fireCooldown <= 0;
  }

  update() {
    this.fireCooldown--;
  }

  isReloading() {
    return false;
  }

  reloadPercentage() {
    return 0;
  }
}
