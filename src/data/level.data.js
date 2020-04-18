import { EnemyTypes } from '../enums/enemy-types.enum';

export const Levels = [
  {
    level: 1,
    enemyStats: {
      [EnemyTypes.FOLLOW_ENEMY_1]: {
        speed: 3,
        damage: 3,
        attackRate: 20,
        life: 6,
      },
      [EnemyTypes.SHOOT_ENEMY_1]: {
        speed: 3,
        damage: 5,
        attackRate: 20,
        life: 4,
        canShoot: true,
        fireDistance: 18,
        fireRate: 80,
        bulletSpeed: 11,
      },
      [EnemyTypes.SHOOT_ENEMY_3]: {
        speed: 2,
        damage: 7,
        attackRate: 20,
        life: 25,
        spawnLevel: 3,
        scale: 1.3,
        spawns: 2,
      },
    },
    floors: [
      {
        floor: 1,
        rooms: [
          {
            waves: 3,
            boxPositions: [
              { index: '2-2', destructable: true },
              { index: '2-3', destructable: false },
              { index: '3-2', destructable: false },
              { index: '3-3', destructable: false },
            ],

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
              // Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
            ],
          },
          {
            waves: 2,
            enemyWaves: [
              Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
              Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
            ],
          },
          {
            waves: 3,
            enemyWaves: [
              Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
              Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
              Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
            ],
          },
        ],
      },
      {
        floor: 2,
        rooms: [
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(8).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
        ],
      },
      {
        floor: 3,
        rooms: [
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(7).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(7).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(1).fill(EnemyTypes.FOLLOW_ENEMY_3),
              ],
            ],
          },
        ],
      },
    ],
  },
];
