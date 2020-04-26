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
  SphereBufferGeometry,
  BoxBufferGeometry,
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
  EnemyBulletTypes
} from '../../enums/enemy-bullet-types.enum';

export class FollowEnemy4 {
  constructor(options) {
    this.objectPoolManager = options.objectPoolManager;

    this.poolItem = this.objectPoolManager.allocate('followEnemy4');
    this.object = this.poolItem.object;
    this.object.scale.set(0.13, 0.13, 0.13);
    this.object.rotation.x = -Math.PI / 2;

    this.scale = 0.13;

    this.object.position.copy(options.position || new Vector3(0, 0, 0));
    // this.object.castShadow = true;

    this.has2ndObject = true;

    const geometry2 = new BoxBufferGeometry(0.82, 0.82, 0.5);
    const material2 = new MeshLambertMaterial({
      color: 0x000000,
    });

    this.spawnLife = options.spawnLife || false;
    this.lifeToAdd = options.lifeToAdd || 0;

    this.poolItem2 = this.objectPoolManager.allocate('followEnemy4Object2');

    this.object2 = this.poolItem2.object;
    this.object2.rotation.z = Math.PI / 4;

    this.speed = options.speed || 2;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.canShoot = options.canShoot || false;
    this.fireDistance = options.fireDistance || 18;
    this.fireCooldown = options.fireRate || 40;
    this.fireRate = options.fireRate || 40;
    this.bulletType = options.bulletType || EnemyBulletTypes.DESTRUCTIBLE;
    this.bulletSpeed = options.bulletSpeed || 12;
    this.damage = options.damage || 5;

    this.attackCooldown = 0;
    this.attackRate = options.attackRate || 20;
    this.onTouchAttack = true;

    this.isWithinDistance = false;

    this.life = options.life || 12;

    this.velocity = new Vector3(0, 0, 0);

    this.bBox = new Box3().setFromObject(this.object);

    const object = this.object.clone();

    object.scale.set(this.scale * 0.7, this.scale, this.scale * 0.7);
    this.bBox = new Box3().setFromObject(object);

    this.bBox2 = new Box3().setFromObject(this.object2);
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
      this.bulletType,
      this.objectPoolManager
    );

    this.fireCooldown = this.fireRate;

    return [bullet];
  }

  canAttack() {
    return this.attackCooldown <= 0;
  }

  update() {
    this.fireCooldown--;

    const vel = this.velocity
      .clone()
      .setLength(this.isWithinDistance && this.canShoot ? 0 : this.speed);

    this.object.body.velocity.copy(new C.Vec3(vel.x, 0, vel.z));

    this.object.position.copy(this.object.body.position);

    const objectPos = this.object.position.clone();
    const oppVel = this.velocity.clone();
    oppVel.multiplyScalar(-1);
    oppVel.setLength(0.55);

    objectPos.add(oppVel);

    this.object2.position.copy(objectPos.clone());

    const object = this.object.clone();
    object.scale.set(this.scale * 0.7, this.scale, this.scale * 0.7);

    this.bBox = this.bBox.setFromObject(object);
    this.bBox2 = this.bBox2.setFromObject(this.object2);

    if (this.takeDamageCooldown > 0) {
      this.object2.material.color.setHex(0xeeeeee);
    } else {
      this.object2.material.color.setHex(0x000000);
    }

    this.attackCooldown--;
    this.takeDamageCooldown--;
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
    this.object2.rotation.y = this.object.rotation.z;

    vel.copy(angleToVector2(-this.object.rotation.z + Math.PI / 2));
    vel.multiplyScalar(-1);

    this.velocity.set(vel.x, 0, vel.y);
  }

  canFire() {
    return this.fireCooldown <= 0 && this.canShoot;
  }

  isDead() {
    return this.life <= 0;
  }
}