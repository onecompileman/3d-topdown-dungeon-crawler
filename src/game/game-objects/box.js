import {
  MeshLambertMaterial,
  BoxBufferGeometry,
  LineBasicMaterial,
  Mesh,
  Box3,
  Color,
} from 'three';

export class Box {
  constructor(position, destructable = true) {
    const geometry = new BoxBufferGeometry(3.5, 3.5, 3.5);

    const material = new MeshLambertMaterial({
      color: destructable ? 0x111111 : 0xffffff,
    });

    const lineMaterial = new LineBasicMaterial({
      color: destructable ? 0xfefefe : 0x000000,
    });

    this.object = new Mesh(geometry, material);
    this.line = new Mesh(geometry, lineMaterial);

    this.object.add(this.line);

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
      if (this.takeDamage >= 0) {
        this.object.material.color.set(new Color(0xffffff));
      } else {
        this.object.material.color.set(new Color(0x111111));
      }
    }

    this.takeDamage--;
  }

  isDead() {
    return this.life <= 0;
  }
}
