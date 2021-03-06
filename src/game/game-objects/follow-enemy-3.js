import {
  ConeBufferGeometry,
  MeshLambertMaterial,
  LineBasicMaterial,
  Line,
  Mesh,
  Box3,
  Color,
  Vector2,
  Vector3,
  MathUtils,
  Quaternion,
  Euler,
} from 'three';

import * as C from 'cannon';
import {
  angleToVector2
} from '../../utils/angle-to-vector2';
import {
  EnemyBullet
} from './enemy-bullet';
import {
  randomArrayElement
} from '../../utils/random-array-element';
import {
  EnemyBulletTypes
} from '../../enums/enemy-bullet-types.enum';

export class FollowEnemy3 {
  constructor(options) {
    this.objectPoolManager = options.objectPoolManager;

    this.poolItem = this.objectPoolManager.allocate('followEnemy3');
    this.object = this.poolItem.object;

    this.scale = options.scale || 1.3;

    this.object.scale.set(this.scale, this.scale * 0.9, this.scale * 0.9);
    this.object.rotation.x = -Math.PI / 2;

    this.object.position.copy(options.position || 0);
    this.object.position.y = -1.5;
    // this.object.castShadow = true;

    this.speed = options.speed || 2.5;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.origLife = this.life = options.life || 30;

    this.scale = options.scale || 1.3;
    this.spawnsOnDeath = true;
    this.spawnLevel = options.spawnLevel || 3;
    this.spawns = options.spawns || 2;

    this.canShoot = options.canShoot || false;
    this.fireDistance = options.fireDistance || 18;
    this.fireCooldown = options.fireRate || 40;
    this.fireRate = options.fireRate || 40;
    this.bulletSpeed = options.bulletSpeed || 12;
    this.damage = options.damage || 8;

    this.attackCooldown = 0;
    this.attackRate = options.attackRate || 20;
    this.onTouchAttack = true;

    this.spawnLife = options.spawnLife || false;
    this.lifeToAdd = options.lifeToAdd || 0;

    this.isWithinDistance = false;

    this.velocity = new Vector3();

    const object = this.object.clone();

    object.scale.set(this.scale * 0.5, this.scale, this.scale * 0.5);
    this.bBox = new Box3().setFromObject(object);
  }

  takeDamage(damage = 1) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  canFire() {
    return this.fireCooldown <= 0 && this.canShoot;
  }

  fire() {
    const bulletVel = this.velocity.clone();
    bulletVel.normalize();

    const bulletPos = this.object.position.clone().add(bulletVel);

    const bullet = new EnemyBullet(
      bulletPos,
      bulletVel,
      this.bulletSpeed,
      25,
      this.damage,
      EnemyBulletTypes.DESTRUCTIBLE,
      this.objectPoolManager
    );

    this.fireCooldown = this.fireRate;

    return [bullet];
  }

  update() {
    this.fireCooldown--;

    const vel = this.velocity
      .clone()
      .setLength(this.isWithinDistance && this.canShoot ? 0 : this.speed);

    this.object.body.velocity.copy(new C.Vec3(vel.x, 0, vel.z));

    this.object.position.copy(this.object.body.position);

    this.object.position.y = -0.5;

    const object = this.object.clone();
    object.position.y = -1;
    object.scale.set(this.scale * 0.5, this.scale * 1.4, this.scale * 0.5);

    this.bBox = this.bBox.setFromObject(object);

    if (this.takeDamageCooldown > 0) {
      this.object.material.color.setHex(0xeeeeee);
    } else {
      this.object.material.color.setHex(0x000000);
    }

    this.takeDamageCooldown--;
    this.attackCooldown--;
  }

  canAttack() {
    return this.onTouchAttack <= 0;
  }

  follow(target) {
    this.isWithinDistance =
      this.object.position.distanceTo(target) <= this.fireDistance;

    const follow2dTarget = new Vector2(target.x, target.z);
    const pos2d = new Vector2(this.object.position.x, this.object.position.z);

    let vel = follow2dTarget.sub(pos2d);

    const startQuaternion = new Quaternion().setFromEuler(
      this.object.rotation.clone()
    );

    const endQuaternion = new Quaternion().setFromEuler(
      new Euler(this.object.rotation.x, 0, -(vel.angle() + Math.PI / 2))
    );
    startQuaternion.slerp(endQuaternion, 0.02);

    this.object.rotation.setFromQuaternion(startQuaternion);

    vel.copy(angleToVector2(-this.object.rotation.z + Math.PI / 2));
    vel.multiplyScalar(-1);

    this.velocity.set(vel.x, 0, vel.y);
  }

  isDead() {
    return this.life <= 0;
  }

  onDeathSpawns() {
    let enemies = [];
    if (this.spawnLevel > 1) {
      for (let i = 0; i < this.spawns; i++) {
        const position = this.object.position;

        const enemy = new FollowEnemy3({
          position: new Vector3(position.x + MathUtils.randFloat(-3, 3),
            0,
            position.z + MathUtils.randFloat(-3, 3)),
          life: this.origLife / 2,
          speed: this.speed + 1.8,
          scale: this.scale * 0.65,
          spawns: this.spawns * 2,
          spawnLevel: this.spawnLevel - 1,
          canShoot: randomArrayElement([false, true]),
          objectPoolManager: this.objectPoolManager
        });

        enemies.push(enemy);
      }
    }
    return enemies;
  }
}