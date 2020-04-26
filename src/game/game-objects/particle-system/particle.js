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
import {
  ParticleTypes
} from '../../../enums/particle-types.enum';
import {
  randomArrayElement
} from '../../../utils/random-array-element';

export class Particle {
  constructor(position, life, color, velocity, size, type, objectPoolManager) {
    this.objectPoolManager = objectPoolManager;
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
        this.poolItem = this.objectPoolManager.allocate('playerTrailParticle');
        this.object = this.poolItem.object;

        return;
      case ParticleTypes.PLAYER_FIRE:
        this.poolItem = this.objectPoolManager.allocate('playerFire');
        this.object = this.poolItem.object;
        return;
      case ParticleTypes.ENEMY1_EXPLODE:
        this.poolItem = this.objectPoolManager.allocate('enemyExplode');
        this.object = this.poolItem.object;
        this.object.material.color.set(randomArrayElement([1, 2]) === 1 ? 0x000000 : 0x555555);
        return;
      case ParticleTypes.HOMING_PLAYER_EXPLODE:
        this.poolItem = this.objectPoolManager.allocate('homingExplode');
        this.object = this.poolItem.object;
        return;
      case ParticleTypes.ENEMY_DESTRUCTIBLE:
        this.poolItem = this.objectPoolManager.allocate('enemyDestructible');
        this.object = this.poolItem.object;
        return;
      case ParticleTypes.ENEMY_INDESTRUCTIBLE:
        this.poolItem = this.objectPoolManager.allocate('enemyInDestructible');
        this.object = this.poolItem.object;
        return;

      case ParticleTypes.LIFE:
        this.poolItem = this.objectPoolManager.allocate('lifeParticle');
        this.object = this.poolItem.object;
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