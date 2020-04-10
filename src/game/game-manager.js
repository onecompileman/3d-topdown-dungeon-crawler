import {
  Scene,
  WebGLRenderer,
  sRGBEncoding,
  ReinhardToneMapping,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Clock,
  Vector3,
  Vector2,
  Raycaster,
  Box3,
  MathUtils,
  Color,
} from 'three';

import C from 'cannon';
import { Player } from './game-objects/player';
import { ParticleSystem } from './game-objects/particle-system/particle-system';
import { ParticleTypes } from '../enums/particle-types.enum';
import { SoundManager } from './sound-manager';
import { FollowEnemy1 } from './game-objects/follow-enemy-1';
import { ScreenManager } from './screen-manager';
import { FollowEnemy2 } from './game-objects/follow-enemy-2';
import { FollowEnemy3 } from './game-objects/follow-enemy-3';
import { FollowEnemy4 } from './game-objects/follow-enemy-4';
import { WeaponTypes } from '../enums/weapons-types.enum';
import { randomArrayElement } from '../utils/random-array-element';

export class GameManager {
  constructor() {}

  async initGame() {
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initScreenManager();
    this.initSoundManager();
    await this.soundManager.loadAllAudio();

    this.initLightning();
    this.bindEvents();

    this.initWorld();

    this.initEnemies();

    this.initClock();
    this.initPlatform();
    this.initParticleSystems();
    this.initPlayer();
    this.initBullets();
    this.render();
    // this.soundManager.playAudio('weightOfTheWorld', 0.3, true);
  }

  initScreenManager() {
    this.screenManager = new ScreenManager();
  }

  initEnemies() {
    this.enemies = [];

    for (let i = 0; i < 1; i++) {
      const enemy = new FollowEnemy3(
        new Vector3(
          MathUtils.randFloat(-5, 5),
          -0.5,
          MathUtils.randFloat(-5, 5)
        ),
        100,
        1.3
      );

      // this.scene.add(enemy.line);
      if (enemy.has2ndObject) {
        this.scene.add(enemy.object2);
      }

      enemy.object.add(enemy.line);
      this.scene.add(enemy.object);

      this.addMeshToWorld(enemy.object, 20);

      this.enemies.push(enemy);
    }
  }

  updateEnemies() {
    let enemiesToAdd = [];

    this.enemies = this.enemies.filter((enemy) => {
      enemy.update();
      enemy.follow(this.player.object.position.clone());

      if (enemy.isDead()) {
        const particleSystem = new ParticleSystem(
          this.scene,
          14,
          0.1,
          200,
          70,
          enemy.object.position.clone(),
          enemy.object.material.color.clone(),
          0.5,
          new Vector3(-1, -1, -1),
          new Vector3(1, 1, 1),
          ParticleTypes.ENEMY1_EXPLODE,
          false
        );

        particleSystem.start();

        this.particleSystems.push(particleSystem);

        if (enemy.spawnsOnDeath) {
          enemiesToAdd.push(...enemy.onDeathSpawns());
        }

        this.world.remove(enemy.object.body);
        this.scene.remove(enemy.object);

        if (enemy.has2ndObject) {
          this.scene.remove(enemy.object2);
        }
      }

      return !enemy.isDead();
    });

    enemiesToAdd.forEach((e) => {
      e.object.add(e.line);
      this.scene.add(e.object);
      this.addMeshToWorld(e.object, 60);

      this.enemies.push(e);
    });
  }

  initSoundManager() {
    this.soundManager = new SoundManager();

    this.soundManager.addListenerToCamera(this.camera);
  }

  initClock() {
    this.clock = new Clock();
  }

  initWorld() {
    this.world = new C.World();
    this.world.gravity.set(0, -100, 0);
  }

  updateWorld() {
    this.world.step(1 / 60);
  }

  initParticleSystems() {
    this.particleSystems = [];
  }

  updateParticleSystems() {
    this.particleSystems = this.particleSystems.filter((pS) => {
      pS.update();

      if (pS.isDead()) {
        pS.stop();
      }
      return !pS.isDead();
    });
  }

  initPlayer() {
    this.player = new Player(this.screenManager.screens.inGameUIBottom);

    this.scene.add(this.player.object);
    this.scene.add(this.player.line);

    this.player.object.add(this.player.line);

    this.addMeshToWorld(this.player.object, 100);

    const particleTrailPos = this.player.object.position.clone(0, -0.3, 1);
    this.playerParticleTrail = new ParticleSystem(
      this.scene,
      1,
      0.03,
      200,
      100,
      particleTrailPos,
      new Color(0x000000),
      0.4,
      new Vector3(0, -0.01, 0),
      new Vector3(1, 0.01, 1),
      ParticleTypes.PLAYER_TRAIL,
      true
    );

    this.playerParticleTrail.start();

    this.particleSystems.push(this.playerParticleTrail);

    this.cameraPositionToFollow = new Vector3(
      this.player.object.position.x,
      15,
      this.player.object.position.z + 10
    );

    this.player.onFire = (bullets) => {
      this.playerBullets.push(...bullets);
      bullets.forEach((bullet) => {
        this.scene.add(bullet.object);
      });

      const particleSystem = new ParticleSystem(
        this.scene,
        5,
        0.1,
        200,
        60,
        bullets[0].object.position.clone(),
        new Color(0xef9b38),
        0.1,
        new Vector3(-1, -1, -1),
        new Vector3(1 + bullets[0].velocity.x, 1, 1 + bullets[0].velocity.z),
        ParticleTypes.PLAYER_FIRE,
        false
      );

      particleSystem.start();
      this.particleSystems.push(particleSystem);

      this.soundManager.playAudio('playerShoot');
    };

    this.player.onDash = () => {
      this.soundManager.playAudio('dash');
    };
  }

  initPlatform() {
    const geometry = new BoxBufferGeometry(30, 0.1, 30);
    const material = new MeshBasicMaterial({ color: 0x888888 });

    this.platform = new Mesh(geometry, material);
    this.platform.receiveShadow = true;
    this.platform.position.set(0, -2, 0);

    this.scene.add(this.platform);

    this.addMeshToWorld(this.platform);
  }

  initRenderer() {
    this.canvas = document.querySelector('#mainCanvas');

    this.raycaster = new Raycaster();
    this.mouse = new Vector2(0, 0);
    this.intersectPoint = new Vector3();

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x444444);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.gammaFactor = 2.2;
    // this.renderer.toneMapping = ReinhardToneMapping;
  }

  initScene() {
    this.scene = new Scene();
  }

  initCamera() {
    this.camera = new PerspectiveCamera(
      50,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      70
    );

    this.camera.rotation.set(-0.9, 0, 0);
    this.camera.position.set(0, 7, 10);

    this.scene.add(this.camera);
  }

  initBullets() {
    this.playerBullets = [];
  }

  updateBullets(deltaTime) {
    this.playerBullets = this.playerBullets.filter((b) => {
      b.update(deltaTime);

      let enemyCollided = null;

      if (b.object.position.y <= -1.5) {
        b.isCollided = true;
      }

      if (b.type === WeaponTypes.HOMING) {
        if (!this.enemies.length) {
          b.follow = null;
        } else {
          if (!b.follow) {
            const enemyToFollow = randomArrayElement(this.enemies);

            if (b.has2ndObject) {
              b.follow = enemyToFollow.object2.position.clone();
            } else {
              b.follow = enemyToFollow.object.position.clone();
            }
          }
        }
      }

      // Check enemy collision
      this.enemies.forEach((e) => {
        if (!b.isCollided && b.bBox.intersectsBox(e.bBox)) {
          b.isCollided = true;
          enemyCollided = e;
          if (!e.has2ndObject) {
            e.takeDamage(b.damage);
          }
        }
        if (e.has2ndObject) {
          if (!b.isCollided && b.bBox.intersectsBox(e.bBox2)) {
            b.isCollided = true;
            e.takeDamage(b.damage);
            enemyCollided = e;
          }
        }
      });

      if (b.isCollided) {
        if (b.type === WeaponTypes.HOMING) {
          const particleSystem = new ParticleSystem(
            this.scene,
            8,
            0.1,
            200,
            50,
            b.object.position.clone(),
            b.object.material.color.clone(),
            0.3,
            new Vector3(-1, -1, -1),
            new Vector3(1, 1, 1),
            ParticleTypes.HOMING_PLAYER_EXPLODE,
            false
          );

          particleSystem.start();

          this.particleSystems.push(particleSystem);
        } else {
          const bulletPos = b.object.position.clone();

          const particleSystem = new ParticleSystem(
            this.scene,
            5,
            0.1,
            200,
            60,
            new Vector3().copy(bulletPos),
            new Color(0x000000),
            0.1,
            new Vector3(-1 - b.velocity.x, -1, -b.velocity.z),
            new Vector3(1, 1, 1),
            ParticleTypes.PLAYER_TRAIL,
            false
          );

          particleSystem.start();

          this.particleSystems.push(particleSystem);
        }
      }

      if (b.isDead()) {
        this.scene.remove(b.object);
      }
      return !b.isDead();
    });
  }

  initLightning() {
    this.ambientLight = new AmbientLight(0xffffff, 0.5);
    this.directionalLight = new DirectionalLight(0xffffff, 0.7);
    this.directionalLight.castShadow = true;
    // this.directionalLight.position.set(10, 7, 0);

    this.scene.add(this.ambientLight).add(this.directionalLight);
  }

  onResize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.raycaster.ray.intersectBox(
      new Box3().setFromObject(this.platform),
      this.intersectPoint
    );
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });
    const delta = this.clock.getDelta();

    this.updateParticleSystems();
    this.updateCamera();
    this.updatePlayer(delta);
    this.updateBullets(delta);
    this.updateWorld();
    this.updateEnemies();

    this.renderer.render(this.scene, this.camera);
  }

  addMeshToWorld(mesh, mass = 0) {
    mesh.size = new Vector3();

    new Box3().setFromObject(mesh).getSize(mesh.size);

    const box = new C.Box(new C.Vec3().copy(mesh.size).scale(0.5));

    mesh.body = new C.Body({
      mass,
      position: new C.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
      material: new C.Material({
        friction: 0,
        restitution: 0,
      }),
    });

    mesh.body.addShape(box);
    this.world.addBody(mesh.body);
  }

  updateCamera() {
    this.camera.position.lerp(this.cameraPositionToFollow, 0.05);

    this.cameraPositionToFollow = new Vector3(
      this.player.object.position.x,
      15,
      this.player.object.position.z + 12
    );
  }

  updatePlayer(deltaTime) {
    // this.target.x += (this.mouseX - this.target.x);
    // this.target.z += (-this.mouseY - this.target.z);
    const player2dVector = new Vector2(
      this.player.object.position.x,
      this.player.object.position.z
    );

    const target = new Vector2(this.intersectPoint.x, this.intersectPoint.z);

    const dir = target.clone().sub(player2dVector);

    const oppDir = dir.clone();
    oppDir.multiplyScalar(-1).setLength(1);

    const particlePos = player2dVector.clone().add(oppDir);

    this.playerParticleTrail.setPosition(
      new Vector3(particlePos.x, this.player.object.position.y, particlePos.y)
    );
    this.playerParticleTrail.setVel(
      new Vector3(-oppDir.x * 0.05, 0, -oppDir.y * 0.05),
      new Vector3(oppDir.x * 1.3, 0.05, oppDir.y * 1.3)
    );

    this.player.object.rotation.y = -dir.angle();

    this.player.dir = dir;
    this.player.update(deltaTime);
  }
}
