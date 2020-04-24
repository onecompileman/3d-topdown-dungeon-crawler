import {
  Levels
} from '../data/level.data';
import {
  Floor
} from './floor';
import {
  GameStateService
} from '../services/game-state.service';
import {
  computeRatingByPercentage
} from '../utils/compute-rating-by-percentage';

export class LevelManager {
  constructor(options) {
    this.player = options.player;
    this.scene = options.scene;
    this.world = options.world;
    this.mapUI = options.mapUI;
    this.screenManager = options.screenManager;

    this.levelData = Levels;

    this.gameState = new GameStateService();

    this.activeSlotName = options.activeSlotName || 'saveSlot1';
    this.activeLevelIndex = options.activeLevelIndex || 0;
    this.activeFloorIndex = options.activeFloorIndex || 0;

    this.floorCleared = false;

    this.isGameOver = false;

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

    this.onFloorCleared = () => {};
    this.onFloorResumed = () => {};
    this.onQuit = () => {};
  }

  startActiveFloor() {
    this.player.object.body.position.set(0, 1, 0);
    this.player.life = 100;
    this.floorCleared = false;

    this.screenManager.screens.inGameUITop.level = `${
      this.activeLevelIndex + 1
    }-${this.activeFloorIndex + 1}`;

    this.floor.generateRooms();
  }

  update() {
    if (this.player.life <= 0 && !this.isGameOver) {
      this.isGameOver = true;

      const areYouSure = this.screenManager.screens.areYouSure;

      areYouSure.message = `Game over!! Do you want to restart the floor?`;
      areYouSure.confirmCallback = () => {
        this.startActiveFloor();
      };

      areYouSure.cancelCallback = () => {
        this.onQuit();
      };
    }

    if (this.floor.gemLife <= 0 && !this.floorCleared) {
      const damagePercentage = Math.abs(this.floor.damageTaken - 150) / 150;
      const accuracyPercentage =
        this.floor.bulletsHit / this.floor.bulletsFired;

      const percentage = ((damagePercentage + accuracyPercentage) / 2) * 100;

      const floorSaveData = {
        rating: computeRatingByPercentage(percentage),
        damageTaken: this.floor.damageTaken,
        bulletsFired: this.floor.bulletsFired,
        bulletsHit: this.floor.bulletsHit,
        level: this.activeLevelIndex + 1,
        floor: this.activeFloorIndex + 1,
      };

      this.onFloorCleared();

      if (this.activeFloorData.weaponUnlocked) {
        this.gameState.saveWeapons(
          this.activeFloorData.weaponUnlocked,
          this.activeSlotName
        );
      }

      this.gameState.saveFloor(floorSaveData, this.activeSlotName);

      this.screenManager.hideAllScreens();
      this.screenManager.showScreen('floorCleared');

      const floorCleared = this.screenManager.screens.floorCleared;

      floorCleared.floorData = floorSaveData;
      floorCleared.weaponUnlocked = this.activeFloorData.weaponUnlocked;

      floorCleared.nextCallback = () => {
        this.scene.remove(this.floor.gem);
        this.floor.destroyFloor();

        this.activeFloorIndex++;
        this.activeFloorData = this.activeLevelData.floors[
          this.activeFloorIndex
        ];

        this.player.object.body.position.set(0, 1, 0);

        this.floor = new Floor({
          scene: this.scene,
          player: this.player,
          world: this.world,
          mapUI: this.mapUI,
          floorData: this.activeFloorData,
          enemyStats: this.enemyStats,
        });

        this.startActiveFloor();

        this.screenManager.hideAllScreens();
        this.screenManager.showScreen('inGameUITop');
        this.screenManager.showScreen('inGameUIBottom');
        this.screenManager.showScreen('inGameMapUI');
        this.onFloorResumed();
      };
    }
  }
}