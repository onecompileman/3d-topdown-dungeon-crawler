import { Room } from './room';
import { Vector3, Box3 } from 'three';
import * as C from 'cannon';
import { EnemyTypes } from '../enums/enemy-types.enum';

export class MainMenuFloor {
  constructor(options) {
    this.player = options.player;
    this.scene = options.scene;
    this.world = options.world;
    this.room = null;
  }

  initMainMenu() {
    const position = new Vector3(0, -2, 0);
    const roomIndex = 0 + '-' + 0;
    const pathWays = [];

    this.player.object.position.z = 10;

    this.room = new Room({
      ...{
        waves: 3,
        boxPositions: [],

        isBossRoom: true,
        bossStats: {
          damage: 8,
          hasShield: true,
          speed: 4.5,
          bulletsToFire: 3,
          phases: 3,
          life: 100,
        },
        enemyWaves: [
          Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
          Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
          [
            {
              type: EnemyTypes.FOLLOW_ENEMY_1,
              lifeToAdd: 20,
            },
          ],
        ],
      },
      position,
      roomIndex,
      pathWays,
      enemyStats: {
        [EnemyTypes.FOLLOW_ENEMY_1]: {
          speed: 3,
          damage: 3,
          attackRate: 20,
          life: 6,
        },
      },
      player: this.player,
      isLastRoom: false,
    });

    this.scene.add(this.room.object);
    this.addMeshToWorld(this.room.object);

    this.room.pathWayBlockers.forEach((pW) => {
      this.scene.add(pW);
      this.addMeshToWorld(pW);
    });

    this.room.boxes.forEach((box) => {
      this.scene.add(box.object);
      this.addMeshToWorld(box.object);
    });

    this.room.sideBlockers.forEach((sb) => {
      this.scene.add(sb);
      this.addMeshToWorld(sb);
    });

    this.room.generateBoss();

    this.room.bosses.forEach((boss) => {
      boss.currentPhase = 2;
      boss.object.add(boss.line);
      this.scene.add(boss.object);

      this.addMeshToWorld(boss.object, 80);
    });
  }

  destroyMainMenuFloor() {
    this.room.powerups.forEach((powerup) => {
      this.scene.remove(powerup.object);
    });

    this.room.boxes.forEach((box) => {
      this.scene.remove(box.object);
      this.world.remove(box.object.body);
    });

    this.room.pathWayBlockers.forEach((pW) => {
      this.world.remove(pW.body);
      this.scene.remove(pW);
    });

    this.room.sideBlockers.forEach((pW) => {
      this.world.remove(pW.body);
      this.scene.remove(pW);
    });

    this.room.bosses.forEach((pW) => {
      this.world.remove(pW.object.body);
      this.scene.remove(pW.object);
    });
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
