import {
  BoxBufferGeometry,
  MeshLambertMaterial,
  Box3,
  Mesh,
  Vector2,
  IcosahedronBufferGeometry,
  Vector3,
  SphereBufferGeometry,
} from 'three';
import { WeaponTypes } from '../../enums/weapons-types.enum';
import { Quaternion } from 'cannon';
import { EnemyBulletTypes } from '../../enums/enemy-bullet-types.enum';
import { randomArrayElement } from '../../utils/random-array-element';

export class EnemyBullet {
  constructor(
    position,
    velocity,
    speed,
    maxDistance,
    damage = 1,
    bulletType = EnemyBulletTypes.DESTRUCTIBLE
  ) {
    this.damage = damage;
    this.type =
      bulletType == EnemyBulletTypes.RANDOM
        ? randomArrayElement([
            EnemyBulletTypes.INDESTRUCTIBLE,
            EnemyBulletTypes.DESTRUCTIBLE,
          ])
        : bulletType;

    this.createMesh();

    this.object.position.copy(position);
    this.object.castShadow = true;

    this.velocity = velocity.clone();
    this.speed = speed;
    this.maxDistance = maxDistance;
    this.distanceTravelled = 0;
    this.isCollided = false;
    this.object.rotation.y =
      -new Vector2(velocity.x, velocity.z).angle() + Math.PI / 2;

    this.bBox = new Box3().setFromObject(this.object);

    this.follow = null;
  }

  createMesh() {
    let geometry, material;

    switch (this.type) {
      case EnemyBulletTypes.DESTRUCTIBLE:
        geometry = new SphereBufferGeometry(0.3, 9, 9, 0, 6.3, 0, 3.1);
        material = new MeshLambertMaterial({
          color: 0xee5a00,
          emissive: 0xe13700,
          emissiveIntensity: 1,
        });

        this.object = new Mesh(geometry, material);
        break;
      case EnemyBulletTypes.INDESTRUCTIBLE:
        geometry = new SphereBufferGeometry(0.3, 9, 9, 0, 6.3, 0, 3.1);
        material = new MeshLambertMaterial({
          color: 0x5b2478,
          emissive: 0x390256,
          emissiveIntensity: 1,
        });

        this.object = new Mesh(geometry, material);
        break;
    }
  }

  update(deltaTime) {
    this.distanceTravelled += this.speed * deltaTime;
    this.object.position.add(this.velocity.setLength(this.speed * deltaTime));
    this.bBox = new Box3().setFromObject(this.object);
  }

  isDead() {
    return this.isCollided || this.distanceTravelled >= this.maxDistance;
  }
}
