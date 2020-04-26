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
import {
  WeaponTypes
} from '../../enums/weapons-types.enum';
import {
  Quaternion
} from 'cannon';
import {
  EnemyBulletTypes
} from '../../enums/enemy-bullet-types.enum';
import {
  randomArrayElement
} from '../../utils/random-array-element';

export class EnemyBullet {
  constructor(
    position,
    velocity,
    speed,
    maxDistance,
    damage = 1,
    bulletType = EnemyBulletTypes.DESTRUCTIBLE,
    objectPoolManager
  ) {
    this.damage = damage;
    this.type =
      bulletType == EnemyBulletTypes.RANDOM ?
      randomArrayElement([
        EnemyBulletTypes.INDESTRUCTIBLE,
        EnemyBulletTypes.DESTRUCTIBLE,
      ]) :
      bulletType;

    this.objectPoolManager = objectPoolManager;
    this.createMesh();

    this.object.position.copy(position);
    this.object.castShadow = true;

    this.velocity = velocity.clone();
    this.speed = speed;
    this.maxDistance = maxDistance;
    this.distanceTravelled = 0;
    this.isCollided = false;
    this.object.rotation.y = -new Vector2(velocity.x, velocity.z).angle() + Math.PI / 2;

    this.bBox = new Box3().setFromObject(this.object);

    this.follow = null;
  }

  createMesh() {

    this.poolItem = this.type === EnemyBulletTypes.INDESTRUCTIBLE ? this.objectPoolManager.allocate('enemyBulletInDestructable') : this.objectPoolManager.allocate('enemyBulletDestructable');

    this.object = this.poolItem.object;
  };

  update(deltaTime) {
    this.distanceTravelled += this.speed * deltaTime;
    this.object.position.add(this.velocity.setLength(this.speed * deltaTime));
    this.bBox = new Box3().setFromObject(this.object);
  }

  isDead() {
    return this.isCollided || this.distanceTravelled >= this.maxDistance;
  }
}