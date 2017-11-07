import { EasingFunctions as Easing } from '../helpers';

class Lines {
  constructor(options) {
    this.options = options;
    this.options.canvas = options.ctx.canvas;
  }
  
  updateRadiuses() {
    const {
      canvas,
      radiusInnerRatio,
      radiusOuterRatio
    } = this.options;

    const canvasRadius = 0.5 * Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));

    this.options.radiusInner = radiusInnerRatio * canvasRadius;
    this.options.radiusOuter = radiusOuterRatio * canvasRadius;
  }

  render(rotation, closedRatio) {
    const {
      canvas,
      ctx,
      radiusOuter, 
      radiusInner, 
      lineWidth, 
      angle,
      strokeColor
    } = this.options;
    const radiusDiff = radiusOuter - radiusInner;
    const radiusInnerWithRatio = radiusInner + (closedRatio * radiusDiff);
    const strokeWithRatio = lineWidth + (closedRatio * 8 * lineWidth);
    let currentAngle = 0;

    ctx.beginPath();
    while (currentAngle + angle <= 360) {
      currentAngle += angle;
      const angleInRad = 0.01745329252 * (currentAngle + rotation);
    
      const xInner = canvas.width/2 + radiusInnerWithRatio * Math.cos(angleInRad);
      const yInner = canvas.height/2 + radiusInnerWithRatio * Math.sin(angleInRad);
      
      const xOuter = canvas.width/2 + radiusOuter * Math.cos(angleInRad);
      const yOuter = canvas.height/2 + radiusOuter * Math.sin(angleInRad);

      ctx.moveTo(Math.round(xInner), Math.round(yInner));
      ctx.lineTo(Math.round(xOuter), Math.round(yOuter));
    }
    ctx.closePath();
    ctx.lineWidth = strokeWithRatio;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }
}

export default function CanvasLines(canvas) {
  const ctx = canvas.getContext('2d');

  const linesOuter = new Lines({
    ctx,
    angle: 0.32,
    radiusInnerRatio: 0.65,
    radiusOuterRatio: 1,
    lineWidth: 1.5,
    strokeColor: '#4b2921'
  });
  const linesCenter = new Lines({
    ctx,
    angle: 0.5,
    radiusInnerRatio: 0.57,
    radiusOuterRatio: 0.65,
    lineWidth: 1,
    strokeColor: '#4b2921'
  });
  const linesInner = new Lines({
    ctx,
    angle: 0.75,
    radiusInnerRatio: 0.55,
    radiusOuterRatio: 0.57,
    lineWidth: 1,
    strokeColor: '#4b2921'
  });
  let ratioOuter = 1;
  let ratioCenter = 1;
  let ratioInner = 1;
  let rotation = 0;

  return {
    updateRadiuses: () => {
      linesOuter.updateRadiuses();
      linesCenter.updateRadiuses();
      linesInner.updateRadiuses();
    },
    render: () => {
      rotation += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      linesOuter.render(rotation/3, Easing.easeInCubic(ratioOuter));
      linesCenter.render(-rotation/2, Easing.easeInOutQuad(ratioCenter));
      linesInner.render(rotation, Easing.easeInOutQuint(ratioInner));
    },
    animateIn: () => {
      if (ratioOuter > 0) {
        ratioOuter -= 0.02;
      }
      if (ratioOuter <= 0.2 && ratioCenter > 0) {
        ratioCenter -= 0.04;
      }
      if (ratioCenter <= 0.2 && ratioInner > 0) {
        ratioInner -= 0.02;
      }
    }
  };
}