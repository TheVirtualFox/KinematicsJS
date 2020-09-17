import ArmControl from "./arm_control";
import Arm from "./arm";

class App {
  constructor() {
    // INIT CANVAS
    this.paper = document.querySelector("#paper");
    this.canvas = document.getElementById("canvas");
    this.canvasDraw = document.getElementById("canvasDraw");
    this.context = this.canvas.getContext("2d");
    this.contextDraw = this.canvasDraw.getContext("2d");
    this.contextDraw.lineWidth = 0.25;
    this.width = this.canvasDraw.width = this.canvas.width = this.paper.clientWidth;
    this.height = this.canvasDraw.height = this.canvas.height = this.paper.clientHeight;
    // INIT APP
    this.drawing = true;
    this.armControls = [];
    this.lastArm = null; // todo
    this.angle = 0;
    // INIT EVENT LISTENERS
    window.addEventListener("resize", () => {
      this.width = this.canvasDraw.width = this.canvas.width = this.paper.clientWidth;
      this.height = this.canvasDraw.height = this.canvas.height = this.paper.clientHeight;
      if (this.armControls.length) {
        this.armControls[0].arm.x = this.width / 2;
        this.armControls[0].arm.y = this.height / 2;
      }
    });
    document.querySelector("#draw-btn").addEventListener("click", (event) => {
      // todo
      this.drawing = !this.drawing;
      if (this.drawing) {
        event.currentTarget.classList.add("draw-btn-active");
      } else {
        event.currentTarget.classList.remove("draw-btn-active");
      }
    });
    document.querySelector("#add-arm-btn").addEventListener("click", () => {
      this.addArm();
    });
    document.querySelector("#clear-btn").addEventListener("click", () => {
      this.contextDraw.clearRect(0, 0, this.width, this.height);
      this.contextDraw.beginPath();
    });

    document.querySelector("#remove-arm-btn").addEventListener("click", () => {
      debugger;
      if (this.armControls.length > 1) {
        this.armControls[this.armControls.length - 1].remove();
        this.armControls.pop();
      }
    });
    this.addArm(99, 0.5, 1);
    this.addArm(99, 0.009, 3);
    // UPDATE
    this.update();
  }

  addArm(amplitude, frequency, phase) {
    const x = this.lastArm ? this.lastArm.getEndX() : this.width / 2;
    const y = this.lastArm ? this.lastArm.getEndY() : this.height / 2;
    const arm = new Arm(x, y, this.angle);
    arm.parent = this.lastArm;
    const control = new ArmControl(
      "#arms-control-panel",
      arm,
      amplitude,
      frequency,
      phase
    );
    control.render();
    this.armControls.push(control);
  }

  update() {
    if (this.drawing && this.armControls.length) {
      this.contextDraw.beginPath();
      this.contextDraw.moveTo(
        this.armControls[this.armControls.length - 1].arm.getEndX(),
        this.armControls[this.armControls.length - 1].arm.getEndY()
      );
    }
    this.context.clearRect(0, 0, this.width, this.height);
    let lastArmControl = null;
    this.armControls.forEach((armControl, i, arr) => {
      armControl.arm.t = this.angle;
      if (lastArmControl) {
        armControl.arm.x = lastArmControl.arm.getEndX();
        armControl.arm.y = lastArmControl.arm.getEndY();
      }
      armControl.arm.render(this.context);
      lastArmControl = armControl;
    });
    this.angle += 0.05;
    if (this.drawing && this.armControls.length) {
      this.contextDraw.lineTo(
        this.armControls[this.armControls.length - 1].arm.getEndX(),
        this.armControls[this.armControls.length - 1].arm.getEndY()
      );
      this.contextDraw.stroke();
    }
    requestAnimationFrame(this.update.bind(this));
  }
}

export { App as default };
