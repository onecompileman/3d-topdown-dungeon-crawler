import {
  CylinderBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector3,
  Box3,
} from 'three';
import { EnemyBulletTypes } from '../../enums/enemy-bullet-types.enum';
import { EnemyBullet } from './enemy-bullet';
import { angleToVector2 } from '../../utils/angle-to-vector2';

export class Tower1 {
  constructor(
    position,
    life = 20,
    bulletType = EnemyBulletTypes.DESTRUCTIBLE,
    bullets = 1,
    fireRate = 15,
    damage = 5
  ) {
    const geometry = new CylinderBufferGeometry(
      0.7,
      0.7,
      3,
      8,
      1,
      false,
      0,
      6.3
    );
    const material = new MeshLambertMaterial({
      color: 0x111111,
    });

    this.object = new Mesh(geometry, material);
    this.object.position.copy(position);

    this.life = life;
    this.fireCooldown = fireRate;
    this.fireRate = fireRate;
    this.bulletSpeed = 14;
    this.damage = damage;

    this.bulletType = bulletType;
    this.bulletsToFire = bullets;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.bBox = new Box3().setFromObject(this.object);
  }

  takeDamage(damage = 1) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  follow(target) {}

  update() {
    this.fireCooldown--;

    this.object.rotation.y += 0.01;

    this.bBox = new Box3().setFromObject(this.object);

    if (this.takeDamageCooldown > 0) {
      this.object.material.color.setHex(0xeeeeee);
    } else {
      this.object.material.color.setHex(0x111111);
    }

    this.takeDamageCooldown--;
  }

  isDead() {
    return this.life <= 0;
  }

  canFire() {
    return this.fireCooldown <= 0;
  }

  fire() {
    const initialRotation = this.object.rotation.y;
    const incrementRotation = (Math.PI * 2) / this.bulletsToFire;

    let bullets = [];

    for (let i = 0; i < this.bulletsToFire; i++) {
      const bulletVel2d = angleToVector2(
        initialRotation + incrementRotation * i
      );
      const bulletVel = new Vector3(bulletVel2d.x, 0, bulletVel2d.y);
      bulletVel.normalize();

      const bulletPos = this.object.position.clone().add(bulletVel);

      bulletPos.y = -1.2;

      const bullet = new EnemyBullet(
        bulletPos,
        bulletVel,
        this.bulletSpeed,
        25,
        this.damage,
        this.bulletType
      );

      bullets.push(bullet);
    }

    this.fireCooldown = this.fireRate;

    return bullets;
  }

  canSpawnEnemy() {
    return false;
  }
}
