export class CanvasWriter {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  write(emojiCanvas, explosion) {
    // const elapsed = (explosion)
    const elapsed = (explosion.elapsed()) * .001;
    this.opacity(explosion.opacity(elapsed));

    explosion.eachParticle((particle) => {
      this.draw(particle.emojiCanvas, particle.x(elapsed), particle.y(elapsed), particle.z(elapsed), particle.rotationRad(elapsed));
      this.reset();
    }, "z", elapsed)
  }

  clear() {
    // 指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move(x, y) {
    // 将 canvas 按原始 x点的水平方向、原始的 y点垂直方向进行平移变换
    this.context.translate(x + this.canvas.width / 2, y + this.canvas.height / 2);
  }

  reset() {
    // setTransfrom 分别设置水平倾斜、缩放，垂直倾斜、缩放，水平移动，垂直移动
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  opacity(opacity) {
    this.context.globalAlpha = Math.max(opacity, 0);
  }

  draw(canvasToDrawFrom, x, y, z, radians) {
    const coordX = x;
    const coordY = y;

    this.move(coordX, coordY);
    this.context.rotate(radians);

    const targetWidth = canvasToDrawFrom.width * (0.25 + z);
    const targetHeight = canvasToDrawFrom.height * (0.25 + z);

    this.context.drawImage(canvasToDrawFrom,
      0 - (targetWidth / 2),
      0 - (targetHeight / 2),
      targetWidth,
      targetHeight);
  }

}