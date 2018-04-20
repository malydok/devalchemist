import CanvasSmoke from './smoke';
import Flame from './flame';
import BackgroundImage from './background';

export default function initCanvas() {
  let isAnimationPlaying = true;
  const lineCanvas = document.getElementById('line-canvas');
  const lineCtx = lineCanvas.getContext('2d');
  const smokeCanvas = document.getElementById('smoke-canvas');
  const smokeCtx = smokeCanvas.getContext('2d');
  const buttonToggleAnimation = document.querySelector('.toggle-animation');
  const descToggleAnimation = buttonToggleAnimation.querySelector('.canvas-controls__description');

  const updateCanvasSize = () => {
    lineCanvas.width = document.body.clientWidth;
    lineCanvas.height = window.innerHeight;
    smokeCanvas.width = document.body.clientWidth;
    smokeCanvas.height = window.innerHeight;
  };

  updateCanvasSize();
  Flame();
  const smoke = new CanvasSmoke(smokeCanvas);

  const preloadModules = Promise.all([
    BackgroundImage(),
    smoke.ready,
  ]);

  let tick = 0;
  const animateCanvas = () => {
    tick++;
    tick %= 1000;
    smoke.render(tick);
    if (isAnimationPlaying) {
      window.requestAnimationFrame(animateCanvas);
    }
  };
  const startAnimation = () => {
    isAnimationPlaying = true;
    smoke.startFactory();
    animateCanvas();
  };
  const stopAnimation = () => {
    isAnimationPlaying = false;
    smoke.stopFactory();
  };

  const onWindowResize = () => {
    if (window.innerWidth < 768) {
      if (isAnimationPlaying) {
        stopAnimation();
      }
      return;
    }
    if (!isAnimationPlaying) {
      startAnimation();
    }
    updateCanvasSize();
    smoke.calculateOrigin();
  };
  onWindowResize();
  window.addEventListener('resize', onWindowResize);
  
  if (window.innerWidth >= 768) {
    preloadModules.then(startAnimation).catch(error => {
      console.log('Preloading failed!', error);
    });
  }

  buttonToggleAnimation.addEventListener('click', () => {
    buttonToggleAnimation.classList.toggle('is-paused');

    if (isAnimationPlaying) {
      stopAnimation();
      descToggleAnimation.textContent = 'Resume animation';
      buttonToggleAnimation.setAttribute('aria-pressed', true);
    } else {
      startAnimation();
      descToggleAnimation.textContent = 'Pause animation';
      buttonToggleAnimation.setAttribute('aria-pressed', false);
    }
  });
};