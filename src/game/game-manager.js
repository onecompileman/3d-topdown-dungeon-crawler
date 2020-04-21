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
  Quaternion,
  Euler,
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
import { EnemyBulletTypes } from '../enums/enemy-bullet-types.enum';
import { Tower1 } from './game-objects/tower-1';
import { Tower2 } from './game-objects/tower-2';
import { Tower3 } from './game-objects/tower-3';
import { Boss } from './game-objects/boss';
import { Floor } from './floor';
import { LevelManager } from './level-manager';
import { BossPhases } from '../enums/boss-phases.enum';
import { Life } from './power-ups/life';
import { MainMenuFloor } from './main-menu-floor';

export class GameManager {
  constructor() {}

  async initGame() {
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initScreenManager();
    this.initSoundManager();
    await this.soundManager.loadAllAudio(
      this.screenManager.screens.loadingScreen
    );

    this.screenManager.hideAllScreens();
    this.screenManager.showScreen('mainMenu');

    this.initLightning();
    this.bindEvents();

    this.initWorld();

    this.initBosses();

    this.initEnemies();

    this.initClock();
    // this.initPlatform();
    this.initParticleSystems();
    this.initPlayer();
    this.initMainMenu();
    this.initBullets();
    this.render();
    // this.initLevelManager();
    this.isPlaying = false;
    // this.soundManager.playAudio('weightOfTheWorld', 0.3, true);
  }

  initScreenManager() {
    this.screenManager = new ScreenManager();

    const mainMenu = this.screenManager.screens.mainMenu;
    const aboutScreen = this.screenManager.screens.aboutScreen;
    const loadGame = this.screenManager.screens.loadGame;

    aboutScreen.closeCallback = () => {
      this.screenManager.hideAllScreens();
      this.screenManager.showScreen('mainMenu');
    };

    loadGame.backCallback = () => {
      this.screenManager.hideAllScreens();
      this.screenManager.showScreen('mainMenu');
    };

    mainMenu.aboutCallback = () => {
      this.screenManager.hideAllScreens();
      this.screenManager.showScreen('aboutScreen');
    };

    mainMenu.loadGameCallback = () => {
      this.screenManager.hideAllScreens();
      this.screenManager.showScreen('loadGame');
    };
  }

  play() {
    this.initLevelManager();
  }

  initLevelManager() {
    this.levelManager = new LevelManager({
      player: this.player,
      scene: this.scene,
      world: this.world,
      mapUI: this.screenManager.screens.inGameMapUI,
    });

    this.levelManager.startActiveFloor();
  }

  updateLevelManager() {
    if (this.levelManager) {
      this.levelManager.update();
      this.levelManager.floor.update();
    }
  }

  initMainMenu() {
    this.mainMenuFloor = new MainMenuFloor({
      player: this.player,
      scene: this.scene,
      world: this.world,
    });

    this.mainMenuFloor.initMainMenu();

    this.mainMenuBullets = [];
  }

  updateMainMenu(deltaTime) {
    this.mainMenuFloor.room.bosses.forEach((boss) => {
      boss.update();

      if (boss.canFire()) {
        const bullets = boss.fire();
        bullets.forEach((b) => {
          this.scene.add(b.object);
        });

        this.mainMenuBullets.push(...bullets);
      }
    });

    this.mainMenuBullets = this.mainMenuBullets.filter((b) => {
      b.update(deltaTime);

      if (b.isDead()) {
        this.scene.remove(b.object);

        return false;
      }

      return true;
    });
  }

  initBosses() {
    this.bosses = [];

    // const boss = new Boss(new Vector3(0, 0, 0));

    // this.scene.add(boss.line);
    // boss.object.add(boss.line);

    // this.scene.add(boss.object);

    // this.addMeshToWorld(boss.object, 80);

    // this.bosses.push(boss);
  }

  updateBosses() {
    let bossesToAdd = [];
    if (this.levelManager && this.levelManager.floor) {
      this.levelManager.floor.currentRoom.bosses = this.levelManager.floor.currentRoom.bosses.filter(
        (enemy) => {
          enemy.update();

          enemy.follow(this.player.object.position.clone());
          // console.log(enemy.currentPhase);

          if (enemy.currentPhase === BossPhases.BOUNCES) {
            let hasCollided = false;
            let toAdjust = null;

            hasCollided =
              hasCollided ||
              this.levelManager.floor.currentRoom.sideBlockers.some((sB, i) => {
                // const obj = sb.clone();

                const bBox = new Box3().setFromObject(sB);

                const shield = enemy.object.clone();
                shield.scale.set(1.3, 1.3, 1.3);

                const shieldBbox = new Box3().setFromObject(shield);

                if (bBox.intersectsBox(shieldBbox)) {
                  toAdjust = i <= 3 ? 'z' : 'x';

                  return true;
                }

                return false;
              });

            if (!hasCollided) {
              hasCollided =
                hasCollided ||
                this.levelManager.floor.currentRoom.pathWayBlockers.some(
                  (pW, i) => {
                    const bBox = new Box3().setFromObject(pW);

                    const shield = enemy.object.clone();
                    shield.scale.set(1.3, 1.3, 1.3);

                    const shieldBbox = new Box3().setFromObject(shield);

                    if (bBox.intersectsBox(shieldBbox)) {
                      toAdjust = i === 0 || i === 2 ? 'z' : 'x';

                      return true;
                    }

                    return false;
                  }
                );
            }

            if (!hasCollided) {
              hasCollided =
                hasCollided ||
                this.levelManager.floor.currentRoom.boxes.some((box, i) => {
                  const shield = enemy.object.clone();
                  shield.scale.set(1.3, 1.3, 1.3);

                  const shieldBbox = new Box3().setFromObject(shield);

                  if (box.bBox.intersectsBox(shieldBbox)) {
                    const boxIntersect = box.bBox.intersect(shieldBbox);

                    let intersectSize = new Vector3();

                    boxIntersect.getSize(intersectSize);

                    toAdjust = intersectSize.z < intersectSize.x ? 'z' : 'x';

                    return true;
                  }

                  return false;
                });
            }

            if (hasCollided && enemy.bouncedCooldown <= 0) {
              enemy.bouncedCooldown = enemy.bouncedRate;
              if (toAdjust === 'x') {
                enemy.velocity.x = -enemy.velocity.x;
              } else {
                enemy.velocity.z = -enemy.velocity.z;
              }
            }
          }

          if (enemy.onTouchAttack) {
            if (
              enemy.canAttack() &&
              this.player.bBox.intersectsBox(enemy.bBox)
            ) {
              this.player.takeDamage(enemy.damage);
              enemy.attackCooldown = enemy.attackRate;
              this.screenManager.screens.inGameUITop.life = this.player.life;
            }
          }

          if (enemy.canFire()) {
            const bullets = enemy.fire();
            bullets.forEach((b) => {
              this.scene.add(b.object);
            });
            this.enemyBullets.push(...bullets);
          }

          if (enemy.isDead()) {
            const particleSystem = new ParticleSystem(
              this.scene,
              20,
              0.1,
              200,
              80,
              enemy.object.position.clone(),
              enemy.object.material.color.clone(),
              0.8,
              new Vector3(-1, -1, -1),
              new Vector3(1, 1, 1),
              ParticleTypes.ENEMY1_EXPLODE,
              false
            );

            particleSystem.start();

            this.particleSystems.push(particleSystem);

            if (enemy.spawnsOnDeath) {
              bossesToAdd.push(...enemy.onDeathSpawns());
            }

            if (enemy.spawnLife) {
              const life = new Life(
                enemy.object.position.clone(),
                enemy.lifeToAdd
              );

              this.scene.add(life);

              this.levelManager.floor.currentRoom.powerups.push(life);
            }

            this.world.remove(enemy.object.body);
            this.scene.remove(enemy.object);
            this.scene.remove(enemy.line);
          }

          return !enemy.isDead();
        }
      );
    }

    bossesToAdd.forEach((e) => {
      e.object.add(e.line);
      this.scene.add(e.object);
      this.addMeshToWorld(e.object, 60);

      this.levelManager.floor.currentRoom.bosses.push(e);
    });
  }

  updatePowerups() {
    if (
      this.levelManager &&
      this.levelManager.floor &&
      this.levelManager.floor.currentRoom
    ) {
      this.levelManager.floor.currentRoom.powerups = this.levelManager.floor.currentRoom.powerups.filter(
        (powerup) => {
          powerup.update();

          if (this.player.bBox.intersectsBox(powerup.bBox)) {
            this.player.life = MathUtils.clamp(
              this.player.life + powerup.plusLife,
              0,
              100
            );

            this.scene.remove(powerup.object);

            const particleSystem = new ParticleSystem(
              this.scene,
              14,
              0.1,
              200,
              80,
              powerup.object.position.clone(),
              new Color(0xffffff),
              0.4,
              new Vector3(-1, -1, -1),
              new Vector3(1, 1, 1),
              ParticleTypes.LIFE,
              false
            );

            particleSystem.start();

            this.screenManager.screens.inGameUITop.life = this.player.life;

            this.particleSystems.push(particleSystem);

            return false;
          }

          return true;
        }
      );
    }
  }

  updateBoxes() {
    if (
      this.levelManager &&
      this.levelManager.floor &&
      this.levelManager.floor.currentRoom
    ) {
      this.levelManager.floor.currentRoom.boxes = this.levelManager.floor.currentRoom.boxes.filter(
        (box) => {
          box.update();

          if (box.isDead()) {
            this.scene.remove(box.object);
            this.world.remove(box.object.body);

            const particleSystem = new ParticleSystem(
              this.scene,
              14,
              0.1,
              200,
              70,
              box.object.position.clone(),
              box.object.material.color.clone(),
              0.5,
              new Vector3(-1, -1, -1),
              new Vector3(1, 1, 1),
              ParticleTypes.ENEMY1_EXPLODE,
              false
            );

            particleSystem.start();

            this.particleSystems.push(particleSystem);

            return false;
          }

          return true;
        }
      );
    }
  }

  initEnemies() {}

  updateEnemies() {
    let enemiesToAdd = [];
    if (
      this.levelManager &&
      this.levelManager.floor.currentRoom &&
      this.levelManager.floor.currentRoom.enemies
    ) {
      this.levelManager.floor.currentRoom.enemies = this.levelManager.floor.currentRoom.enemies.filter(
        (enemy) => {
          enemy.update();

          enemy.follow(this.player.object.position.clone());

          if (enemy.onTouchAttack) {
            if (
              enemy.canAttack() &&
              this.player.bBox.intersectsBox(enemy.bBox)
            ) {
              this.player.takeDamage(enemy.damage);
              enemy.attackCooldown = enemy.fireRate;
              this.screenManager.screens.inGameUITop.life = this.player.life;
            }
          }

          if (enemy.enemySpawn) {
            if (enemy.canSpawnEnemy()) {
              const e = enemy.spawnEnemy();
              this.addMeshToWorld(e.object, 30);
              this.scene.add(e.line);
              e.object.add(e.line);
              this.scene.add(e.object);
              enemiesToAdd.push(e);
            }
          }

          if (enemy.canFire()) {
            const bullets = enemy.fire();
            bullets.forEach((b) => {
              this.scene.add(b.object);
            });
            this.enemyBullets.push(...bullets);
          }

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

            if (enemy.spawnLife) {
              const life = new Life(
                enemy.object.position.clone(),
                enemy.lifeToAdd
              );

              this.scene.add(life.object);

              this.levelManager.floor.currentRoom.powerups.push(life);
            }

            this.world.remove(enemy.object.body);
            this.scene.remove(enemy.object);

            if (enemy.shields) {
              enemy.shields.forEach((s) => {
                this.scene.remove(s);
              });
            }

            if (enemy.has2ndObject) {
              this.scene.remove(enemy.object2);
            }
          }

          return !enemy.isDead();
        }
      );
    }

    enemiesToAdd.forEach((e) => {
      e.object.add(e.line);
      this.scene.add(e.object);
      this.addMeshToWorld(e.object, 60);

      this.levelManager.floor.currentRoom.enemies.push(e);
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

    const particleTrailPos = this.player.object.position.clone(0, -0.3, 9);

    particleTrailPos.z = 9.5;

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

    this.directionalLight.lookAt(this.player.object);
  }

  initPlatform() {
    const geometry = new BoxBufferGeometry(50, 0.1, 50);
    const material = new MeshBasicMaterial({ color: 0x777777 });

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
      60
    );

    this.camera.rotation.set(-0.9, 0, 0);
    this.camera.position.set(0, 7, 10);

    this.scene.add(this.camera);
  }

  initBullets() {
    this.playerBullets = [];
    this.enemyBullets = [];
  }

  updateBullets(deltaTime) {
    this.enemyBullets = this.enemyBullets.filter((b) => {
      b.update(deltaTime);

      this.levelManager.floor.currentRoom.boxes.forEach((box) => {
        b.isCollided = b.isCollided || box.bBox.intersectsBox(b.bBox);
      });

      this.levelManager.floor.currentRoom.sideBlockers.forEach((sB) => {
        const bBox = new Box3().setFromObject(sB);

        b.isCollided = b.isCollided || bBox.intersectsBox(b.bBox);
      });

      this.levelManager.floor.currentRoom.pathWayBlockers.forEach((sB) => {
        const bBox = new Box3().setFromObject(sB);

        b.isCollided = b.isCollided || bBox.intersectsBox(b.bBox);
      });

      if (b.type === EnemyBulletTypes.DESTRUCTIBLE) {
        this.playerBullets.forEach((pB) => {
          if (
            !b.isCollided &&
            !pB.isCollided &&
            pB.bBox.intersectsBox(b.bBox)
          ) {
            b.isCollided = true;
            pB.isCollided = true;
          }
        });
      }

      if (!b.isCollided) {
        if (this.player.bBox.intersectsBox(b.bBox)) {
          // console.log('here', this.player.bBox);
          b.isCollided = true;
          this.player.takeDamage(b.damage);

          this.screenManager.screens.inGameUITop.life = this.player.life;
        }
      }

      if (b.isCollided) {
        const particleSystem = new ParticleSystem(
          this.scene,
          9,
          0.1,
          200,
          60,
          b.object.position.clone(),
          b.object.material.color.clone(),
          0.3,
          new Vector3(-1 - b.velocity.x, -1, -1 - b.velocity.z),
          new Vector3(1, 1, 1),
          b.type === EnemyBulletTypes.DESTRUCTIBLE
            ? ParticleTypes.ENEMY_DESTRUCTIBLE
            : ParticleTypes.ENEMY_INDESTRUCTIBLE,
          false
        );

        particleSystem.start();

        this.particleSystems.push(particleSystem);
      }

      if (b.isDead()) {
        this.scene.remove(b.object);
      }

      return !b.isDead();
    });

    this.playerBullets = this.playerBullets.filter((b) => {
      b.update(deltaTime);

      let enemyCollided = null;

      this.levelManager.floor.currentRoom.boxes.forEach((box) => {
        if (box.bBox.intersectsBox(b.bBox)) {
          b.isCollided = true;

          if (box.destructable) {
            box.life--;
            box.takeDamage = box.takeDamageRate;

            // console.log('here');
          }
        }
      });

      if (this.levelManager.floor.gem) {
        if (this.levelManager.floor.gemBbox.intersectsBox(b.bBox)) {
          this.levelManager.floor.gemLife--;
          b.isCollided = true;
        }
      }

      this.levelManager.floor.currentRoom.sideBlockers.forEach((sB) => {
        const bBox = new Box3().setFromObject(sB);

        b.isCollided = b.isCollided || bBox.intersectsBox(b.bBox);
      });

      this.levelManager.floor.currentRoom.pathWayBlockers.forEach((sB) => {
        const bBox = new Box3().setFromObject(sB);

        b.isCollided = b.isCollided || bBox.intersectsBox(b.bBox);
      });

      if (b.object.position.y <= -1.5) {
        b.isCollided = true;
      }

      if (b.type === WeaponTypes.HOMING) {
        if (!this.levelManager.floor.currentRoom.enemies.length) {
          b.follow = null;
        } else {
          if (!b.follow) {
            const isBoss =
              this.levelManager.floor.currentRoom.enemies.length === 0
                ? true
                : MathUtils.randInt(0, 1);
            const enemyToFollow = isBoss
              ? randomArrayElement(this.bosses)
              : randomArrayElement(this.levelManager.floor.currentRoom.enemies);
            if (enemyToFollow) {
              if (enemyToFollow.has2ndObject) {
                b.follow = enemyToFollow.object2.position.clone();
              } else {
                b.follow = enemyToFollow.object.position.clone();
              }
            }
          }
        }
      }

      this.levelManager.floor.currentRoom.bosses.forEach((boss) => {
        if (!b.isCollided) {
          if (boss.shieldEnabled && boss.shieldBbox.intersectsBox(b.bBox)) {
            b.isCollided = true;
          } else if (!boss.shieldEnabled && boss.bBox.intersectsBox(b.bBox)) {
            boss.takeDamage(b.damage);
            b.isCollided = true;
          }
        }
      });

      // Check enemy collision
      this.levelManager.floor.currentRoom.enemies.forEach((e) => {
        if (e.shields) {
          e.shieldBbox.forEach((sB) => {
            if (sB.intersectsBox(b.bBox)) {
              b.isCollided = true;
            }
          });
        }

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
    if (this.levelManager && this.levelManager.floor) {
      this.mouse.x = (event.clientX / innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.raycaster.ray.intersectBox(
        new Box3().setFromObject(this.levelManager.floor.roomAllPlatforms),
        this.intersectPoint
      );
    }
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });
    const delta = this.clock.getDelta();

    this.updateParticleSystems();

    this.updateCamera();
    if (this.isPlaying) {
      this.updateBosses();
      this.updatePlayer(delta);
      this.updateBullets(delta);
      this.updateBoxes();
      this.updateLevelManager();
      this.updatePowerups();
      this.updateEnemies();
    } else {
      this.updateMainMenu(delta);
    }
    this.updateWorld();

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
      19,
      this.player.object.position.z + 16
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
