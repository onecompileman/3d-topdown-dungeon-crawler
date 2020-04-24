import {
  BoxBufferGeometry,
  Vector3,
  MeshBasicMaterial,
  Mesh,
  MathUtils,
} from 'three';
import { EnemyTypes } from '../enums/enemy-types.enum';
import { FollowEnemy1 } from './game-objects/follow-enemy-1';
import { FollowEnemy2 } from './game-objects/follow-enemy-2';
import { FollowEnemy3 } from './game-objects/follow-enemy-3';
import { FollowEnemy4 } from './game-objects/follow-enemy-4';
import { Tower1 } from './game-objects/tower-1';
import { Tower2 } from './game-objects/tower-2';
import { Tower3 } from './game-objects/tower-3';
import { Boss } from './game-objects/boss';
import { Box } from './game-objects/box';

export class Room {
  constructor(options) {
    const geometry = new BoxBufferGeometry(50, 0.1, 50);
    const material = new MeshBasicMaterial({ color: 0x777777 });

    this.roomIndex = options.roomIndex || '0-0';

    this.object = new Mesh(geometry, material);
    this.object.receiveShadow = true;
    this.object.position.copy(options.position || new Vector3(0, -2, 0));
    this.object.position.y = -2;

    this.position = options.position || new Vector3(0, -2, 0);

    this.pathWays = options.pathWays || [1];

    this.waves = options.waves || 1;
    this.currentWave = 1;

    this.enemyWaves = options.enemyWaves || [];
    this.enemyTypes = options.enemyTypes || [];
    this.enemyStats = options.enemyStats || {};
    this.boxPositions = options.boxPositions || [];

    this.isLastRoom = options.isLastRoom || false;

    this.player = options.player;

    this.isBossRoom = options.isBossRoom || false;
    this.bossStats = options.bossStats;
    this.bossGenerateWaves = true;

    this.enemies = [];
    this.powerups = [];
    this.boxes = [];
    this.bosses = [];

    this.roomCleared = false;
    this.roomIsEntered = false;
    this.roomIsStarted = false;
    this.roomGeneratedWave = false;
    this.roomOpened = true;
    this.isAdded = true;

    this.isGeneratingWave = false;

    this.generateSideBlockers();
    this.generatePathways();
    this.generatePaths();
    this.generateBoxes();
  }

  generateBoxes() {
    const startXPos = this.position.x - 24;
    const startZPos = this.position.z - 24;

    this.boxes = this.boxPositions.map((boxPos) => {
      const [r, c] = boxPos.index.split('-');

      const positionX = startXPos + 3.6 * c;
      const positionZ = startZPos + 3.6 * r;

      const position = new Vector3(positionX, -0.3, positionZ);

      return new Box(position, boxPos.destructable);
    });
  }

  generateBoss() {
    this.bosses = [
      new Boss({
        position: this.position.clone(),
        ...this.bossStats,
      }),
    ];
  }

  generateWaveEnemies() {
    this.roomGeneratedWave = true;
    const enemyWaves = this.enemyWaves[this.currentWave - 1];

    if (enemyWaves) {
      enemyWaves.forEach((enemyType) => {
        const position = this.getRandomAvailableLocation();

        let enemyStats, options, type;

        if (typeof enemyType === 'object') {
          type = enemyType.type;
          enemyStats = this.enemyStats[enemyType.type];

          options = {
            position,
            ...enemyStats,
            spawnLife: true,
            lifeToAdd: enemyType.lifeToAdd,
          };
        } else {
          type = enemyType;

          enemyStats = this.enemyStats[enemyType];

          options = {
            position,
            ...enemyStats,
          };
        }

        const enemy = this.generateWaveEnemy(type, options);

        this.enemies.push(enemy);
      });
    }
  }

  getRandomAvailableLocation() {
    const minX = this.position.x - 23;
    const maxX = this.position.x + 23;

    const minY = this.position.z - 23;
    const maxY = this.position.z + 23;

    let position;

    let positionIsNotAvailable = false;

    // Ensures that the enemy position is not too close to the player and to other enemies
    do {
      position = new Vector3(
        MathUtils.randFloat(minX, maxX),
        -1.2,
        MathUtils.randFloat(minY, maxY)
      );

      positionIsNotAvailable =
        positionIsNotAvailable ||
        this.player.object.position.distanceTo(position) <= 3;

      if (!positionIsNotAvailable) {
        const collidedWithEnemies = this.enemies.some((enemy) => {
          return position.distanceTo(enemy.object.position) <= 1.2;
        });

        positionIsNotAvailable = positionIsNotAvailable || collidedWithEnemies;
      }

      if (!positionIsNotAvailable) {
        const collidedWithBoxes = this.boxes.some((box) => {
          return position.distanceTo(box.object.position) <= 3;
        });

        positionIsNotAvailable = positionIsNotAvailable || collidedWithBoxes;
      }
    } while (positionIsNotAvailable);

    return position;
  }

  generateWaveEnemy(type, options) {
    switch (type) {
      case EnemyTypes.FOLLOW_ENEMY_1:
      case EnemyTypes.SHOOT_ENEMY_1:
        return new FollowEnemy1(options);
      case EnemyTypes.FOLLOW_ENEMY_2:
      case EnemyTypes.SHOOT_ENEMY_2:
        return new FollowEnemy2(options);
      case EnemyTypes.FOLLOW_ENEMY_3:
      case EnemyTypes.SHOOT_ENEMY_3:
        return new FollowEnemy3(options);
      case EnemyTypes.FOLLOW_ENEMY_4:
      case EnemyTypes.SHOOT_ENEMY_4:
        return new FollowEnemy4(options);
      case EnemyTypes.TOWER_1:
        return new Tower1(options);
      case EnemyTypes.TOWER_2:
        return new Tower2(options);
      case EnemyTypes.TOWER_3:
        return new Tower3(options);
    }
  }

  pathWaysToOpen() {
    if (this.isAdded === false) {
      return [];
    }
    this.isAdded = false;
    return this.pathWays.map((p) => this.pathWayBlockers[p]);
  }

  pathWaysToClose() {
    if (this.isAdded === true) {
      return [];
    }

    this.isAdded = true;
    return this.pathWays.map((p) => this.pathWayBlockers[p]);
  }

  checkEntered(target) {
    const enteredDistance = 18;
    if (this.position.distanceTo(target) <= enteredDistance) {
      this.roomIsEntered = true;
      return true;
    }

    return false;
  }

  generatePaths() {
    this.paths = [];
    const pathLength = 10;
    const pathWidth = 8;
    const blockerWidth = 2.5;

    if (this.pathWays.includes(0)) {
      const topPath = this.createBlocker(
        new Vector3(
          this.position.x,
          this.position.y,
          this.position.z - 25 - pathLength / 2
        ),
        new Vector3(pathWidth, 0.1, pathLength)
      );

      this.paths.push(topPath);

      const blockerSide1 = this.createBlocker(
        new Vector3(
          this.position.x - pathWidth / 2,
          this.position.y,
          this.position.z - 25 - pathLength / 2
        ),
        new Vector3(blockerWidth, blockerWidth, pathLength)
      );

      const blockerSide2 = this.createBlocker(
        new Vector3(
          this.position.x + pathWidth / 2,
          this.position.y,
          this.position.z - 25 - pathLength / 2
        ),
        new Vector3(blockerWidth, blockerWidth, pathLength)
      );

      this.sideBlockers.push(blockerSide1, blockerSide2);
    }

    if (this.pathWays.includes(1)) {
      const rightPath = this.createBlocker(
        new Vector3(
          this.position.x + 25 + pathLength / 2,
          this.position.y,
          this.position.z
        ),
        new Vector3(pathLength, 0.1, pathWidth)
      );
      this.paths.push(rightPath);

      const blockerSide1 = this.createBlocker(
        new Vector3(
          this.position.x + 25 + pathLength / 2,
          this.position.y,
          this.position.z - pathWidth / 2
        ),
        new Vector3(pathLength, blockerWidth, blockerWidth)
      );

      const blockerSide2 = this.createBlocker(
        new Vector3(
          this.position.x + 25 + pathLength / 2,
          this.position.y,
          this.position.z + pathWidth / 2
        ),
        new Vector3(pathLength, blockerWidth, blockerWidth)
      );

      this.sideBlockers.push(blockerSide1, blockerSide2);
    }

    if (this.pathWays.includes(2)) {
      const bottomPath = this.createBlocker(
        new Vector3(
          this.position.x,
          this.position.y,
          this.position.z + 25 + pathLength / 2
        ),
        new Vector3(pathWidth, 0.1, pathLength)
      );

      this.paths.push(bottomPath);

      const blockerSide1 = this.createBlocker(
        new Vector3(
          this.position.x - pathWidth / 2,
          this.position.y,
          this.position.z + 25 + pathLength / 2
        ),
        new Vector3(blockerWidth, blockerWidth, pathLength)
      );

      const blockerSide2 = this.createBlocker(
        new Vector3(
          this.position.x + pathWidth / 2,
          this.position.y,
          this.position.z + 25 + pathLength / 2
        ),
        new Vector3(blockerWidth, blockerWidth, pathLength)
      );

      this.sideBlockers.push(blockerSide1, blockerSide2);
    }

    if (this.pathWays.includes(3)) {
      const leftPath = this.createBlocker(
        new Vector3(
          this.position.x - 25 - pathLength / 2,
          this.position.y,
          this.position.z
        ),
        new Vector3(pathLength, 0.1, pathWidth)
      );

      this.paths.push(leftPath);

      const blockerSide1 = this.createBlocker(
        new Vector3(
          this.position.x - 25 - pathLength / 2,
          this.position.y,
          this.position.z - pathWidth / 2
        ),
        new Vector3(pathLength, blockerWidth, blockerWidth)
      );

      const blockerSide2 = this.createBlocker(
        new Vector3(
          this.position.x - 25 - pathLength / 2,
          this.position.y,
          this.position.z + pathWidth / 2
        ),
        new Vector3(pathLength, blockerWidth, blockerWidth)
      );

      this.sideBlockers.push(blockerSide1, blockerSide2);
    }

    this.paths.forEach((path) => {
      path.material.color.set(0x777777);
    });
  }

  generateSideBlockers() {
    this.sideBlockers = [];
    const sideBlockerLength = 21;
    const pathWayLength = 8;
    const sideBlockerWidth = 2.5;

    // Top Blockers
    const topLeftBlocker = this.createBlocker(
      new Vector3(
        this.position.x -
          pathWayLength / 2 -
          sideBlockerLength / 2 -
          sideBlockerWidth / 2,
        this.position.y,
        this.position.z - 25 - sideBlockerWidth / 2
      ),
      new Vector3(
        sideBlockerLength + sideBlockerWidth,
        sideBlockerWidth,
        sideBlockerWidth
      )
    );

    const topRightBlocker = this.createBlocker(
      new Vector3(
        this.position.x +
          pathWayLength / 2 +
          sideBlockerLength / 2 +
          sideBlockerWidth / 2,
        this.position.y,
        this.position.z - 25 - sideBlockerWidth / 2
      ),
      new Vector3(
        sideBlockerLength + sideBlockerWidth,
        sideBlockerWidth,
        sideBlockerWidth
      )
    );

    // Bottom Blockers
    const bottomLeftBlocker = this.createBlocker(
      new Vector3(
        this.position.x -
          pathWayLength / 2 -
          sideBlockerLength / 2 -
          sideBlockerWidth / 2,
        this.position.y,
        this.position.z + 25 + sideBlockerWidth / 2
      ),
      new Vector3(
        sideBlockerLength + sideBlockerWidth,
        sideBlockerWidth,
        sideBlockerWidth
      )
    );

    const bottomRightBlocker = this.createBlocker(
      new Vector3(
        this.position.x +
          pathWayLength / 2 +
          sideBlockerLength / 2 +
          sideBlockerWidth / 2,
        this.position.y,
        this.position.z + 25 + sideBlockerWidth / 2
      ),
      new Vector3(
        sideBlockerLength + sideBlockerWidth,
        sideBlockerWidth,
        sideBlockerWidth
      )
    );

    // Left Blockers
    const leftTopBlocker = this.createBlocker(
      new Vector3(
        this.position.x - 25 - sideBlockerWidth / 2,
        this.position.y,
        this.position.z - pathWayLength / 2 - sideBlockerLength / 2
      ),
      new Vector3(sideBlockerWidth, sideBlockerWidth, sideBlockerLength)
    );

    const leftBottomBlocker = this.createBlocker(
      new Vector3(
        this.position.x - 25 - sideBlockerWidth / 2,
        this.position.y,
        this.position.z + pathWayLength / 2 + sideBlockerLength / 2
      ),
      new Vector3(sideBlockerWidth, sideBlockerWidth, sideBlockerLength)
    );

    // Right Blockers
    const rightTopBlocker = this.createBlocker(
      new Vector3(
        this.position.x + 25 + sideBlockerWidth / 2,
        this.position.y,
        this.position.z - pathWayLength / 2 - sideBlockerLength / 2
      ),
      new Vector3(sideBlockerWidth, sideBlockerWidth, sideBlockerLength)
    );

    const rightBottomBlocker = this.createBlocker(
      new Vector3(
        this.position.x + 25 + sideBlockerWidth / 2,
        this.position.y,
        this.position.z + pathWayLength / 2 + sideBlockerLength / 2
      ),
      new Vector3(sideBlockerWidth, sideBlockerWidth, sideBlockerLength)
    );

    this.sideBlockers = [
      topLeftBlocker,
      topRightBlocker,
      bottomLeftBlocker,
      bottomRightBlocker,
      leftTopBlocker,
      leftBottomBlocker,
      rightTopBlocker,
      rightBottomBlocker,
    ];
  }

  generatePathways() {
    this.pathWayBlockers = [];

    const pathWayLength = 8.2;
    const pathWayWidth = 2.5;

    const topPathWay = this.createBlocker(
      new Vector3(
        this.position.x,
        this.position.y,
        this.position.z - 25 - pathWayWidth / 2
      ),
      new Vector3(pathWayLength, pathWayWidth, pathWayWidth)
    );

    const rightPathWay = this.createBlocker(
      new Vector3(
        this.position.x + 25 + pathWayWidth / 2,
        this.position.y,
        this.position.z
      ),
      new Vector3(pathWayWidth, pathWayWidth, pathWayLength)
    );

    const bottomPathWay = this.createBlocker(
      new Vector3(
        this.position.x,
        this.position.y,
        this.position.z + 25 + pathWayWidth / 2
      ),
      new Vector3(pathWayLength, pathWayWidth, pathWayWidth)
    );

    const leftPathWay = this.createBlocker(
      new Vector3(
        this.position.x - 25 - pathWayWidth / 2,
        this.position.y,
        this.position.z
      ),
      new Vector3(pathWayWidth, pathWayWidth, pathWayLength)
    );

    this.pathWayBlockers = [
      topPathWay,
      rightPathWay,
      bottomPathWay,
      leftPathWay,
    ];
  }

  createBlocker(position, size) {
    const geometry = new BoxBufferGeometry(size.x, size.y, size.z);
    const material = new MeshBasicMaterial({ color: 0x555555 });

    const object = new Mesh(geometry, material);
    object.position.copy(position);

    return object;
  }

  update() {}
}
