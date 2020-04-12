import {
  SphereBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Line,
  LineDashedMaterial,
  LineBasicMaterial,
  Box3,
  Vector3,
  Vector2,
  Quaternion,
  Euler,
  MathUtils,
} from 'three';
import * as C from 'cannon';
import { randomArrayElement } from '../../utils/random-array-element';
import { BossPhases } from '../../enums/boss-phases.enum';
import { angleToVector2 } from '../../utils/angle-to-vector2';
import { EnemyBullet } from './enemy-bullet';
import { EnemyBulletTypes } from '../../enums/enemy-bullet-types.enum';

export class Boss {
  constructor(
    position,
    life = 200,
    damage = 10,
    phases = 1,
    bullets = 6,
    spawnsOnDeath = false,
    spawnLevel = 1,
    spawns = 2
  ) {
    const geometry = new SphereBufferGeometry(1.3, 12, 9);
    const material = new MeshLambertMaterial({
      color: 0x111111,
    });

    this.object = new Mesh(geometry, material);

    this.object.position.copy(position);
    this.object.position.y = -1.2;

    this.life = life;
    this.damage = damage;
    this.phases = phases;

    this.spawnsOnDeath = spawnsOnDeath;
    this.spawns = spawns;
    this.spawnLevel = spawnLevel;
    this.hasShield = false;
    this.shieldEnabled = false;
    this.speed = 5;

    this.fireCooldown = 12;
    this.fireRate = 12;
    this.bulletSpeed = 12;
    this.damage = damage;
    this.bulletsToFire = bullets;

    this.attackCooldown = 0;
    this.attackRate = 20;
    this.onTouchAttack = true;

    const randomPhase = randomArrayElement(Object.keys(BossPhases));
    this.currentPhase = BossPhases[randomPhase];

    this.currentPhaseCtr = 1;
    const phaseLifeIncrement = life / (phases + 1);
    this.phasesLife = Array(phases + 1)
      .fill(1)
      .map((p, i) => [i * phaseLifeIncrement, (i + 1) * phaseLifeIncrement])
      .sort((a, b) => b[1] - a[1]);

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    const lineGeometry = new SphereBufferGeometry(1.7, 10, 8);
    const lineMaterial = new LineBasicMaterial({
      color: 0xdedede,
    });

    this.line = new Line(lineGeometry, lineMaterial);

    this.bBox = new Box3().setFromObject(this.object);
    this.shieldBbox = new Box3().setFromObject(this.line);

    this.velocity = new Vector3(
      MathUtils.randFloat(-1, 1),
      0,
      MathUtils.randFloat(-1, 1)
    );
  }

  takeDamage(damage) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  changePhase() {
    for (let i = 0; i < this.phasesLife.length; i++) {
      const [minLife, maxLife] = this.phasesLife[i];

      if (
        this.currentPhaseCtr !== i + 1 &&
        this.life >= minLife &&
        this.life <= maxLife
      ) {
        const randomPhase = randomArrayElement(Object.keys(BossPhases));

        this.currentPhase = BossPhases[randomPhase];

        this.currentPhaseCtr++;

        return true;
      }
    }

    return false;
  }

  update() {
    let speed =
      this.currentPhase === BossPhases.BOUNCES ? this.speed * 2 : this.speed;

    if (this.currentPhase === BossPhases.STAND_SHOOT) {
      speed = 0;
    }

    this.line.visible = this.shieldEnabled;

    const vel = this.velocity.clone().setLength(speed);

    this.object.body.velocity = new C.Vec3(vel.x, 0, vel.z);
    this.object.position.copy(this.object.body.position);

    this.bBox.setFromObject(this.object);
    this.shieldBbox.setFromObject(this.line);

    if (this.takeDamageCooldown > 0) {
      this.object.material.color.set(0xeeeeee);
    } else {
      this.object.material.color.set(0x111111);
    }

    this.object.rotation.z += 0.01;
    this.object.rotation.y += 0.05;

    this.fireCooldown--;
    this.attackCooldown--;
    this.takeDamageCooldown--;
  }

  follow(target) {
    if (this.currentPhase === BossPhases.FOLLOW_SHOOT) {
      const follow2dTarget = new Vector2(target.x, target.z);
      const pos2d = new Vector2(this.object.position.x, this.object.position.z);

      let vel = follow2dTarget.sub(pos2d);
      vel.multiplyScalar(-1);

      this.velocity.set(vel.x, 0, vel.y);
    }
  }

  isDead() {
    return this.life <= 0;
  }

  canAttack() {
    return this.attackCooldown <= 0;
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
      bulletPos.y = -1.2;

      const bullet = new EnemyBullet(
        bulletPos,
        bulletVel,
        this.bulletSpeed,
        25,
        this.damage,
        EnemyBulletTypes.RANDOM
      );

      bullets.push(bullet);
    }

    this.fireCooldown = this.fireRate;

    return bullets;
  }

  canFire() {
    const firePhases = [BossPhases.STAND_SHOOT, BossPhases.FOLLOW_SHOOT];

    return firePhases.includes(this.currentPhase) && this.fireCooldown <= 0;
  }
}
