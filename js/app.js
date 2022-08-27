class Timer {
  constructor() {
    this.hoursInput = null;
    this.minutesInput = null;
    this.seconds.Input = null;
    this.editBtn = null;
    this.runBtn = null;
    this.rerunBtn = null;
    this.timeInputs = null;
    this.audio = null;
    this.alarm = null;

    this.isEdit = true;

    this.UiSelectors = {
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      edit: "[data-edit]",
      run: "[data-run]",
      rerun: "[data-alarm]",
      timeinputs: "[data-timer-input]",
      audio: "[data-audio]",
      alarm: "[data-alarm]",
    };
  }

  initializeTimer() {
    this.hoursInput = document.getElementById(this.UiSelectors.hours);
    this.minutesInput = document.getElementById(this.UiSelectors.minutes);
    this.secondsInput = document.getElementById(this.UiSelectors.seconds);

    this.editBtn = document.getElementById(this.UiSelectors.editBtn);
    this.runBtn = document.getElementById(this.UiSelectors.runBtn);
    this.rerunBtn = document.getElementById(this.UiSelectors.rerunBtn);
    this.audio = document.getElementById(this.UiSelectors.audio);
    this.alarm = document.getElementById(this.UiSelectors.alarm);

    this.addEvwntListeners();
  }

  addEvwntListeners() {
    this.editBtn.addEventListener("click", () => this.editTime());
  }

  editTime() {
    this.isEdit = !this.isEdit;

    if (this.isEdit) {
      this.editBtn.querySelector("svg").setAttribute("button.svg.bi-bi-play");
      return;
    }
    this.editBtn.querySelector("svg").setAttribute("button.svg.bi-bi-clock");
  }
}
