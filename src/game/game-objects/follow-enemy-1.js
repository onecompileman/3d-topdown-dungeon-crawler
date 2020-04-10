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
} from 'three';

import * as C from 'cannon';

export class FollowEnemy1 {
  constructor(position, life = 10, speed = 3) {
    const geometry = new ConeBufferGeometry(5.4, 10, 3, 1, false, 0, 6.3);
    const material = new MeshLambertMaterial({
      color: 0x000000,
    });

    const lineMaterial = new LineBasicMaterial({ color: 0x555555 });
    const line = new Line(geometry, lineMaterial);

    this.line = line;
    this.object = new Mesh(geometry, material);
    this.object.scale.set(0.13, 0.13, 0.13);
    this.object.rotation.x = -Math.PI / 2;

    this.object.position.copy(position);
    this.object.castShadow = true;

    this.speed = speed;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.life = life;

    this.velocity = new Vector3();

    this.bBox = new Box3().setFromObject(this.object);
  }

  takeDamage(damage = 1) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  update() {
    const vel = this.velocity.clone().setLength(this.speed);

    this.object.body.velocity.copy(new C.Vec3(vel.x, 0, vel.z));

    this.object.position.copy(this.object.body.position);
    this.bBox = new Box3().setFromObject(this.object);

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

    this.object.rotation.z = -(vel.angle() + Math.PI / 2);

    this.velocity.set(vel.x, 0, vel.y);
  }

  isDead() {
    return this.life <= 0;
  }
}
