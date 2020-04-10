import { MathUtils } from 'three';

export function randomArrayElement(elements) {
  return elements[MathUtils.randInt(0, elements.length - 1)];
}
