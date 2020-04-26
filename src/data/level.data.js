import {
  EnemyTypes
} from '../enums/enemy-types.enum';
import {
  randomArrayElement
} from '../utils/random-array-element';
import {
  BoxPositions
} from './box-positions';
import {
  EnemyBulletTypes
} from '../enums/enemy-bullet-types.enum';

export const Levels = [{
    level: 1,
    enemyStats: {
      [EnemyTypes.FOLLOW_ENEMY_1]: {
        speed: 3,
        damage: 3,
        attackRate: 20,
        life: 4,
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
        scale: 0.9,
        spawns: 2,
      },
    },
    floors: [{
        floor: 1,
        rooms: [{
            waves: 2,
            // boxPositions: [
            //   { index: '2-2', destructable: true },
            //   { index: '2-3', destructable: false },
            //   { index: '3-2', destructable: false },
            //   { index: '3-3', destructable: false },
            // ],

            // isBossRoom: true,
            // bossStats: {
            //   damage: 8,
            //   hasShield: true,
            //   speed: 4.5,
            //   bulletsToFire: 3,
            //   phases: 3,
            //   life: 100,
            // },
            enemyWaves: [
              Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              // [
              //   {
              //     type: EnemyTypes.FOLLOW_ENEMY_1,
              //     lifeToAdd: 20,
              //   },
              // ],
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
        rooms: [{
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
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
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
        weaponUnlocked: 1,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
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
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(1).fill(EnemyTypes.FOLLOW_ENEMY_3),
              ],
            ],
          },
        ],
      },
      {
        floor: 4,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
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
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(4).fill({
                  type: EnemyTypes.SHOOT_ENEMY_1,
                  lifeToAdd: 10,
                }),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(1).fill(EnemyTypes.FOLLOW_ENEMY_3),
              ],
            ],
          },
        ],
      },
      {
        floor: 5,
        rooms: [{
            waves: 3,
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
            ],
          },
          {
            waves: 4,
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_1,
                  lifeToAdd: 15,
                }),
              ],
              [
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_1,
                  lifeToAdd: 15,
                }),
              ],
            ],
          },
          {
            waves: 1,
            enemyWaves: [
              [
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(4).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_1,
                  lifeToAdd: 20,
                }),
              ]
            ],
          },
          {
            waves: 2,
            boxPositions: [{
                index: '2-2',
                destructable: false
              },
              {
                index: '2-5',
                destructable: false
              },
              {
                index: '2-8',
                destructable: false
              },
              {
                index: '2-11',
                destructable: false
              },
              {
                index: '5-2',
                destructable: false
              },
              {
                index: '5-5',
                destructable: false
              },
              {
                index: '5-8',
                destructable: false
              },
              {
                index: '5-11',
                destructable: false
              },
              {
                index: '8-2',
                destructable: false
              },
              {
                index: '8-5',
                destructable: false
              },
              {
                index: '8-8',
                destructable: false
              },
              {
                index: '8-11',
                destructable: false
              },
              {
                index: '11-2',
                destructable: false
              },
              {
                index: '11-5',
                destructable: false
              },
              {
                index: '11-8',
                destructable: false
              },
              {
                index: '11-11',
                destructable: false
              },
            ],

            isBossRoom: true,
            bossStats: {
              damage: 8,
              hasShield: true,
              speed: 4.5,
              bulletsToFire: 2,
              phases: 3,
              life: 250,
            },
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_1,
                  lifeToAdd: 15,
                }),
              ],
            ]
          }
        ],
      },
    ],
  },
  {
    level: 2,
    enemyStats: {
      [EnemyTypes.FOLLOW_ENEMY_1]: {
        speed: 3.5,
        damage: 4,
        attackRate: 20,
        life: 5,
      },
      [EnemyTypes.SHOOT_ENEMY_1]: {
        speed: 3,
        damage: 6,
        attackRate: 20,
        life: 5,
        canShoot: true,
        fireDistance: 18,
        fireRate: 80,
        bulletSpeed: 11,
      },
      [EnemyTypes.SHOOT_ENEMY_3]: {
        speed: 2.5,
        damage: 7,
        attackRate: 20,
        life: 35,
        spawnLevel: 3,
        scale: 0.9,
        spawns: 2,
      },
      [EnemyTypes.FOLLOW_ENEMY_4]: {
        speed: 3.2,
        damage: 4,
        attackRate: 20,
        life: 5,
      },
      [EnemyTypes.SHOOT_ENEMY_4]: {
        speed: 3.2,
        damage: 4,
        attackRate: 20,
        life: 5,
        canShoot: true
      },
      [EnemyTypes.TOWER_1]: {
        life: 30,
        damage: 7,
        bulletsToFire: 2
      }
    },
    floors: [{
        floor: 1,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(6).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                EnemyTypes.SHOOT_ENEMY_3,
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
            ]
          }
        ]
      }, {
        floor: 2,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
            ]
          }
        ]
      },
      {
        floor: 3,
        rooms: [{
            waves: 3,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_4),
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
            ]
          }, {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(6).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ]
            ]
          }
        ]
      },
      {
        floor: 4,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(1).fill(EnemyTypes.TOWER_1),
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1)
              ],
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4),
                {
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 50
                }
              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
            ]
          }, {
            waves: 2,
            enemyWaves: [
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                EnemyTypes.SHOOT_ENEMY_3,
                ...Array(6).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ]
            ]
          }
        ]
      },
      {
        floor: 4,
        weaponUnlocked: 2,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(1).fill(EnemyTypes.TOWER_1),
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(5).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_1)
              ],
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(3).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(3).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4),
                {
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 50
                }
              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
            ]
          }, {
            waves: 4,
            isBossRoom: true,
            bossStats: {
              damage: 8,
              hasShield: true,
              speed: 4.8,
              bulletsToFire: 3,
              phases: 4,
              life: 450,
            },
            enemyWaves: [
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(1).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 30
                })
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                })
              ],
              [
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                })
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    level: 3,
    enemyStats: {
      [EnemyTypes.FOLLOW_ENEMY_1]: {
        speed: 3.8,
        damage: 5,
        attackRate: 20,
        life: 6,
      },
      [EnemyTypes.SHOOT_ENEMY_1]: {
        speed: 3,
        damage: 6,
        attackRate: 20,
        life: 5,
        canShoot: true,
        fireDistance: 18,
        fireRate: 80,
        bulletSpeed: 11,
      },
      [EnemyTypes.SHOOT_ENEMY_2]: {
        life: 40,
        damage: 7,
        fireRate: 13,
        bulletsToFire: 3,
        canShoot: true
      },
      [EnemyTypes.SHOOT_ENEMY_3]: {
        speed: 3,
        damage: 7,
        attackRate: 20,
        life: 45,
        spawnLevel: 3,
        scale: 0.9,
        spawns: 2,
      },
      [EnemyTypes.FOLLOW_ENEMY_4]: {
        speed: 3.5,
        damage: 4,
        attackRate: 20,
        life: 5,
      },
      [EnemyTypes.SHOOT_ENEMY_4]: {
        speed: 3.2,
        damage: 4,
        attackRate: 20,
        life: 5,
        canShoot: true
      },
      [EnemyTypes.TOWER_1]: {
        life: 40,
        damage: 7,
        fireRate: 13,
        bulletsToFire: 3
      },
      [EnemyTypes.TOWER_2]: {
        life: 30,
        damage: 7,
        fireRate: 13,
        bulletsToFire: 3,
        shields: 2
      }
    },
    floors: [{
        floor: 1,
        rooms: [{
            waves: 3,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                })
              ],
            ]
          },

          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(1).fill(EnemyTypes.TOWER_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                }),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
              [
                ...Array(1).fill(EnemyTypes.TOWER_2),
                ...Array(1).fill(EnemyTypes.TOWER_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1)
              ]
            ]
          }
        ]
      },
      {
        floor: 2,
        rooms: [{
            waves: 3,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                })
              ],
            ]
          },

          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(1).fill(EnemyTypes.TOWER_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
          {
            waves: 3,
            boxPositions: [],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                }),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
              [
                ...Array(1).fill(EnemyTypes.TOWER_2),
                ...Array(1).fill(EnemyTypes.TOWER_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1)

              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_1),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
        ]
      },
      {
        floor: 3,
        rooms: [{
            waves: 3,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                })
              ],
            ]
          },

          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
          {
            waves: 3,
            boxPositions: [],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                }),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1)
              ],
              [
                ...Array(1).fill(EnemyTypes.TOWER_2),
                ...Array(1).fill(EnemyTypes.TOWER_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1)

              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_1),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 20
                }),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_1),
                EnemyTypes.SHOOT_ENEMY_3
              ]
            ]
          },
        ]
      },
      {
        floor: 4,
        weaponUnlocked: 3,
        rooms: [{
            waves: 3,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                })
              ],
            ]
          },

          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
          {
            waves: 3,
            boxPositions: [],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                }),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1)
              ],
              [
                ...Array(1).fill(EnemyTypes.TOWER_2),
                ...Array(1).fill(EnemyTypes.TOWER_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1)

              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_1),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
          {
            waves: 2,
            boxPositions: [],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 20
                }),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ]
            ]
          }, {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 20
                }),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.SHOOT_ENEMY_2
              ]
            ]
          }
        ]
      },
      {
        floor: 5,
        rooms: [{
            waves: 3,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                })
              ],
            ]
          },

          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
          {
            waves: 3,
            boxPositions: [],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.SHOOT_ENEMY_4,
                  lifeToAdd: 10
                }),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1)
              ],
              [
                ...Array(1).fill(EnemyTypes.TOWER_2),
                ...Array(1).fill(EnemyTypes.TOWER_1),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1)

              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_1),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 20
                }),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ]
            ]
          }, {
            waves: 3,
            boxPositions: [],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 20
                }),
                ...Array(5).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 20
                }),
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1)
              ]
            ]
          },
          {
            waves: 4,
            isBossRoom: true,
            bossStats: {
              damage: 8,
              hasShield: true,
              speed: 4.8,
              bulletsToFire: 3,
              phases: 4,
              life: 550,
            },
            enemyWaves: [
              [
                [
                  ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                  ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1)
                ],
                [
                  ...Array(4).fill(EnemyTypes.SHOOT_ENEMY_1),
                  ...Array(2).fill({
                    type: EnemyTypes.TOWER_1,
                    lifeToAdd: 20
                  }),
                ],
                [
                  ...Array(2).fill({
                    type: EnemyTypes.TOWER_2,
                    lifeToAdd: 20
                  }),
                  ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                  ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ],
                [
                  ...Array(2).fill({
                    type: EnemyTypes.TOWER_2,
                    lifeToAdd: 20
                  }),
                  ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                  ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ]
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    level: 4,
    enemyStats: {
      [EnemyTypes.FOLLOW_ENEMY_1]: {
        speed: 4.2,
        damage: 6,
        attackRate: 20,
        life: 10,
      },
      [EnemyTypes.SHOOT_ENEMY_1]: {
        speed: 3.5,
        damage: 6,
        attackRate: 20,
        life: 7,
        canShoot: true,
        fireDistance: 18,
        fireRate: 60,
        bulletSpeed: 11,
        bulletType: EnemyBulletTypes.RANDOM
      },
      [EnemyTypes.SHOOT_ENEMY_2]: {
        life: 100,
        damage: 7,
        fireRate: 13,
        bulletsToFire: 4,
        canShoot: true
      },
      [EnemyTypes.SHOOT_ENEMY_3]: {
        speed: 3.4,
        damage: 7,
        attackRate: 20,
        life: 45,
        spawnLevel: 3,
        scale: 0.9,
        spawns: 2,
      },
      [EnemyTypes.FOLLOW_ENEMY_4]: {
        speed: 3.5,
        damage: 4,
        attackRate: 20,
        life: 5,
      },
      [EnemyTypes.SHOOT_ENEMY_4]: {
        speed: 3.2,
        damage: 4,
        attackRate: 20,
        life: 5,
        canShoot: true,
        bulletType: EnemyBulletTypes.RANDOM
      },
      [EnemyTypes.TOWER_1]: {
        life: 80,
        damage: 10,
        fireRate: 13,
        bulletsToFire: 3
      },
      [EnemyTypes.TOWER_2]: {
        life: 80,
        damage: 10,
        fireRate: 13,
        bulletsToFire: 3,
        shields: 2
      },
      [EnemyTypes.TOWER_3]: {
        life: 80,
        damage: 10,
        fireRate: 13,
        bulletsToFire: 1
      }
    },
    floors: [{
        floor: 1,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          }
        ]
      },
      {
        floor: 2,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.FOLLOW_ENEMY_3,
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          }
        ]
      },
      {
        floor: 3,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.FOLLOW_ENEMY_3,
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.SHOOT_ENEMY_2,
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          }
        ]
      },
      {
        floor: 4,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.FOLLOW_ENEMY_3,
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ],
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ],
              [
                EnemyTypes.SHOOT_ENEMY_2,
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                })
              ]
            ]
          }
        ]
      },
      {
        floor: 5,
        weaponUnlocked: 4,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.FOLLOW_ENEMY_3,
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ],
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 1,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            isBossRoom: true,
            bossStats: {
              damage: 14,
              hasShield: false,
              speed: 5.2,
              bulletsToFire: 3,
              spawnsOnDeath: true,
              spawnLevel: 3,
              spawns: 2,
              phases: 4,
              life: 450,
            },
            enemyWaves: [
              ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
              ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
              ...Array(2).fill({
                type: EnemyTypes.TOWER_3,
                lifeToAdd: 20
              })
            ]
          }
        ]
      }
    ]
  },
  {
    level: 4,
    enemyStats: {
      [EnemyTypes.FOLLOW_ENEMY_1]: {
        speed: 4.5,
        damage: 6,
        attackRate: 20,
        life: 20,
      },
      [EnemyTypes.SHOOT_ENEMY_1]: {
        speed: 3.8,
        damage: 6,
        attackRate: 20,
        life: 15,
        canShoot: true,
        fireDistance: 18,
        fireRate: 60,
        bulletSpeed: 11,
        bulletType: EnemyBulletTypes.RANDOM
      },
      [EnemyTypes.SHOOT_ENEMY_2]: {
        life: 150,
        damage: 12,
        fireRate: 13,
        bulletsToFire: 4,
        canShoot: true
      },
      [EnemyTypes.SHOOT_ENEMY_3]: {
        speed: 3.6,
        damage: 12,
        attackRate: 20,
        life: 65,
        spawnLevel: 3,
        scale: 0.9,
        spawns: 2,
      },
      [EnemyTypes.FOLLOW_ENEMY_4]: {
        speed: 4.2,
        damage: 8,
        attackRate: 20,
        life: 12,
      },
      [EnemyTypes.SHOOT_ENEMY_4]: {
        speed: 3.5,
        damage: 8,
        attackRate: 20,
        life: 12,
        canShoot: true,
        bulletType: EnemyBulletTypes.RANDOM
      },
      [EnemyTypes.TOWER_1]: {
        life: 100,
        damage: 10,
        fireRate: 13,
        bulletsToFire: 3
      },
      [EnemyTypes.TOWER_2]: {
        life: 100,
        damage: 10,
        fireRate: 13,
        bulletsToFire: 3,
        shields: 2
      },
      [EnemyTypes.TOWER_3]: {
        life: 100,
        damage: 10,
        fireRate: 13,
        bulletsToFire: 1
      }
    },
    floors: [{
        floor: 1,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          }
        ]
      },
      {
        floor: 2,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.FOLLOW_ENEMY_3,
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          }
        ]
      },
      {
        floor: 3,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.FOLLOW_ENEMY_3,
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.SHOOT_ENEMY_2,
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          }
        ]
      },
      {
        floor: 4,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.FOLLOW_ENEMY_3,
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ],
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ],
              [
                EnemyTypes.SHOOT_ENEMY_2,
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_1,
                  lifeToAdd: 20
                })
              ]
            ]
          }
        ]
      },
      {
        floor: 5,
        rooms: [{
            waves: 2,
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_1)
              ]
            ]
          },
          {
            waves: 3,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_3)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.FOLLOW_ENEMY_4),
                ...Array(2).fill(EnemyTypes.TOWER_2)
              ]
            ]
          },
          {
            waves: 3,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(1).fill(EnemyTypes.TOWER_1)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                EnemyTypes.FOLLOW_ENEMY_3,
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          },
          {
            waves: 2,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ],
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          },
          {
            waves: 2,
            enemyWaves: [
              [...Array(10).fill(EnemyTypes.FOLLOW_ENEMY_1)],
              [...Array(10).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 30
                })
              ]
            ]
          },
          {
            waves: 4,
            boxPositions: [
              ...randomArrayElement(BoxPositions)
            ],
            isBossRoom: true,
            bossStats: {
              damage: 14,
              hasShield: false,
              speed: 5.5,
              bulletsToFire: 4,
              spawnLevel: 3,
              spawns: 2,
              phases: 4,
              life: 850,
            },
            enemyWaves: [
              [
                ...Array(6).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(1).fill({
                  type: EnemyTypes.FOLLOW_ENEMY_2,
                  lifeToAdd: 30
                }),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4)
              ],
              [
                ...Array(2).fill(EnemyTypes.TOWER_3),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_2,
                  lifeToAdd: 20
                }),

              ], , [
                ...Array(4).fill(EnemyTypes.FOLLOW_ENEMY_1),
                ...Array(2).fill(EnemyTypes.SHOOT_ENEMY_4),
                ...Array(2).fill({
                  type: EnemyTypes.TOWER_3,
                  lifeToAdd: 20
                })
              ]
            ]
          }
        ]
      }
    ]
  }
];