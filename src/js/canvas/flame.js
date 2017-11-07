import { getRandom } from '../helpers';

export default function Flame() {
  const flame = document.querySelector('.section-top__flame');
  const desc = document.querySelector('.site-description');

  setInterval(() => {
    flame.style.opacity = Math.random();
    desc.style.opacity = getRandom(0.85, 1);
  }, 200);
}