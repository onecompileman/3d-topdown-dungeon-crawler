import {
  Vector3,
  MathUtils
} from 'three';
import {
  Particle
} from './particle';
import {
  disposeGeometry
} from '../../../utils/dispose-geometry';

export class ParticleSystem {
  constructor(
    scene,
    count,
    speed,
    generationSpeed,
    life,
    position,
    color,
    size,
    minVel,
    maxVel,
    type,
    loop = true,
    objectPoolManager
  ) {
    this.scene = scene;
    this.count = count;
    this.speed = speed;
    this.generationSpeed = generationSpeed;
    this.life = life;
    this.position = position;
    this.color = color;
    this.size = size;
    this.minVel = minVel;
    this.maxVel = maxVel;
    this.type = type;
    this.loop = loop;
    this.objectPoolManager = objectPoolManager;

    this.particles = [];
  }

  start() {
    if (this.loop) {
      this.generationInterval = setInterval(() => {
        // console.log(this.particles);
        this.createParticles();
      }, this.generationSpeed);
    } else {
      this.createParticles();
    }
  }

  setVel(minVel, maxVel) {
    this.minVel.copy(minVel);
    this.maxVel.copy(maxVel);
  }

  stop() {
    this.particles.forEach((particle) => this.scene.remove(particle.object));
    if (this.generationInterval) {
      clearInterval(this.generationInterval);
    }
  }

  setPosition(position) {
    this.position = position.clone();
  }

  isDead() {
    return !this.loop && this.life <= 0;
  }

  createParticles() {
    for (let i = 0; i < this.count; i++) {
      const position = this.position.clone();

      const velocity = new Vector3(
        MathUtils.randFloat(this.minVel.x, this.maxVel.x),
        MathUtils.randFloat(this.minVel.y, this.maxVel.y),
        MathUtils.randFloat(this.minVel.z, this.maxVel.z)
      );
      velocity.normalize().multiplyScalar(this.speed);

      const particle = new Particle(
        position,
        this.life,
        this.color.clone(),
        velocity,
        this.size,
        this.type,
        this.objectPoolManager
      );
      // this.scene.add(particle.object);
      this.particles.push(particle);
    }
  }

  update() {
    this.particles = this.particles.filter((particle) => {
      particle.update();
      if (particle.isDead()) {
        // disposeGeometry(particle.object.geometry);
        // particle.object.material.dispose();

        // this.scene.remove(particle.object);

        this.objectPoolManager.free(particle.poolItem);
      }
      return !particle.isDead();
    });
    if (!this.loop) {
      this.life--;
    }
  }
}