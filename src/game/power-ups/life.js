import {
  BoxBufferGeometry,
  MeshLambertMaterial,
  Object3D,
  Box3,
  Mesh,
} from 'three';

export class Life {
  constructor(position, plusLife) {
    const geometry1 = new BoxBufferGeometry(0.85, 0.3, 0.3);
    const geometry2 = new BoxBufferGeometry(0.3, 0.85, 0.3);

    const material = new MeshLambertMaterial({
      color: 0xce2121,
      emissive: 0x910000,
    });

    const mesh1 = new Mesh(geometry1, material);
    const mesh2 = new Mesh(geometry2, material);

    this.object = new Object3D();

    this.object.add(mesh1);
    this.object.add(mesh2);

    this.object.position.copy(position.clone());
    this.object.position.y = -1.2;

    this.plusLife = plusLife;

    this.bBox = new Box3().setFromObject(this.object);
  }

  update() {
    this.object.rotation.y += 0.05;
  }
}
