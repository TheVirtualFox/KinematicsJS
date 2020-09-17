class ArmControl {
  constructor(
    selector,
    arm,
    amplitude = 22,
    frequency = 1,
    phase = 1,
    id = ArmControl.createdControls
  ) {
    this.selector = selector;
    this.id = id;
    this.arm = arm;
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.phase = phase;

    this.arm.amplitude = this.amplitude;
    this.arm.frequency = this.frequency;
    this.arm.phase = this.phase;
    this.controls = null;
    ArmControl.createdControls++;
  }

  renderTextInput(name, initValue, attr) {
    const control = document.createElement("div");
    control.id = `${this.id}_${name}_control`;
    control.classList.add("control");
    // input
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add(`${name}_control`);
    input.name = `${this.id}_${name}_control`;
    input.value = initValue;
    input.addEventListener("change", (event) => {
      this[attr] = +event.currentTarget.value;
      this.arm[attr] = +event.currentTarget.value;
    });
    // label
    const label = document.createElement("label");
    label.htmlFor = input.name;
    label.innerHTML = name;
    control.appendChild(label);

    control.appendChild(input);
    return control;
  }

  render() {
    const controls = document.createElement("div");
    controls.id = "id" + this.id + "_controls";
    controls.classList.add("controls");
    // controls.appendChild(this.renderTextInput("length", "1", "length"));
    controls.appendChild(
      this.renderTextInput("amplitude", this.amplitude, "amplitude")
    );
    controls.appendChild(
      this.renderTextInput("frequency", this.frequency, "frequency")
    );
    controls.appendChild(this.renderTextInput("phase", this.phase, "phase"));
    document.querySelector(this.selector).appendChild(controls);
    this.controls = controls;
  }
  remove() {
    document.querySelector("#" + this.controls.id).remove();
  }
}

ArmControl.createdControls = 0;

export { ArmControl as default };
