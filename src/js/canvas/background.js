export default function BackgroundImage() {
  const bgImageEl = document.querySelector('.section-top__background');
  const bgImageUrl = bgImageEl.dataset.img;
  const bgImage = new Image();

  return new Promise((resolve, reject) => {
    bgImage.onload = () => {
      document.querySelector('.section-top')
        .classList.add('is-loaded');

      resolve('Background image loaded');
    };
    bgImage.onerror = () => {
      reject('Background image loading fail')
    };
    bgImage.src = bgImageUrl;
  });
}