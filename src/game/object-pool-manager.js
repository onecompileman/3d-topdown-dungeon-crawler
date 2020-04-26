import {
    BoxBufferGeometry,
    MeshLambertMaterial,
    Mesh,
    SphereBufferGeometry,
    Line,
    LineBasicMaterial,
    ConeBufferGeometry,
    TorusBufferGeometry,
    CylinderBufferGeometry,
    IcosahedronBufferGeometry,
    Object3D
} from "three";
import {
    ObjectPool
} from "./object-pool";

export class ObjectPoolManager {

    constructor(options) {
        this.scene = options.scene;
        this.world = options.world;

        this.objectPools = [];
    }

    initObjectPools() {
        this.initBoss();
        this.initBox();
        this.initParticleTrail();
        this.initEnemyBulletDestructable();
        this.initEnemyBulletInDestructable();
        this.initEnemyDestructible();
        this.initEnemyInDestructible();
        this.initFollowEnemy1();
        this.initFollowEnemy2();
        this.initFollowEnemy3();
        this.initFollowEnemy4();
        this.initHoming();
        this.initHomingExplode();
        this.initLife();
        this.initLifeParticle();
        this.initPistol();
        this.initRifle();
        this.initPlayerBulletTesla();
        this.initShotgun();
        this.initTowerBody();
        this.initPlayerFire();
        this.initEnemyExplode();
    }

    allocate(name) {
        const objectPool = this.objectPools.find(o => o.name === name);

        return objectPool.allocate();
    }

    free(poolItem) {
        const objectPool = this.objectPools.find(o => o.name === poolItem.name);

        objectPool.free(poolItem.index);
    }

    initBox() {
        const geometry = new BoxBufferGeometry(3.5, 3.5, 3.5);
        const material = new MeshLambertMaterial({
            color: 0x111111
        });
        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 120,
            name: 'box',
            object,
        });

        this.objectPools.push(objectPool);
    }

    initEnemyBulletDestructable() {
        const geometry = new SphereBufferGeometry(0.3, 9, 9, 0, 6.3, 0, 3.1);
        const material = new MeshLambertMaterial({
            color: 0xee5a00,
            emissive: 0xe13700,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 80,
            name: 'enemyBulletDestructable',
            object,
        });

        this.objectPools.push(objectPool);
    }

    initEnemyBulletInDestructable() {
        const geometry = new SphereBufferGeometry(0.3, 9, 9, 0, 6.3, 0, 3.1);
        const material = new MeshLambertMaterial({
            color: 0x5b2478,
            emissive: 0x390256,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 80,
            name: 'enemyBulletInDestructable',
            object,
        });

        this.objectPools.push(objectPool);
    }

    initBoss() {
        const geometry = new SphereBufferGeometry(1.3, 12, 9);
        const material = new MeshLambertMaterial({
            color: 0x111111,
        });

        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 2,
            name: 'boss',
            object,
        });

        this.objectPools.push(objectPool);

        const lineGeometry = new SphereBufferGeometry(1.7, 10, 8);
        const lineMaterial = new LineBasicMaterial({
            color: 0xdedede,
        });

        const line = new Line(lineGeometry, lineMaterial);

        const objectPool2 = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 2,
            name: 'bossLine',
            object: line,
        });

        this.objectPools.push(objectPool2);
    }

    initParticleTrail() {
        const geometry = new BoxBufferGeometry(0.4, 0.4, 0.4);
        const material = new MeshLambertMaterial({
            color: 0x000000,
        });
        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 10,
            name: 'playerTrailParticle',
            object,
        });

        this.objectPools.push(objectPool);
    }

    initFollowEnemy1() {
        const geometry = new ConeBufferGeometry(5.4, 10, 3, 1, false, 0, 6.3);
        const material = new MeshLambertMaterial({
            color: 0x000000,
        });

        const object = new Mesh(geometry, material);

        // const objectPool = new ObjectPool({
        //     scene: this.scene,
        //     world: this.world,
        //     size: 15,
        //     name: 'followEnemy1',
        //     object,
        // });

        // this.objectPools.push(objectPool);

        const lineMaterial = new LineBasicMaterial({
            color: 0x555555
        });
        const line = new Line(geometry, lineMaterial);

        object.add(line);

        const objectPool2 = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 15,
            name: 'followEnemy1',
            object,
        });

        this.objectPools.push(objectPool2);
    }

    initFollowEnemy2() {
        const geometry = new TorusBufferGeometry(5, 5.9, 4, 8, 6.3);
        const material = new MeshLambertMaterial({
            color: 0x555555,
        });

        const object = new Mesh(geometry, material);

        // const objectPool = new ObjectPool({
        //     scene: this.scene,
        //     world: this.world,
        //     size: 2,
        //     name: 'followEnemy2',
        //     object,
        // });

        // this.objectPools.push(objectPool);

        const lineMaterial = new LineBasicMaterial({
            color: 0x555555
        });
        const line = new Line(geometry, lineMaterial);

        object.add(line);

        const objectPool2 = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 2,
            name: 'followEnemy2',
            object,
        });

        this.objectPools.push(objectPool2);
    }

    initFollowEnemy3() {
        const geometry = new ConeBufferGeometry(3.4, 10, 3, 1, false, 0, 6.3);
        const material = new MeshLambertMaterial({
            color: 0x000000,
        });

        const object = new Mesh(geometry, material);

        // const objectPool = new ObjectPool({
        //     scene: this.scene,
        //     world: this.world,
        //     size: 10,
        //     name: 'followEnemy3',
        //     object,
        // });

        // this.objectPools.push(objectPool);
        const lineMaterial = new LineBasicMaterial({
            color: 0xff6666
        });

        const line = new Line(geometry, lineMaterial);

        object.add(line)

        const objectPool2 = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 10,
            name: 'followEnemy3Line',
            object,
        });

        this.objectPools.push(objectPool2);
    }

    initFollowEnemy4() {
        const geometry = new SphereBufferGeometry(54, 4, 3, 0, 6.3, 0, 6.3);
        const material = new MeshLambertMaterial({
            color: 0xeeeeee,
        });


        const object = new Mesh(geometry, material);

        // const objectPool = new ObjectPool({
        //     scene: this.scene,
        //     world: this.world,
        //     size: 15,
        //     name: 'followEnemy4',
        //     object,
        // });

        // this.objectPools.push(objectPool);
        const lineMaterial = new LineBasicMaterial({
            color: 0x000000
        });

        const line = new Line(geometry, lineMaterial);
        object.add(line);

        const objectPool2 = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 15,
            name: 'followEnemy4',
            object,
        });

        this.objectPools.push(objectPool2);

        const geometry2 = new BoxBufferGeometry(0.82, 0.82, 0.5);
        const material2 = new MeshLambertMaterial({
            color: 0x000000,
        });
        const object2 = new Mesh(geometry2, material2);

        const objectPool3 = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 15,
            name: 'followEnemy4Object2',
            object: object2,
        });

        this.objectPools.push(objectPool3);
    }

    initTowerBody() {
        const geometry = new CylinderBufferGeometry(
            0.7,
            0.7,
            3,
            8,
            1,
            false,
            0,
            6.3
        );
        const material = new MeshLambertMaterial({
            color: 0x111111,
        });

        const object = new Mesh(geometry, material);
        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 6,
            name: 'towerBody',
            object,
        });

        this.objectPools.push(objectPool);

        const geometry1 = new BoxBufferGeometry(0.85, 0.85, 0.15);
        const material1 = new MeshLambertMaterial({
            color: 0xeeeeee,
        });

        const shield1 = new Mesh(geometry1, material1);

        const objectPool2 = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 18,
            name: 'towerShield',
            object: shield1
        });

        this.objectPools.push(objectPool2);
    }

    initPlayerBulletTesla() {
        const geometry = new IcosahedronBufferGeometry(0.5, 0);
        const material = new MeshLambertMaterial({
            color: 0x107758,
            emissive: 0xba77,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 10,
            name: 'tesla',
            object
        });

        this.objectPools.push(objectPool);
    }

    initRifle() {
        const geometry = new BoxBufferGeometry(0.14, 0.14, 0.5);
        const material = new MeshLambertMaterial({
            color: 0x4499ff,
            emissive: 0x55aaff,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 14,
            name: 'rifle',
            object
        });

        this.objectPools.push(objectPool);
    }

    initPistol() {
        const geometry = new BoxBufferGeometry(0.15, 0.15, 0.45);
        const material = new MeshLambertMaterial({
            color: 0xef9b38,
            emissive: 0xe56c38,
            emissiveIntensity: 1,
        });


        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 10,
            name: 'pistol',
            object
        });

        this.objectPools.push(objectPool);
    }

    initShotgun() {
        const geometry = new BoxBufferGeometry(0.14, 0.14, 0.45);
        const material = new MeshLambertMaterial({
            color: 0xff6666,
            emissive: 0xff3333,
            emissiveIntensity: 2,
        });
        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 25,
            name: 'shotgun',
            object
        });

        this.objectPools.push(objectPool);
    }

    initHoming() {
        const geometry = new BoxBufferGeometry(0.22, 0.22, 0.55);
        const material = new MeshLambertMaterial({
            color: 0xdedede,
            emissive: 0xff22ff,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 30,
            name: 'homing',
            object
        });

        this.objectPools.push(objectPool);
    }

    initPlayerFire() {
        const geometry = new BoxBufferGeometry(0.1, 0.1, 0.1);
        const material = new MeshLambertMaterial({
            color: 0xef9b38,
            emissive: 0xe56c38,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);
        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 30,
            name: 'playerFire',
            object
        });

        this.objectPools.push(objectPool);
    }


    initEnemyExplode() {
        const geometry = new BoxBufferGeometry(0.5, 0.5, 0.5);
        const material = new MeshLambertMaterial({
            color: 0x000000
        });

        const object = new Mesh(geometry, material);
        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 35,
            name: 'enemyExplode',
            object
        });

        this.objectPools.push(objectPool);
    }

    initHomingExplode() {
        const geometry = new BoxBufferGeometry(0.5, 0.5, 0.5);
        const material = new MeshLambertMaterial({
            color: 0xff0000,
            emissive: 0xff2222,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);
        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 45,
            name: 'homingExplode',
            object
        });

        this.objectPools.push(objectPool);
    }

    initEnemyDestructible() {
        const geometry = new BoxBufferGeometry(0.3, 0.3, 0.3);
        const material = new MeshLambertMaterial({
            color: 0xff6b00,
            emissive: 0xf24800,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);
        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 35,
            name: 'enemyDestructible',
            object
        });

        this.objectPools.push(objectPool);
    }

    initEnemyInDestructible() {
        const geometry = new BoxBufferGeometry(0.3, 0.3, 0.3);
        const material = new MeshLambertMaterial({
            color: 0x5b2478,
            emissive: 0x390256,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);
        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 35,
            name: 'enemyInDestructible',
            object
        });

        this.objectPools.push(objectPool);
    }

    initLifeParticle() {
        const geometry = new BoxBufferGeometry(0.4, 0.4, 0.4);
        const material = new MeshLambertMaterial({
            color: 0xce2121,
            emissive: 0x910000,
            emissiveIntensity: 1,
        });

        const object = new Mesh(geometry, material);
        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 15,
            name: 'lifeParticle',
            object
        });

        this.objectPools.push(objectPool);
    }

    initLife() {
        const geometry1 = new BoxBufferGeometry(0.85, 0.3, 0.3);
        const geometry2 = new BoxBufferGeometry(0.3, 0.85, 0.3);

        const material = new MeshLambertMaterial({
            color: 0xce2121,
            emissive: 0x910000,
        });

        const mesh1 = new Mesh(geometry1, material);
        const mesh2 = new Mesh(geometry2, material);

        const object = new Object3D();

        object.add(mesh1);
        object.add(mesh2);

        const objectPool = new ObjectPool({
            scene: this.scene,
            world: this.world,
            size: 8,
            name: 'life',
            object
        });

        this.objectPools.push(objectPool);
    }
}