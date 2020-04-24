import { randomArrayElement } from '../utils/random-array-element';
import { Room } from './room';
import {
  Vector3,
  Object3D,
  SphereBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Box3,
  Color,
  LineBasicMaterial,
  Line,
} from 'three';
import * as C from 'cannon';

export class Floor {
  constructor(options) {
    this.player = options.player;
    this.scene = options.scene;
    this.world = options.world;
    this.mapUI = options.mapUI;

    this.floorData = options.floorData;
    this.enemyStats = options.enemyStats;
    this.bossStats = options.bossStats;

    this.gem = null;
    this.gemBbox = null;
    this.gemLife = 15;
    this.gemTakeDamage = 0;
    this.gemTakeDamageRate = 3;

    this.damageTaken = 0;
    this.bulletsFired = 0;
    this.bulletsHit = 0;

    this.roomAllPlatforms = new Object3D();

    this.currentRoom = null;

    this.rooms = [];

    this.roomGrid = [
      [[], 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.roomCount = this.floorData.rooms.length;
  }

  generateRooms() {
    let r = 0;
    let c = 0;
    let previousChoice = null;
    let roomsFilled = 1;

    let roomIndexes = ['0-0'];

    while (roomsFilled < this.roomCount) {
      let choices = [0, 1, 2, 3];
      if (r === 0) {
        choices = this.removeItemArray(choices, 0);
      }

      if (c === 0) {
        choices = this.removeItemArray(choices, 3);
      }

      if (r === 2) {
        choices = this.removeItemArray(choices, 2);
      }

      if (c === 2) {
        choices = this.removeItemArray(choices, 1);
      }

      if (previousChoice != null) {
        const oppChoice = this.getOppositeChoice(previousChoice);

        choices = this.removeItemArray(choices, oppChoice);
      }

      const randomChoice = (previousChoice = randomArrayElement(choices));
      if (!this.roomGrid[r][c].find((i) => i === randomChoice)) {
        this.roomGrid[r][c].push(randomChoice);
      }
      const rC = this.getChoiceRowCol(r, c, randomChoice);
      const oppRandomChoice = this.getOppositeChoice(randomChoice);

      r = rC.r;
      c = rC.c;

      if (this.roomGrid[r][c] === 0) {
        this.roomGrid[r][c] = [];

        roomIndexes.push(`${r}-${c}`);

        roomsFilled++;
      }

      if (!this.roomGrid[r][c].find((i) => i === oppRandomChoice)) {
        this.roomGrid[r][c].push(oppRandomChoice);
      }
    }

    this.roomGrid.forEach((r, rI) => {
      r.forEach((c, cI) => {
        if (c !== 0) {
        const position = new Vector3(cI * 70, -2, rI * 70);
        const roomIndex = rI + '-' + cI;
        const pathWays = c;

        const index = roomIndexes.indexOf(`${rI}-${cI}`);

        const room = new Room({
          ...this.floorData.rooms[index],
          position,
          roomIndex,
          pathWays,
          enemyStats: this.enemyStats,
          player: this.player,
          isLastRoom: index === this.roomCount - 1,
        });

        this.scene.add(room.object);
        this.addMeshToWorld(room.object);

        this.roomAllPlatforms.add(room.object.clone());

        room.pathWayBlockers.forEach((pW) => {
          this.scene.add(pW);
          this.addMeshToWorld(pW);

          this.roomAllPlatforms.add(pW.clone());
        });

        room.boxes.forEach((box) => {
          this.scene.add(box.object);
          this.addMeshToWorld(box.object);

          this.roomAllPlatforms.add(box.object.clone());
        });

        room.sideBlockers.forEach((sb) => {
          this.scene.add(sb);
          this.addMeshToWorld(sb);

          this.roomAllPlatforms.add(sb.clone());
        });

        room.paths.forEach((p) => {
          this.scene.add(p);
          this.addMeshToWorld(p);

          this.roomAllPlatforms.add(p.clone());
        });

        this.rooms.push(room);
        }
      });
    });

    this.currentRoom = this.rooms[0];
    this.mapUI.updateMap(this.roomGrid);
    this.mapUI.updatePlayerLocation(r, c);
  }

  removeItemArray(arr, item) {
    const index = arr.findIndex((i) => i === item);
    if (index !== -1) {
      arr.splice(index, 1);
    }

    return arr;
  }

  destroyFloor() {
    this.rooms.forEach((room) => {
      this.world.remove(room.object.body);
      this.scene.remove(room.object);

      room.powerups.forEach((powerup) => {
        this.scene.remove(powerup.object);
      });

      room.boxes.forEach((box) => {
        this.scene.remove(box.object);
        this.world.remove(box.object.body);
      });

      room.pathWayBlockers.forEach((pW) => {
        this.world.remove(pW.body);
        this.scene.remove(pW);
      });

      room.sideBlockers.forEach((pW) => {
        this.world.remove(pW.body);
        this.scene.remove(pW);
      });

      room.paths.forEach((pW) => {
        this.world.remove(pW.body);
        this.scene.remove(pW);
      });
    });
  }

  update() {
    this.rooms.forEach((room) => {
      if (
        this.currentRoom !== room.roomIndex &&
        room.checkEntered(this.player.object.position.clone())
      ) {
        this.currentRoom = room;

        const [r, c] = room.roomIndex.split('-');

        this.mapUI.updatePlayerLocation(r, c);
      }

      const pathWays = room.roomOpened
        ? room.pathWaysToOpen()
        : room.pathWaysToClose();

      pathWays.forEach((pW) => {
        this.scene.remove(pW);

        this.world.remove(pW.body);
      });
    });

    // Update currently active room

    if (
      this.currentRoom &&
      this.currentRoom.roomCleared &&
      !this.currentRoom.roomOpened &&
      this.currentRoom.isAdded
    ) {
      this.currentRoom.roomOpened = true;

      const pathWaysToRemove = this.currentRoom.pathWaysToOpen();

      pathWaysToRemove.forEach((pathWay) => {
        this.scene.remove(pathWay);
        this.world.remove(pathWay.body);
      });
    }

    if (
      this.currentRoom &&
      !this.currentRoom.roomCleared &&
      this.currentRoom.roomIsEntered &&
      !this.currentRoom.isStarted
    ) {
      this.currentRoom.isStarted = true;
      this.currentRoom.roomOpened = false;

      const pathWaysToAdd = this.currentRoom.pathWaysToClose();

      pathWaysToAdd.forEach((pathWay) => {
        this.scene.add(pathWay);
        this.world.add(pathWay.body);
      });

      this.currentRoom.generateWaveEnemies();

      this.currentRoom.enemies.forEach((enemy) => {
        if (enemy.has2ndObject) {
          this.scene.add(enemy.object2);
        }

        enemy.object.add(enemy.line);
        this.scene.add(enemy.object);

        this.addMeshToWorld(enemy.object, 20);
      });
      if (this.currentRoom.isBossRoom) {
        this.currentRoom.generateBoss();

        this.currentRoom.bosses.forEach((boss) => {
          boss.object.add(boss.line);
          this.scene.add(boss.object);

          this.addMeshToWorld(boss.object, 80);
        });
      }
    }

    if (
      this.currentRoom &&
      this.currentRoom.isStarted &&
      !this.currentRoom.enemies.length
    ) {
      if (this.currentRoom.isBossRoom) {
        if (
          this.currentRoom.bosses.length &&
          !this.currentRoom.enemies.length &&
          !this.currentRoom.bosses[0].spawnsOnDeath
        ) {
          const boss = this.currentRoom.bosses[0];

          if (boss.shieldEnabled) {
            boss.shieldEnabled = false;
          } else if (this.currentRoom.bosses[0].changePhase()) {
            boss.shieldEnabled = true;
            this.currentRoom.currentWave++;
            this.currentRoom.generateWaveEnemies();

            this.currentRoom.enemies.forEach((enemy) => {
              if (enemy.has2ndObject) {
                this.scene.add(enemy.object2);
              }

              enemy.object.add(enemy.line);
              this.scene.add(enemy.object);

              this.addMeshToWorld(enemy.object, 20);
            });
          }
        }

        if (!this.currentRoom.bosses.length) {
          if (!this.currentRoom.roomCleared && this.currentRoom.isLastRoom) {
            this.currentRoom.roomOpened = true;

            const geometry = new SphereBufferGeometry(1.5, 7, 2);
            const material = new MeshLambertMaterial({
              color: 0xc1ff,
              emissive: 0x361b60,
            });

            const lineMaterial = new LineBasicMaterial({
              color: 0x222222,
            });

            const line = new Line(geometry, lineMaterial);

            // if (this.currentRoom.isLastRoom) {
            this.gem = new Mesh(geometry, material);
            this.gem.position.copy(this.currentRoom.position);
            this.gem.position.y = -0.6;

            this.gemBbox = new Box3().setFromObject(this.gem);

            this.gemLife = 15;

            this.scene.add(line);

            this.gem.add(line);

            this.scene.add(this.gem);
          }
          this.currentRoom.roomCleared = true;
        }
      } else {
        if (this.currentRoom.currentWave < this.currentRoom.waves && !this.currentRoom.isGeneratingWave) {
          this.currentRoom.isGeneratingWave = true;
          this.currentRoom.currentWave++;
          console.log('here1');
          this.currentRoom.generateWaveEnemies();

          this.currentRoom.enemies.forEach((enemy) => {
            if (enemy.has2ndObject) {
              this.scene.add(enemy.object2);
            }

            enemy.object.add(enemy.line);
            this.scene.add(enemy.object);

            this.addMeshToWorld(enemy.object, 20);
          });

          console.log('here1');


          setTimeout(() => {
            this.currentRoom.isGeneratingWave = false;
          }, 200);
        } else {
          if (!this.currentRoom.roomCleared && this.currentRoom.isLastRoom) {
            this.currentRoom.roomOpened = true;

            const geometry = new SphereBufferGeometry(1.5, 7, 2);
            const material = new MeshLambertMaterial({
              color: 0xc1ff,
              emissive: 0x361b60,
            });

            const lineMaterial = new LineBasicMaterial({
              color: 0x222222,
            });

            const line = new Line(geometry, lineMaterial);

            // if (this.currentRoom.isLastRoom) {
            this.gem = new Mesh(geometry, material);
            this.gem.position.copy(this.currentRoom.position);
            this.gem.position.y = -0.6;

            this.gemBbox = new Box3().setFromObject(this.gem);

            this.gemLife = 15;

            this.scene.add(line);

            this.gem.add(line);

            this.scene.add(this.gem);
          }
          this.currentRoom.roomCleared = true;
        }
      }
    }

    if (this.gem) {
      this.gem.rotation.y += 0.03;

      if (this.gemTakeDamage > 0) {
        this.gem.material.color.set(new Color(0xdd2222));
      } else {
        this.gem.material.color.set(new Color(0xc1ff));
      }
    }

    this.gemTakeDamage--;
  }

  getChoiceRowCol(r, c, choice) {
    switch (choice) {
      case 0:
        return {
          r: r - 1,
          c,
        };
      case 1:
        return {
          r,
          c: c + 1,
        };
      case 2:
        return {
          r: r + 1,
          c,
        };
      case 3:
        return {
          r,
          c: c - 1,
        };
      default:
        return null;
    }
  }

  getOppositeChoice(choice) {
    switch (choice) {
      case 0:
        return 2;
      case 1:
        return 3;
      case 2:
        return 0;
      case 3:
        return 1;
      default:
        return null;
    }
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
}
