export default class Parallax {
  constructor(block, windowScroll, strafeAmount) {
    this.strafe = windowScroll / -strafeAmount + '%';
    this.style = block.style;
  }

  move() {
    let transformString = `translate3d(0, ${this.strafe}, 0)`;

    this.style.transform = transformString;
    this.style.webkitTransform = transformString;
  }
}