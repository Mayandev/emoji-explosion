
const DEGREES_IN_CIRCLE = 360;
// 弧度
const RADIANS_360_DEGREES = DEGREES_IN_CIRCLE * (Math.PI/180);


export class Particle {
  constructor(originX, originY, emojiCanvas) {
    this.emojiCanvas = emojiCanvas;
    this.originX = originX;
    this.originY = originY;

    this.accelerationY = 360;

    const UP = -360;

    // 初始加速度
    const initialVelocity = this.randomBetween(100, 200);
    // 初始弧度
    const initialAngle = this.randomBetween(0, RADIANS_360_DEGREES);

    // x 方向的加速度
    this.initialVelocityX = initialVelocity * Math.cos(initialAngle);
    // y 方向的加速度
    this.initialVelocityY = UP + initialVelocity * Math.sin(initialAngle);
    // z 方向加速度（大小）
    this.initialVelocityZ = this.randomBetween(-0.1, .1);

    // 初始角度
    this.initialRotation = this.randomBetween(0, RADIANS_360_DEGREES);
    // 旋转加速度
    this.rotationVelocity = this.randomBetween(-2, 2);
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  rotationRad(t) {
    return this.initialRotation + this.rotationVelocity * t;
  }

  y(t) {
    // 初始坐标 + y + 加速度
    return this.originY + this.initialVelocityY * t + (this.accelerationY / 2) * Math.pow(t, 2);
  }

  x(t) {
    return this.originX + this.initialVelocityX * t;
  }

  z(t) {
    if (this.cachedCurrentVelocityT === t) {
      return this.cachedCurrentVelocity;
    }
    else {
      // 存储
      const currentVelocity = this.initialVelocityZ * t;
      //cache it
      this.cachedCurrentVelocity = currentVelocity;
      this.cachedCurrentVelocityT = t;
      //do it
      return currentVelocity;
    }
  }
}