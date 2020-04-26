import {
  TorusBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Line,
  LineBasicMaterial,
  Vector3,
  Vector2,
  Box3,
} from 'three';

import * as C from 'cannon';

import {
  PlayerBullet
} from './player-bullet';
import {
  WeaponManager
} from '../weapon-manager';
import {
  WeaponTypes
} from '../../enums/weapons-types.enum';

export class Player {
  constructor(inGameUIBottom, objectPoolManager) {
    this.inGameUIBottom = inGameUIBottom;

    this.objectPoolManager = objectPoolManager;

    this.weaponManager = new WeaponManager(inGameUIBottom);

    const geometry = new TorusBufferGeometry(4, 6.8, 3, 3, 6.3);
    const material = new MeshBasicMaterial({
      color: 0xeeeeee
    });
    const lineMaterial = new LineBasicMaterial({
      color: 0x00000
    });
    const line = new Line(geometry, lineMaterial);

    this.line = line;
    this.object = new Mesh(geometry, material);
    this.object.castShadow = true;
    this.object.scale.set(0.1, 0.05, 0.1);
    this.object.rotation.set(0, Math.PI / 2, 0);
    this.speed = 12;

    this.dashingTime = 0;
    this.dashingTimeRate = 5;

    this.dashingSpeed = 50;
    this.dashCooldown = 0;
    this.dashCooldownRate = 40;

    this.life = 100;

    this.isMouseDown = false;

    this.takeDamageCooldown = 0;
    this.takeDamageRate = 3;

    this.dir = new Vector2();

    this.velocity = new Vector3(0, 0, 0);

    this.bBox = new Box3().setFromObject(this.object);

    this.onFire = (bullet) => {};
    this.onDash = () => {};

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('keydown', ({
      key
    }) => {
      if (key === 'A' || key === 'a') {
        this.velocity.x = -1;
      } else if (key === 'D' || key === 'd') {
        this.velocity.x = 1;
      }

      if (key === 'W' || key === 'w') {
        this.velocity.z = -1;
      } else if (key === 'S' || key === 's') {
        this.velocity.z = 1;
      }
    });

    window.addEventListener('keyup', ({
      key
    }) => {
      if (key === 'A' || key === 'a') {
        this.velocity.x = 0;
      }

      if (key === 'D' || key === 'd') {
        this.velocity.x = 0;
      }

      if (key === 'W' || key === 'w') {
        this.velocity.z = 0;
      }

      if (key === 'S' || key === 's') {
        this.velocity.z = 0;
      }

      if (key === 'Shift' && this.dashCooldown <= 0) {
        this.dashingTime = this.dashingTimeRate;
        this.dashCooldown = this.dashCooldownRate;
        this.onDash();
      }

      if (key === '1') {
        this.weaponManager.setActiveWeapon(WeaponTypes.PISTOL);
      }

      if (key === '2') {
        this.weaponManager.setActiveWeapon(WeaponTypes.RIFLE);
      }

      if (key === '3') {
        this.weaponManager.setActiveWeapon(WeaponTypes.SHOTGUN);
      }

      if (key === '4') {
        this.weaponManager.setActiveWeapon(WeaponTypes.TESLA);
      }

      if (key === '5') {
        this.weaponManager.setActiveWeapon(WeaponTypes.HOMING);
      }
    });

    window.addEventListener('mousedown', () => {
      this.isMouseDown = true;
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });
  }

  takeDamage(damage) {
    this.life -= damage;
    this.takeDamageCooldown = this.takeDamageRate;
  }

  update(deltaTime) {
    const dashSpeedBoost = this.dashingTime > 0 ? this.dashingSpeed : 0;

    const vel = this.velocity.clone().setLength(dashSpeedBoost + this.speed);

    this.object.body.velocity.copy(new C.Vec3(vel.x, 0, vel.z));

    this.object.position.copy(this.object.body.position);

    this.bBox = new Box3().setFromObject(this.object);

    this.dashingTime--;
    this.dashCooldown--;
    this.fireCooldown--;
    this.weaponManager.update();

    if (this.dashCooldown >= 0) {
      const dashCooldown =
        this.dashCooldown <= 0 ?
        0 :
        (this.dashCooldown / this.dashCooldownRate) * 100;
      this.inGameUIBottom.dash = dashCooldown;
    }

    if (this.takeDamageCooldown > 0) {
      this.object.material.color.setHex(0xff2222);
    } else {
      this.object.material.color.setHex(0xeeeeee);
    }

    this.takeDamageCooldown--;

    if (this.isMouseDown && this.weaponManager.canFire()) {
      const bulletVel = this.dir.clone();

      bulletVel.normalize();

      const playerPos2d = new Vector2(
        this.object.position.x,
        this.object.position.z
      );

      const bulletPos = playerPos2d.clone().add(bulletVel);

      const bullets = this.weaponManager.fire(
        new Vector3(bulletPos.x, this.object.position.y, bulletPos.y),
        new Vector3(bulletVel.x, 0, bulletVel.y),
        this.objectPoolManager
      );

      this.onFire(bullets);
    }
  }
}