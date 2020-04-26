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
import {
  EnemyBullet
} from './enemy-bullet';

import * as C from 'cannon';
import {
  EnemyBulletTypes
} from '../../enums/enemy-bullet-types.enum';
import {
  angleToVector2
} from '../../utils/angle-to-vector2';

export class FollowEnemy1 {
  constructor(options) {

    this.objectPoolManager = options.objectPoolManager;

    this.poolItem = this.objectPoolManager.allocate('followEnemy1');
    this.object = this.poolItem.object;
    this.object.scale.set(0.13, 0.13, 0.13);
    this.object.rotation.x = -Math.PI / 2;

    this.object.position.copy(options.position || new Vector3(0, 0, 0));
    // this.object.castShadow = true;

    this.speed = options.speed || 3;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.canShoot = options.canShoot || false;
    this.bulletType = options.bulletType || EnemyBulletTypes.DESTRUCTIBLE;
    this.fireDistance = options.fireDistance || 18;
    this.fireCooldown = options.fireRate || 40;
    this.fireRate = options.fireRate || 40;
    this.bulletSpeed = options.bulletSpeed || 12;
    this.damage = options.damage || 5;

    this.spawnLife = options.spawnLife || false;
    this.lifeToAdd = options.lifeToAdd || 0;

    this.attackCooldown = 0;
    this.attackRate = options.attackRate || 20;
    this.onTouchAttack = true;

    this.life = options.life || 10;

    this.velocity = new Vector3();

    this.isWithinDistance = false;

    this.bBox = new Box3().setFromObject(this.object);
  }

  takeDamage(damage = 1) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  update() {
    this.fireCooldown--;

    const vel = this.velocity
      .clone()
      .setLength(this.isWithinDistance && this.canShoot ? 0 : this.speed);

    this.object.body.velocity.copy(new C.Vec3(vel.x, 0, vel.z));

    this.object.position.copy(this.object.body.position);
    this.bBox = this.bBox.setFromObject(this.object);

    if (this.takeDamageCooldown > 0) {
      this.object.material.color.setHex(0xeeeeee);
    } else {
      this.object.material.color.setHex(0x000000);
    }

    this.takeDamageCooldown--;
    this.attackCooldown--;
  }

  canAttack() {
    return this.attackCooldown <= 0;
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
      this.bulletType,
      this.objectPoolManager
    );

    this.fireCooldown = this.fireRate;

    return [bullet];
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
}