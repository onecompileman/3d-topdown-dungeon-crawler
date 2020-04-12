import {
  MeshLambertMaterial,
  Mesh,
  Box3,
  SphereBufferGeometry,
  BoxBufferGeometry,
  MathUtils,
  LineBasicMaterial,
  Line,
} from 'three';
import { ParticleTypes } from '../../../enums/particle-types.enum';

export class Particle {
  constructor(position, life, color, velocity, size, type) {
    this.createParticle(color, type, size);

    this.object.position.copy(position.clone());
    this.life = life;
    this.origLife = life;
    this.velocity = velocity.clone();
    this.bBox = new Box3(this.object);
  }

  createParticle(color, type, size) {
    let geometry, material;

    switch (type) {
      case ParticleTypes.PLAYER_TRAIL:
        geometry = new BoxBufferGeometry(size, size, size);
        material = new MeshLambertMaterial({
          color,
        });
        this.object = new Mesh(geometry, material);

        return;
      case ParticleTypes.PLAYER_FIRE:
        geometry = new BoxBufferGeometry(size, size, size);
        material = new MeshLambertMaterial({
          color,
          emissive: 0xe56c38,
          emissiveIntensity: 1,
        });
        this.object = new Mesh(geometry, material);
        return;
      case ParticleTypes.ENEMY1_EXPLODE:
        const rand = MathUtils.randInt(1, 2);
        if (rand === 1) {
          geometry = new BoxBufferGeometry(size, size, size);
          material = new MeshLambertMaterial({
            color: 0x000000,
          });

          this.object = new Mesh(geometry, material);
        } else {
          geometry = new BoxBufferGeometry(size, size, size);
          material = new MeshLambertMaterial({
            color: 0x555555,
          });

          this.object = new Mesh(geometry, material);
        }

        return;
      case ParticleTypes.HOMING_PLAYER_EXPLODE:
        geometry = new BoxBufferGeometry(size, size, size);
        material = new MeshLambertMaterial({
          color: 0xff0000,
          emissive: 0xff2222,
          emissiveIntensity: 1,
        });
        this.object = new Mesh(geometry, material);
        return;
      case ParticleTypes.ENEMY_DESTRUCTIBLE:
        geometry = new BoxBufferGeometry(size, size, size);
        material = new MeshLambertMaterial({
          color: 0xff6b00,
          emissive: 0xf24800,
          emissiveIntensity: 1,
        });
        this.object = new Mesh(geometry, material);
        return;
      case ParticleTypes.ENEMY_INDESTRUCTIBLE:
        geometry = new BoxBufferGeometry(size, size, size);
        material = new MeshLambertMaterial({
          color: 0x5b2478,
          emissive: 0x390256,
          emissiveIntensity: 1,
        });
        this.object = new Mesh(geometry, material);
        return;
    }
  }

  update() {
    this.object.position.add(this.velocity);
    const lifePercentage = this.life / this.origLife;
    this.object.scale.set(lifePercentage, lifePercentage, lifePercentage);
    this.life--;
  }

  isDead() {
    return this.life <= 0;
  }
}
