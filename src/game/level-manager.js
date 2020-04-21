import { Levels } from '../data/level.data';
import { Floor } from './floor';

export class LevelManager {
  constructor(options) {
    this.player = options.player;
    this.scene = options.scene;
    this.world = options.world;
    this.mapUI = options.mapUI;

    this.levelData = Levels;

    this.activeLevelIndex = 0;
    this.activeFloorIndex = 0;

    this.activeLevelData = this.levelData[this.activeLevelIndex];
    this.enemyStats = this.activeLevelData.enemyStats;
    this.activeFloorData = this.activeLevelData.floors[this.activeFloorIndex];

    this.floor = new Floor({
      scene: options.scene,
      player: options.player,
      world: options.world,
      mapUI: options.mapUI,
      floorData: this.activeFloorData,
      enemyStats: this.enemyStats,
    });
  }

  startActiveFloor() {
    this.player.object.position.set(0, 0, 0);

    this.floor.generateRooms();
  }

  update() {
    if (this.floor.gemLife <= 0) {
      this.scene.remove(this.floor.gem);
      this.floor.destroyFloor();

      this.activeFloorIndex++;
      this.activeFloorData = this.activeLevelData.floors[this.activeFloorIndex];

      this.floor = new Floor({
        scene: this.scene,
        player: this.player,
        world: this.world,
        mapUI: this.mapUI,
        floorData: this.activeFloorData,
        enemyStats: this.enemyStats,
      });

      this.startActiveFloor();
    }
  }
}
