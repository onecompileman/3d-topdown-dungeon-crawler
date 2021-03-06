import {
  CylinderBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector3,
  Box3,
} from 'three';
import {
  EnemyBulletTypes
} from '../../enums/enemy-bullet-types.enum';
import {
  EnemyBullet
} from './enemy-bullet';
import {
  angleToVector2
} from '../../utils/angle-to-vector2';

export class Tower1 {
  constructor(options) {
    this.objectPoolManager = options.objectPoolManager;

    this.poolItem = this.objectPoolManager.allocate('towerBody');
    this.object = this.poolItem.object;
    this.object.position.copy(options.position || new Vector3(0, 0, 0));

    this.life = options.life || 30;
    this.fireCooldown = options.fireRate || 15;
    this.fireRate = options.fireRate || 15;
    this.bulletSpeed = options.bulletSpeed || 14;
    this.damage = options.damage || 5;

    this.bulletType = options.bulletType || EnemyBulletTypes.DESTRUCTIBLE;
    this.bulletsToFire = options.bullets || 1;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.bBox = new Box3().setFromObject(this.object);

    this.spawnLife = options.spawnLife || false;
    this.lifeToAdd = options.lifeToAdd || 0;
  }

  takeDamage(damage = 1) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  follow(target) {}

  update() {
    this.fireCooldown--;

    this.object.rotation.y += 0.01;

    this.bBox = this.bBox.setFromObject(this.object);

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