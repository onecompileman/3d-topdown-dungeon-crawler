import {
  BoxBufferGeometry,
  MeshLambertMaterial,
  Box3,
  Mesh,
  Vector2,
  IcosahedronBufferGeometry,
  Vector3,
} from 'three';
import { WeaponTypes } from '../../enums/weapons-types.enum';
import { Quaternion } from 'cannon';

export class PlayerBullet {
  constructor(
    position,
    velocity,
    speed,
    maxDistance,
    damage = 1,
    type = WeaponTypes.PISTOL
  ) {
    this.damage = damage;
    this.type = type;

    this.createMesh();

    this.object.position.copy(position);
    this.object.castShadow = true;

    this.velocity = velocity.clone();
    this.speed = speed;
    this.startSpeed = speed / 4;
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
      case WeaponTypes.TESLA:
        geometry = new IcosahedronBufferGeometry(0.5, 0);
        material = new MeshLambertMaterial({
          color: 0x107758,
          emissive: 0xba77,
          emissiveIntensity: 1,
        });

        this.object = new Mesh(geometry, material);

        break;
      case WeaponTypes.RIFLE:
        geometry = new BoxBufferGeometry(0.14, 0.14, 0.5);
        material = new MeshLambertMaterial({
          color: 0x4499ff,
          emissive: 0x55aaff,
          emissiveIntensity: 1,
        });

        this.object = new Mesh(geometry, material);
        break;
      case WeaponTypes.SHOTGUN:
        geometry = new BoxBufferGeometry(0.14, 0.14, 0.45);
        material = new MeshLambertMaterial({
          color: 0xff6666,
          emissive: 0xff3333,
          emissiveIntensity: 2,
        });

        this.object = new Mesh(geometry, material);
        break;

      case WeaponTypes.HOMING:
        geometry = new BoxBufferGeometry(0.22, 0.22, 0.55);
        material = new MeshLambertMaterial({
          color: 0xdedede,
          emissive: 0xff22ff,
          emissiveIntensity: 1,
        });

        this.object = new Mesh(geometry, material);
        break;

      default:
        geometry = new BoxBufferGeometry(0.15, 0.15, 0.45);
        material = new MeshLambertMaterial({
          color: 0xef9b38,
          emissive: 0xe56c38,
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

    if (this.type === WeaponTypes.HOMING && this.follow != null) {
      const desiredVel = this.follow.clone().sub(this.object.position);
      const steer = desiredVel.sub(this.velocity);
      const steerForce = 0.025;

      steer.setLength(steerForce);

      this.velocity.add(steer);

      const yAngle =
        -new Vector2(this.velocity.x, this.velocity.z).angle() + Math.PI / 2;
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
