import {
    Vector3
} from "three";

export class ObjectPool {
    constructor(options) {
        this.object = options.object;
        this.size = options.size;
        this.name = options.name;
        this.scene = options.scene;
        this.world = options.world;

        this.pool = [];
        this.poolLocation = new Vector3(-1000, 0, 0);

        this.initPool();
    }

    initPool() {
        this.pool = Array(this.size).fill(1).map((n, index) => {
            const object = this.object.clone();
            if (object.material) {
                object.material = this.object.material.clone();
            }
            object.position.copy(this.poolLocation);

            this.scene.add(object);
            return {
                index,
                object,
                name: this.name,
                allocated: false
            };
        });
    }

    allocate() {
        // console.log(this.name);
        const object = this.pool.find(pool => !pool.allocated);

        if (!object) {
            const clonedObject = this.object.clone();

            clonedObject.position.copy(this.poolLocation);

            const poolObject = {
                object: clonedObject,
                name: this.name,
                index: this.pool.length,
                allocated: true
            };

            this.pool.push(poolObject);

            return poolObject;
        }

        object.allocated = true;

        return object;
    }

    free(index) {
        const poolObject = this.pool[index];

        poolObject.object.position.copy(this.poolLocation);
        poolObject.object.scale.set(1, 1, 1);

        if (poolObject.object.body) {
            this.world.remove(poolObject.object.body);
        }

        poolObject.allocated = false;
    }
}