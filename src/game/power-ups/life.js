import {
  BoxBufferGeometry,
  MeshLambertMaterial,
  Object3D,
  Box3,
  Mesh,
} from 'three';

export class Life {
  constructor(position, plusLife, objectPoolManager) {
    this.poolItem = objectPoolManager.allocate('life');

    this.object = this.poolItem.object;

    this.object.position.copy(position.clone());
    this.object.position.y = -1.2;

    this.plusLife = plusLife;

    this.bBox = new Box3().setFromObject(this.object);
  }

  update() {
    this.object.rotation.y += 0.05;
  }
}