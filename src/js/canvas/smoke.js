import { getRandom, drawImageProp } from '../helpers';

class Particle {
  constructor(settings) {
    Object.assign(this, settings);
    this.tickLast = 0;
  }

  update() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.yVelocity *= 0.998;
    this.alpha = Math.max(this.alpha - 0.001, 0);
    this.scale += 0.004;
    this.rotationVelocity *= 0.999;
    this.rotation += this.rotationVelocity;
  }

  render() {
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.drawImage(this.smoke, -50, -50);
    this.ctx.restore();
  }
}

export default class CanvasSmoke {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.preloadResources();
  }

  preloadResources() {
    this.smokePromise = new Promise((resolve, reject) => {
      this.smoke = new Image();
      this.smoke.onload = () => {
        resolve('Smoke image loaded');
      };
      this.smoke.onerror = () => {
        reject('Smoke image loading fail');
      };
      this.smoke.src = 'images/smoke.png';
    });

    this.maskPromise = new Promise((resolve, reject) => {
      this.mask = new Image();
      this.mask.onload = () => {
        this.calculateOrigin(() => {
          resolve('Smoke mask loaded');
        });
      };
      this.mask.onerror = () => {
        reject('Smoke mask loading fail');
      };
      this.mask.src = 'images/smoke-mask.png';
    });
  }

  get ready() {
    return Promise.all([this.smokePromise, this.maskPromise]);
  }

  calculateOrigin(callback) {
    drawImageProp(this.ctx, this.mask);

    const halfCanvasWidth = Math.floor(this.canvas.width/2);
    const halfCanvasHeight = Math.floor(this.canvas.height/2);
    const imageData = this.ctx.getImageData(halfCanvasWidth, halfCanvasHeight, halfCanvasWidth, halfCanvasHeight);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === 255 && data[i+1] === 0 && data[i+2] === 0) {
        this.originX = halfCanvasWidth + (i/4) % halfCanvasWidth;
        this.originY = halfCanvasHeight + 40 + Math.floor((i/4) / halfCanvasWidth);

        callback();
        break;
      }
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  startFactory() {
    let clearedLast = true;

    const factory = () => {
      // check if RAF paused
      if (this.tick === this.tickLast) {
        return;
      }
      this.tickLast = this.tick;

      this.createParticle();

      if (this.particles.length > 30) {
        this.particles.shift();
      }
    };
    const randomizer = () => {
      clearInterval(this.factoryInterval);

      if (!clearedLast && getRandom(0, 10) > 6) {
        clearedLast = true;
      } else {
        this.factoryInterval = setInterval(factory, getRandom(600, 1000));
        clearedLast = false;
      }
    }
    randomizer();
    this.randomizerInterval = setInterval(this.randomizer, 3000);
  }

  stopFactory() {
    clearInterval(this.factoryInterval);
    clearInterval(this.randomizerInterval);
  }

  createParticle() {
    this.particles.push(new Particle({
      ctx: this.ctx,
      smoke: this.smoke,
      x: this.originX,
      y: this.originY,
      xVelocity: getRandom(-0.1, 0.1),
      yVelocity: getRandom(-0.8, -0.4),
      scale: getRandom(0.4, 0.5),
      rotation: getRandom(1, 360) * Math.PI/180,
      rotationVelocity: getRandom(-0.005, 0.005),
      alpha: 1,
    }));
  }

  render(tick) {
    this.tick = tick;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'source-over';

    this.particles.forEach((particle, index) => {
      particle.update();
      particle.render();
    });

    this.ctx.globalCompositeOperation = 'destination-out';
    drawImageProp(this.ctx, this.mask);
  }
}