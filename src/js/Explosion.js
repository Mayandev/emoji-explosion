import {Particle} from './Particle';

export class Explosion {
  constructor(originX, originY, emojiCanvases) {
    this.emojiCanvases = emojiCanvases;
    this.particles = [];
    this.makeParticles(50, originX, originY);
  }

  /**
   * 制造爆炸粒子
   * @param {*} counts 粒子树木
   * @param {*} originX 坐标x
   * @param {*} originY 坐标y
   */
  makeParticles(counts, originX, originY) {
    for (let i = 0; i < counts; i++) {
      this.particles.push(new Particle(originX, originY, this.randomMojeCanvas()));
    }
  }

  randomMojeCanvas() {
    const length = this.emojiCanvases.length;
    const idx = Math.floor(Math.random() * length);
    return this.emojiCanvases[idx];
  }

  // 遍历每个粒子
  eachParticle(fn, sortBy, t) {
    this.sortedParticles(sortBy, t).forEach(fn);
  }

  sortedParticles(by, t) {
    return this.particles.sort(function compare(a, b) {
      const aCriterion = a[by](t);
      const bCriterion = b[by](t);
      if (aCriterion > bCriterion) {
        return 1
      }
      if (aCriterion < bCriterion) {
        return -1;
      }
      return 0;
    })
  }

  run(){
    this.startTime = performance.now();
  }

  elapsed() {
    return performance.now() - this.startTime
  }

  isOver() {
    return this.elapsed() >= 2500;
  }


  opacity() {
    const elapsed = this.elapsed();

    if (elapsed <= 250) {
      return this.easeInOutQuad(elapsed, 0.0, 1.0, 250)
    }
    else if (elapsed <= 1000)
      return 1;
    else if (elapsed >= 2000)
      return 0;
    else
      return this.easeOpacity(elapsed - 1000)
  }


  easeOpacity(t){
    return this.easeInOutQuad(t, 1.0, -1.0, 1000)
  }

  // penner
  easeInOutQuad(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  }

}