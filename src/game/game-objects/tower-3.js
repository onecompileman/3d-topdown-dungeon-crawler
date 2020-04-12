import {
  CylinderBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector3,
  Box3,
  BoxBufferGeometry,
} from 'three';
import { EnemyBulletTypes } from '../../enums/enemy-bullet-types.enum';
import { EnemyBullet } from './enemy-bullet';
import { angleToVector2 } from '../../utils/angle-to-vector2';
import { FollowEnemy1 } from './follow-enemy-1';

export class Tower3 {
  constructor(
    position,
    life = 20,
    bulletType = EnemyBulletTypes.DESTRUCTIBLE,
    bullets = 1,
    fireRate = 15,
    shieldCount = 4,
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

    this.enemySpawnRate = 240;
    this.enemySpawnCooldown = this.enemySpawnRate;
    this.enemyLife = 5;
    this.enemyDamage = 5;
    this.enemySpeed = 4.5;
    this.enemySpawn = true;
    this.enemySpawnCanShoot = false;

    this.bulletType = bulletType;
    this.bulletsToFire = bullets;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.shields = [];
    this.shieldBbox = [];

    for (let i = 0; i < shieldCount; i++) {
      const geometry1 = new BoxBufferGeometry(0.85, 0.85, 0.15);
      const material1 = new MeshLambertMaterial({
        color: 0xeeeeee,
      });

      const shield1 = new Mesh(geometry1, material1);
      const shieldBbox = new Box3().setFromObject(shield1);
      this.shields.push(shield1);
      this.shieldBbox.push(shieldBbox);
    }

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

    const initialRotation = this.object.rotation.y;
    const rotationIncrement = (Math.PI * 2) / this.shields.length;

    this.shields.forEach((shield, i) => {
      const angle = initialRotation + i * rotationIncrement;
      const shieldLookAt2d = angleToVector2(angle);
      shieldLookAt2d.setLength(1);

      const shieldLookAt = new Vector3(shieldLookAt2d.x, 0, shieldLookAt2d.y);

      const shieldPos = new Vector3().copy(this.object.position);
      shieldPos.add(shieldLookAt);

      shieldPos.y = -1;

      shield.rotation.y = angle;
      shield.position.copy(shieldPos);

      this.shieldBbox[i].setFromObject(shield);
    });

    if (this.takeDamageCooldown > 0) {
      this.object.material.color.setHex(0xeeeeee);
    } else {
      this.object.material.color.setHex(0x111111);
    }

    this.takeDamageCooldown--;
    this.enemySpawnCooldown--;
  }

  isDead() {
    return this.life <= 0;
  }

  canSpawnEnemy() {
    return this.canSpawnEnemy && this.enemySpawnCooldown <= 0;
  }

  canFire() {
    return this.fireCooldown <= 0;
  }

  spawnEnemy() {
    const enemyPosition2d = angleToVector2(this.object.rotation.y);
    enemyPosition2d.setLength(2);
    const enemyPosition = this.object.position
      .clone()
      .add(new Vector3(enemyPosition2d.x, 0, enemyPosition2d.y));

    enemyPosition.y = -1.2;

    const enemy = new FollowEnemy1(
      enemyPosition,
      this.enemyLife,
      this.enemySpeed,
      this.enemySpawnCanShoot,
      this.enemyDamage
    );

    enemy.object.rotation.z = this.object.rotation.y;

    this.enemySpawnCooldown = this.enemySpawnRate;

    return enemy;
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
}
