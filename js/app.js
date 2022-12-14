class Timer {
  constructor() {
    this.hoursInput = null;
    this.minutesInput = null;
    this.secondsInput = null;
    this.editBtn = null;
    this.runBtn = null;
    this.rerunBtn = null;
    this.timerInputs = null;
    this.audio = null;
    this.alarm = null;

    this.iconsPath = "node_modules/bootstrap-icons/bootstrap-icons.svg#";

    this.isEdit = true;
    this.isCounting = false;

    this.interval = null;

    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.totalTime = 0;
    this.currentTime = 0;
    this.maxSeconds = 60;
    this.maxMinutes = 60;
    this.maxHours = 99;
    this.maxTime =
      this.maxHours * 3600 + (this.maxMinutes - 1) * 60 + this.maxSeconds - 1;

    this.UiSelectors = {
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      edit: "[data-edit]",
      run: "[data-run]",
      rerun: "[data-rerun]",
      timeInput: "[data-timer-input]",
      audio: "[data-audio]",
      alarm: "[data-alarm]",
    };
  }

  initializeTimer() {
    this.hoursInput = document.getElementById(this.UiSelectors.hours);
    this.minutesInput = document.getElementById(this.UiSelectors.minutes);
    this.secondsInput = document.getElementById(this.UiSelectors.seconds);

    this.editBtn = document.querySelector(this.UiSelectors.edit);
    this.runBtn = document.querySelector(this.UiSelectors.run);
    this.rerunBtn = document.querySelector(this.UiSelectors.rerun);
    this.timerInputs = document.querySelectorAll(this.UiSelectors.timeInput);
    this.audio = document.querySelector(this.UiSelectors.audio);
    this.alarm = document.querySelector(this.UiSelectors.alarm);

    this.addEventListeners();
  }

  addEventListeners() {
    this.editBtn.addEventListener("click", () => this.switchEditTime());
    this.runBtn.addEventListener("click", () => this.switchTimer());
    this.rerunBtn.addEventListener("click", () => this.resetTimer());
    this.alarm.addEventListener("click", () => this.stopAlarm());

    this.timerInputs.forEach((input) =>
      input.addEventListener(
        "keyup",
        (e) => e.keyCode === 13 && this.switchEditTime()
      )
    );
  }

  switchEditTime() {
    this.isEdit = !this.isEdit;

    if (this.isEdit) {
      this.isCounting = false;
      clearInterval(this.interval);
      this.selectUseElement(this.editBtn).setAttribute(
        "xlink:href",
        `${this.iconsPath}check-circle`
      );
      this.selectUseElement(this.runBtn).setAttribute(
        "xlink:href",
        `${this.iconsPath}play-circle`
      );

      this.timerInputs.forEach((timerInput) => {
        timerInput.removeAttribute("disabled");
      });
      this.runBtn.setAttribute("disabled", "");
      this.getTimerValues();
      this.setTimerValues();
      return;
    }

    this.selectUseElement(this.editBtn).setAttribute(
      "xlink:href",
      `${this.iconsPath}pencil`
    );
    this.timerInputs.forEach((timerInput) => {
      timerInput.setAttribute("disabled", "");
    });
    this.runBtn.removeAttribute("disabled");

    this.getTimerValues();
    this.setTimerValues();
  }

  switchTimer() {
    this.isCounting = !this.isCounting;
    if (this.isCounting) {
      this.selectUseElement(this.runBtn).setAttribute(
        "xlink:href",
        `${this.iconsPath}pause-circle`
      );
      this.interval = setInterval(() => this.updateTime(), 1000);
      return;
    }
    this.selectUseElement(this.runBtn).setAttribute(
      "xlink:href",
      `${this.iconsPath}play-circle`
    );

    clearInterval(this.interval);
  }

  selectUseElement(element) {
    return element.querySelector("use");
  }
  getTimerValues() {
    this.hours = parseInt(this.hoursInput.value, 10);
    this.minutes = parseInt(this.minutesInput.value, 10);
    this.seconds = parseInt(this.secondsInput.value, 10);

    this.countTotalTime();
  }

  setTimerValues() {
    const seconds = `0${this.currentTime % this.maxSeconds}`;
    const minutes = `0${Math.floor(this.currentTime / 60) % this.maxMinutes}`;
    const hours = `0${Math.floor(this.currentTime / 3600)}`;

    this.secondsInput.value = seconds.slice(-2);
    this.minutesInput.value = minutes.slice(-2);
    this.hoursInput.value = hours.slice(-2);
  }

  countTotalTime() {
    const timeSum = this.seconds + this.minutes * 60 + this.hours * 3600;
    this.totalTime = timeSum <= this.maxTime ? timeSum : this.maxTime;

    this.currentTime = this.totalTime;
  }

  updateTime() {
    if (this.currentTime) {
      this.currentTime--;
      this.setTimerValues();
      return;
    }
    clearInterval(this.interval);
    this.audio.play();
    this.alarm.classList.remove("hide");
    this.editBtn.setAttribute("disabled", "");
    this.runBtn.setAttribute("disabled", "");
    this.rerunBtn.setAttribute("disabled", "");
  }

  stopAlarm() {
    this.audio.pause();
    this.alarm.classList.add("hide");
    this.editBtn.removeAttribute("disabled");
    this.runBtn.removeAttribute("disabled");
    this.rerunBtn.removeAttribute("disabled");
    this.switchEditTime();
  }
  resetTimer() {
    this.currentTime = this.totalTime;
    this.setTimerValues();
  }
}

function showTime() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();
