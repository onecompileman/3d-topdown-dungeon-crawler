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
  TorusBufferGeometry,
} from 'three';

import * as C from 'cannon';
import { EnemyBullet } from './enemy-bullet';
import { EnemyBulletTypes } from '../../enums/enemy-bullet-types.enum';
import { angleToVector2 } from '../../utils/angle-to-vector2';

export class FollowEnemy2 {
  constructor(options) {
    const geometry = new TorusBufferGeometry(5, 5.9, 4, 8, 6.3);
    const material = new MeshLambertMaterial({
      color: 0x555555,
    });

    const lineMaterial = new LineBasicMaterial({ color: 0x555555 });
    const line = new Line(geometry, lineMaterial);

    this.line = line;
    this.object = new Mesh(geometry, material);
    this.object.scale.set(0.13, 0.13, 0.13);
    this.object.rotation.x = -Math.PI / 2;

    this.object.position.copy(options.position || new Vector3(0, 0, 0));
    this.object.castShadow = true;

    this.speed = options.speed || 3;

    this.canShoot = options.canShoot || false;
    this.fireDistance = options.fireDistance || 18;
    this.fireCooldown = options.fireRate || 20;
    this.fireRate = options.fireRate || 20;
    this.bulletSpeed = options.bulletSpeed || 8;
    this.damage = options.damage || 5;

    this.attackCooldown = 0;
    this.attackRate = options.attackRate || 20;
    this.onTouchAttack = true;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.life = options.life || 15;

    this.velocity = new Vector3();

    this.bBox = new Box3().setFromObject(this.object);

    this.bulletsToFire = options.bulletsToFire || 2;

    this.spawnLife = options.spawnLife || false;
    this.lifeToAdd = options.lifeToAdd || 0;
  }

  takeDamage(damage = 1) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  canAttack() {
    return this.attackCooldown <= 0;
  }

  canFire() {
    return this.fireCooldown <= 0 && this.canShoot;
  }

  fire() {
    const initialRotation = this.object.rotation.z;
    const incrementRotation = (Math.PI * 2) / this.bulletsToFire;

    let bullets = [];

    for (let i = 0; i < this.bulletsToFire; i++) {
      const bulletVel2d = angleToVector2(
        initialRotation + incrementRotation * i
      );
      const bulletVel = new Vector3(bulletVel2d.x, 0, bulletVel2d.y);
      bulletVel.normalize();

      const bulletPos = this.object.position.clone().add(bulletVel);

      const bullet = new EnemyBullet(
        bulletPos,
        bulletVel,
        this.bulletSpeed,
        20,
        this.damage,
        EnemyBulletTypes.RANDOM
      );

      bullets.push(bullet);
    }

    this.fireCooldown = this.fireRate;

    return bullets;
  }

  update() {
    this.fireCooldown--;

    const vel = this.velocity.clone().setLength(this.speed);
    this.object.rotation.z += 0.1;

    this.object.body.velocity.copy(new C.Vec3(vel.x, 0, vel.z));

    this.object.position.copy(this.object.body.position);
    this.bBox = new Box3().setFromObject(this.object);

    if (this.takeDamageCooldown > 0) {
      this.object.material.color.setHex(0xeeeeee);
    } else {
      this.object.material.color.setHex(0x111111);
    }

    this.takeDamageCooldown--;
    this.attackCooldown--;
  }

  follow(target) {
    const follow2dTarget = new Vector2(target.x, target.z);
    const pos2d = new Vector2(this.object.position.x, this.object.position.z);

    const vel = follow2dTarget.sub(pos2d);

    // this.object.rotation.z = -(vel.angle() + Math.PI / 2);

    this.velocity.set(vel.x, 0, vel.y);
  }

  isDead() {
    return this.life <= 0;
  }
}
