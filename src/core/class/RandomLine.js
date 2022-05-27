import {
  BufferGeometry,
  Color,
  Line,
  Vector2,
  ShaderMaterial } from 'three';

import { layerVertex, layerFragment } from '../helpers/shader';
import { getRandomFloat } from '../helpers/utils';

export class RandomLine extends Line {
  constructor({ amplitude = 0.5, nbrOfPoints = 4, length = 5, orientationY = -2, speed = 0.04, color = 0x000000 } = {}) {
    const MAX_LENGTH = length / nbrOfPoints;
    const MIN_LENGTH = MAX_LENGTH * 0.5;

    const points = [];
    points.push(new Vector2(0, 0));
    for (let i = 0; i < nbrOfPoints; i++) {
      points.push(new Vector2(
        MAX_LENGTH * i + getRandomFloat(MIN_LENGTH, MAX_LENGTH),
        amplitude * orientationY * i + getRandomFloat(-amplitude, amplitude)
      ));
    }

    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new ShaderMaterial({
      vertexShader: layerVertex,
      fragmentShader: layerFragment,
      uniforms: {
        color: { type: 'v3', value: new Color(color) },
        timer: { type: 'f', value: getRandomFloat(0, 100) },
        lineHeight: { type: 'f', value: 2 },
        spaceHeight: { type: 'f', value: 20 }
      },
      transparent: true
    });
    super(geometry, material);
    this.speed = speed;
    this.update = this.update.bind(this);
  }

  update() {
    this.material.uniforms.timer.value += this.speed;
  }
}
