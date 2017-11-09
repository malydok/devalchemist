!function(t){function e(a){if(i[a])return i[a].exports;var s=i[a]={i:a,l:!1,exports:{}};return t[a].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,a){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,i){"use strict";e.c=function(t,e){return Math.random()*(e-t)+t},e.b=function(t,e,i,a,s,n,o,r){2===arguments.length&&(i=a=0,s=t.canvas.width,n=t.canvas.height),o="number"==typeof o?o:.5,r="number"==typeof r?r:.5,o<0&&(o=0),r<0&&(r=0),o>1&&(o=1),r>1&&(r=1);var c,h,l,u,d=e.width,m=e.height,g=Math.min(s/d,n/m),p=d*g,f=m*g,y=1;p<s&&(y=s/p),f<n&&(y=n/f),h=(m-(u=m/((f*=y)/n)))*r,(c=(d-(l=d/((p*=y)/s)))*o)<0&&(c=0),h<0&&(h=0),l>d&&(l=d),u>m&&(u=m),t.drawImage(e,c,h,l,u,i,a,s,n)};const a={linear:t=>t,easeInQuad:t=>t*t,easeOutQuad:t=>t*(2-t),easeInOutQuad:t=>t<.5?2*t*t:(4-2*t)*t-1,easeInCubic:t=>t*t*t,easeOutCubic:t=>--t*t*t+1,easeInOutCubic:t=>t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1,easeInQuart:t=>t*t*t*t,easeOutQuart:t=>1- --t*t*t*t,easeInOutQuart:t=>t<.5?8*t*t*t*t:1-8*--t*t*t*t,easeInQuint:t=>t*t*t*t*t,easeOutQuint:t=>1+--t*t*t*t*t,easeInOutQuint:t=>t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t};e.a=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(2),s=(i.n(a),i(3));Object(s.a)()},function(t,e){},function(t,e,i){"use strict";e.a=function(){let t=!0;const e=document.getElementById("line-canvas"),i=(e.getContext("2d"),document.getElementById("smoke-canvas")),r=(i.getContext("2d"),document.querySelector(".toggle-animation")),c=r.querySelector(".canvas-controls__description"),h=()=>{e.width=document.body.clientWidth,e.height=window.innerHeight,i.width=document.body.clientWidth,i.height=window.innerHeight};h(),Object(n.a)();const l=Object(a.a)(e),u=new s.a(i),d=Promise.all([Object(o.a)(),u.ready]);let m=0;const g=()=>{m++,m%=1e3,u.render(m),l.render(),l.animateIn(),t&&window.requestAnimationFrame(g)},p=()=>{t=!0,u.startFactory(),g()},f=()=>{t=!1,u.stopFactory()},y=()=>{window.innerWidth<768?t&&f():(t||p(),h(),l.updateRadiuses(),u.calculateOrigin())};y(),window.addEventListener("resize",y),window.innerWidth>=768&&d.then(p).catch(t=>{console.log("Preloading failed!",t)}),r.addEventListener("click",()=>{r.classList.toggle("is-paused"),t?(f(),c.textContent="Resume animation",r.setAttribute("aria-pressed",!0)):(p(),c.textContent="Pause animation",r.setAttribute("aria-pressed",!1))})};var a=i(4),s=i(5),n=i(6),o=i(7)},function(t,e,i){"use strict";e.a=function(t){const e=t.getContext("2d"),i=new s({ctx:e,angle:.32,radiusInnerRatio:.65,radiusOuterRatio:1,lineWidth:1.5,strokeColor:"#4b2921"}),n=new s({ctx:e,angle:.5,radiusInnerRatio:.57,radiusOuterRatio:.65,lineWidth:1,strokeColor:"#4b2921"}),o=new s({ctx:e,angle:.75,radiusInnerRatio:.55,radiusOuterRatio:.57,lineWidth:1,strokeColor:"#4b2921"});let r=1,c=1,h=1,l=0;return{updateRadiuses:()=>{i.updateRadiuses(),n.updateRadiuses(),o.updateRadiuses()},render:()=>{l+=.05,e.clearRect(0,0,t.width,t.height),i.render(l/3,a.a.easeInCubic(r)),n.render(-l/2,a.a.easeInOutQuad(c)),o.render(l,a.a.easeInOutQuint(h))},animateIn:()=>{r>0&&(r-=.02),r<=.2&&c>0&&(c-=.04),c<=.2&&h>0&&(h-=.02)}}};var a=i(0);class s{constructor(t){this.options=t,this.options.canvas=t.ctx.canvas}updateRadiuses(){const{canvas:t,radiusInnerRatio:e,radiusOuterRatio:i}=this.options,a=.5*Math.sqrt(Math.pow(t.width,2)+Math.pow(t.height,2));this.options.radiusInner=e*a,this.options.radiusOuter=i*a}render(t,e){const{canvas:i,ctx:a,radiusOuter:s,radiusInner:n,lineWidth:o,angle:r,strokeColor:c}=this.options,h=n+e*(s-n),l=o+8*e*o;let u=0;for(a.beginPath();u+r<=360;){const e=.01745329252*((u+=r)+t),n=i.width/2+h*Math.cos(e),o=i.height/2+h*Math.sin(e),c=i.width/2+s*Math.cos(e),l=i.height/2+s*Math.sin(e);a.moveTo(Math.round(n),Math.round(o)),a.lineTo(Math.round(c),Math.round(l))}a.closePath(),a.lineWidth=l,a.strokeStyle=c,a.stroke()}}},function(t,e,i){"use strict";var a=i(0);class s{constructor(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);this.tickLast=0}update(){this.x+=this.xVelocity,this.y+=this.yVelocity,this.yVelocity*=.998,this.alpha=Math.max(this.alpha-.001,0),this.scale+=.004,this.rotationVelocity*=.999,this.rotation+=this.rotationVelocity}render(){this.ctx.save(),this.ctx.globalAlpha=this.alpha,this.ctx.translate(this.x,this.y),this.ctx.rotate(this.rotation),this.ctx.scale(this.scale,this.scale),this.ctx.drawImage(this.smoke,-50,-50),this.ctx.restore()}}class n{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.particles=[],this.preloadResources()}preloadResources(){this.smokePromise=new Promise((t,e)=>{this.smoke=new Image,this.smoke.onload=(()=>{t("Smoke image loaded")}),this.smoke.onerror=(()=>{e("Smoke image loading fail")}),this.smoke.src="images/smoke.png"}),this.maskPromise=new Promise((t,e)=>{this.mask=new Image,this.mask.onload=(()=>{this.calculateOrigin(()=>{t("Smoke mask loaded")})}),this.mask.onerror=(()=>{e("Smoke mask loading fail")}),this.mask.src="images/smoke-mask.png"})}get ready(){return Promise.all([this.smokePromise,this.maskPromise])}calculateOrigin(t){Object(a.b)(this.ctx,this.mask);const e=Math.floor(this.canvas.width/2),i=Math.floor(this.canvas.height/2),s=this.ctx.getImageData(e,i,e,i).data;for(let a=0;a<s.length;a+=4)if(255===s[a]&&0===s[a+1]&&0===s[a+2]){this.originX=e+a/4%e,this.originY=i+40+Math.floor(a/4/e),t();break}this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}startFactory(){let t=!0;const e=()=>{this.tick!==this.tickLast&&(this.tickLast=this.tick,this.createParticle(),this.particles.length>30&&this.particles.shift())};(()=>{clearInterval(this.factoryInterval),!t&&Object(a.c)(0,10)>6?t=!0:(this.factoryInterval=setInterval(e,Object(a.c)(600,1e3)),t=!1)})(),this.randomizerInterval=setInterval(this.randomizer,3e3)}stopFactory(){clearInterval(this.factoryInterval),clearInterval(this.randomizerInterval)}createParticle(){this.particles.push(new s({ctx:this.ctx,smoke:this.smoke,x:this.originX,y:this.originY,xVelocity:Object(a.c)(-.1,.1),yVelocity:Object(a.c)(-.8,-.4),scale:Object(a.c)(.4,.5),rotation:Object(a.c)(1,360)*Math.PI/180,rotationVelocity:Object(a.c)(-.005,.005),alpha:1}))}render(t){this.tick=t,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.globalCompositeOperation="source-over",this.particles.forEach((t,e)=>{t.update(),t.render()}),this.ctx.globalCompositeOperation="destination-out",Object(a.b)(this.ctx,this.mask)}}e.a=n},function(t,e,i){"use strict";e.a=function(){const t=document.querySelector(".section-top__flame"),e=document.querySelector(".site-description");setInterval(()=>{t.style.opacity=Math.random(),e.style.opacity=Object(a.c)(.85,1)},200)};var a=i(0)},function(t,e,i){"use strict";e.a=function(){const t=document.querySelector(".section-top__background").dataset.img,e=new Image;return new Promise((i,a)=>{e.onload=(()=>{document.querySelector(".section-top").classList.add("is-loaded"),i("Background image loaded")}),e.onerror=(()=>{a("Background image loading fail")}),e.src=t})}}]);