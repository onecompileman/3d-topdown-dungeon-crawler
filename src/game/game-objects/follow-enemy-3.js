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
import { angleToVector2 } from '../../utils/angle-to-vector2';

export class FollowEnemy3 {
  constructor(
    position,
    life = 10,
    speed = 3,
    scale = 0.33,
    spawns = 2,
    spawnLevel = 3
  ) {
    const geometry = new ConeBufferGeometry(5.4, 10, 3, 1, false, 0, 6.3);
    const material = new MeshLambertMaterial({
      color: 0x000000,
    });

    const lineMaterial = new LineBasicMaterial({ color: 0xff6666 });
    const line = new Line(geometry, lineMaterial);

    this.line = line;
    this.object = new Mesh(geometry, material);
    this.object.scale.set(scale, scale, scale);
    this.object.rotation.x = -Math.PI / 2;

    this.object.position.copy(position);
    this.object.castShadow = true;

    this.speed = speed;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.origLife = this.life = life;

    this.scale = scale;
    this.spawnsOnDeath = true;
    this.spawnLevel = spawnLevel;
    this.spawns = spawns;

    this.velocity = new Vector3();

    const object = this.object.clone();

    object.scale.set(scale * 0.5, scale, scale * 0.7);
    this.bBox = new Box3().setFromObject(object);
  }

  takeDamage(damage = 1) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  update() {
    const vel = this.velocity.clone().setLength(this.speed);

    this.object.body.velocity.copy(new C.Vec3(vel.x, 0, vel.z));

    this.object.position.copy(this.object.body.position);

    const object = this.object.clone();
    object.scale.set(this.scale * 0.5, this.scale * 0.7, this.scale);

    this.bBox = new Box3().setFromObject(object);

    if (this.takeDamageCooldown > 0) {
      this.object.material.color.setHex(0xeeeeee);
    } else {
      this.object.material.color.setHex(0x000000);
    }

    this.takeDamageCooldown--;
  }

  follow(target) {
    const follow2dTarget = new Vector2(target.x, target.z);
    const pos2d = new Vector2(this.object.position.x, this.object.position.z);

    const vel = follow2dTarget.sub(pos2d);

    const startQuaternion = new Quaternion().setFromEuler(
      this.object.rotation.clone()
    );
    const endQuaternion = new Quaternion().setFromEuler(
      new Euler(this.object.rotation.x, 0, -(vel.angle() + Math.PI / 2))
    );
    startQuaternion.slerp(endQuaternion, 0.03);

    this.object.rotation.setFromQuaternion(startQuaternion);

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

        const enemy = new FollowEnemy3(
          new Vector3(
            position.x + MathUtils.randFloat(-5, 5),
            0,
            position.z + MathUtils.randFloat(-5, 5)
          ),
          this.origLife / 2,
          this.speed + 1.8,
          this.scale * 0.65,
          this.spawns * 2,
          this.spawnLevel - 1
        );

        enemies.push(enemy);
      }
    }
    return enemies;
  }
}
