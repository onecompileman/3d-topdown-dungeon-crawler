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
  constructor(options) {
    const geometry = new SphereBufferGeometry(1.3, 12, 9);
    const material = new MeshLambertMaterial({
      color: 0x111111,
    });

    this.options = options;

    this.object = new Mesh(geometry, material);

    this.object.position.copy(options.position || new Vector3(0, 0, 0));
    this.object.position.y = -1.2;

    this.life = options.life || 130;
    this.damage = options.damage || 8;
    this.phases = options.phases || 1;

    this.spawnsOnDeath = options.spawnsOnDeath || false;
    this.spawns = options.spawns || false;
    this.spawnLevel = options.spawnLevel || 2;
    this.hasShield = options.hasShield || false;
    this.shieldEnabled = options.hasShield || false;
    this.speed = options.speed || 4.5;

    this.fireCooldown = options.fireRate || 15;
    this.fireRate = options.fireRate || 15;
    this.bulletSpeed = options.bulletSpeed || 14;
    this.bulletsToFire = options.bulletsToFire || 1;

    this.attackCooldown = 0;
    this.attackRate = options.attackRate || 20;
    this.onTouchAttack = true;

    this.bouncedCooldown = 0;
    this.bouncedRate = 20;

    this.spawnLife = options.spawnLife || false;
    this.lifeToAdd = options.lifeToAdd || 0;

    const randomPhase = randomArrayElement(Object.keys(BossPhases));
    this.currentPhase = BossPhases[randomPhase];

    // this.currentPhase = 1;

    this.currentPhaseCtr = 1;
    const phaseLifeIncrement = this.life / (this.phases + 1);
    this.phasesLife = Array(this.phases)
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

    this.velocity = new Vector3(1, 0, 1);

    this.onChangeCurrentPhase = () => {};
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
        this.life > minLife &&
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

    const obj = this.object.clone();
    obj.scale.set(0.75, 0.75, 0.75);

    const lineObj = this.line.clone();
    // console.log(lineObj.scale);

    this.bBox.setFromObject(obj);
    this.shieldBbox.setFromObject(obj);

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
    this.bouncedCooldown--;
  }

  onDeathSpawns() {
    let enemies = [];
    if (this.spawnLevel > 1) {
      for (let i = 0; i < this.spawns; i++) {
        const position = this.object.position;

        const enemy = new Boss({
          ...this.options,
          position,
          life: this.life / 2,
          speed: this.speed + 1.8,
          spawns: this.spawns * 2,
          spawnLevel: this.spawnLevel - 1,
        });

        enemies.push(enemy);
      }
    }
    return enemies;
  }

  follow(target) {
    if (this.currentPhase === BossPhases.FOLLOW_SHOOT) {
      const follow2dTarget = new Vector2(target.x, target.z);
      const pos2d = new Vector2(this.object.position.x, this.object.position.z);

      let vel = follow2dTarget.sub(pos2d);
      // vel.multiplyScalar(-1);

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
