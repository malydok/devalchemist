export const EasingFunctions = {
  linear: t => t,
  easeInQuad: t => t*t,
  easeOutQuad: t => t*(2-t),
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  easeInCubic: t => t*t*t,
  easeOutCubic: t => (--t)*t*t+1,
  easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  easeInQuart: t => t*t*t*t,
  easeOutQuart: t => 1-(--t)*t*t*t,
  easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  easeInQuint: t => t*t*t*t*t,
  easeOutQuint: t => 1+(--t)*t*t*t*t,
  easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
};

export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * By Ken Fyrstenberg Nilsen
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 * If image and context are only arguments rectangle will equal canvas
*/
export function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }

  /// default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

  /// keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r,   /// new prop. width
    nh = ih * r,   /// new prop. height
    cx, cy, cw, ch, ar = 1;

  /// decide which gap to fill    
  if (nw < w) ar = w / nw;
  if (nh < h) ar = h / nh;
  nw *= ar;
  nh *= ar;

  /// calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  /// make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  /// fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}