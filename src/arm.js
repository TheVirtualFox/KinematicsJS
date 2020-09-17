class Arm {
  constructor(x, y, t = 0, parent = null) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.parent = parent;

    this.amplitude = 9;
    this.frequency = 0.1;
    this.phase = 1;

    console.log(`Created ${this}`);
  }

  toString() {
    return `Arm: [x: ${this.x}, y: ${this.y}]`;
  }

  getEndX() {
    return (
      this.x +
      this.amplitude *
        Math.cos(2 * Math.PI * this.frequency * this.t + this.phase)
    );
  }

  getEndY() {
    return (
      this.y +
      this.amplitude *
        Math.sin(2 * Math.PI * this.frequency * this.t + this.phase)
    );
  }

  render(context) {
    context.strokeStyle = "#000000";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    context.moveTo(this.getEndX(), this.getEndY());
    context.arc(this.getEndX(), this.getEndY(), 1, 0, 2 * Math.PI);
    context.stroke();
    context.moveTo(this.x, this.y);
    context.lineTo(this.getEndX(), this.getEndY());
    context.stroke();
  }
}

export { Arm as default };
