import {
  MeshLambertMaterial,
  BoxBufferGeometry,
  LineBasicMaterial,
  Mesh,
  Box3,
  Color,
  Line,
} from 'three';

export class Box {
  constructor(position, destructable = true, objectPoolManager) {
    this.poolItem = objectPoolManager.allocate('box');
    this.object = this.poolItem.object;

    this.object.material.color.set(destructable ? 0x111111 : 0xfefefe);

    this.object.position.copy(position.clone());

    this.object.position.y = -1.2;

    this.destructable = destructable;

    this.takeDamage = 0;
    this.takeDamageRate = 3;

    this.life = 10;

    this.bBox = new Box3().setFromObject(this.object);
  }

  update() {
    this.bBox.setFromObject(this.object);

    if (this.destructable) {
      if (this.takeDamage > 0) {
        this.object.material.color.set(0xfefefe);
      } else {
        this.object.material.color.set(0x111111);
      }
    }
    this.takeDamage--;
  }

  isDead() {
    return this.life <= 0;
  }
}