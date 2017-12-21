export default class Skill {
  constructor(width, height, container, percent) {
    this.s = window.Snap(container);
    const radius = width / 3;
    const cx = width / 2;
    const cy = height / 2;
    this.length = 2 * radius * Math.PI;
    this.percent = percent;
    
    this.s.attr({
      width,
      height,
      viewBox: '15 15 120 120',
    });
    
    this.bgCircle = this.createCircle(cx, cy, radius, {
      fill: 'none',
      stroke: '#dfdcd5',
      strokeWidth: 20,
    });
    
    this.baseCircle = this.createCircle(cx, cy, radius, {
      fill: 'none',
      stroke: '#74a163',
      strokeWidth:20,
      strokeDasharray: this.length,
      strokeDashoffset: this.length,
    });
    
    this.baseCircle.transform(`r-90, ${cx} ${cy}`);
  }

  createCircle(cx, cy, radius, attr) {
    const circle = this.s.circle(cx, cy, radius);
    circle.attr(attr);
    return circle;
  }
  
  draw() {
    window.Snap.animate(this.length, (1 - this.percent) * this.length, val => {
      this.baseCircle.attr({
        strokeDashoffset: val,
      });
    }, 700, window.mina.easeinout);
  }
}