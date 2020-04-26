import {
  BoxBufferGeometry,
  MeshLambertMaterial,
  Box3,
  Mesh,
  Vector2,
  IcosahedronBufferGeometry,
  Vector3,
} from 'three';
import {
  WeaponTypes
} from '../../enums/weapons-types.enum';
import {
  Quaternion
} from 'cannon';

export class PlayerBullet {
  constructor(
    position,
    velocity,
    speed,
    maxDistance,
    damage = 1,
    type = WeaponTypes.PISTOL,
    objectPoolManager
  ) {
    this.damage = damage;
    this.type = type;

    this.objectPoolManager = objectPoolManager;

    this.createMesh();

    this.object.position.copy(position);
    this.object.castShadow = true;

    this.velocity = velocity.clone();
    this.speed = speed;
    this.startSpeed = speed / 4;
    this.maxDistance = maxDistance;
    this.distanceTravelled = 0;
    this.isCollided = false;
    this.object.rotation.y = -new Vector2(velocity.x, velocity.z).angle() + Math.PI / 2;

    this.bBox = new Box3().setFromObject(this.object);

    this.follow = null;
  }

  createMesh() {
    let geometry, material;

    switch (this.type) {
      case WeaponTypes.TESLA:
        this.poolItem = this.objectPoolManager.allocate('tesla');
        this.object = this.poolItem.object;

        break;
      case WeaponTypes.RIFLE:
        this.poolItem = this.objectPoolManager.allocate('rifle');
        this.object = this.poolItem.object;
        break;
      case WeaponTypes.SHOTGUN:
        this.poolItem = this.objectPoolManager.allocate('shotgun');
        this.object = this.poolItem.object;
        break;

      case WeaponTypes.HOMING:
        this.poolItem = this.objectPoolManager.allocate('homing');
        this.object = this.poolItem.object;
        break;

      default:
        this.poolItem = this.objectPoolManager.allocate('pistol');
        this.object = this.poolItem.object;
        break;
    }
  }

  update(deltaTime) {
    this.distanceTravelled += this.speed * deltaTime;
    this.object.position.add(this.velocity.setLength(this.speed * deltaTime));

    this.bBox = new Box3().setFromObject(this.object);

    if (this.type === WeaponTypes.HOMING && this.follow != null) {
      const desiredVel = this.follow.clone().sub(this.object.position);
      const steer = desiredVel.sub(this.velocity);
      const steerForce = 0.025;

      steer.setLength(steerForce);

      this.velocity.add(steer);

      const yAngle = -new Vector2(this.velocity.x, this.velocity.z).angle() + Math.PI / 2;
      const xAngle = new Vector2(this.velocity.z, this.velocity.y).angle();

      this.object.rotation.set(0, yAngle, xAngle);
    }

    if (this.type === WeaponTypes.TESLA) {
      this.object.rotation.x += 0.3;
      this.object.rotation.y += 0.3;
    }
  }

  isDead() {
    return this.isCollided || this.distanceTravelled >= this.maxDistance;
  }
}