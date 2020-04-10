import { Vector2 } from 'three';

export function angleToVector2(angle) {
  return new Vector2(Math.cos(angle), Math.sin(angle));
}
