import audioNotification from "./src/audioNotification";
import pomodoro from "./src/pomodoro";
import dayjs from "dayjs";
import NoSleep from "nosleep.js";
import "./style.css";

function log(message) {
  console.log(message);
}

dayjs.locale("pt-BR");
const nosleep = new NoSleep();
nosleep.enable();

async function startPomodoroWorkTime() {
  let WORK_TIME = localStorage.getItem("workTime") || 25;
  let REST_TIME = localStorage.getItem("restTime") || 5;
  const ALERT_MIDDLE_WORK_TIME = 5;
  let pomodoroStep = "Work";
  const start = document.getElementById("start");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  const actionDescription = document.getElementById("action-description");
  const currentDate = document.getElementById("current-date");

  currentDate.innerHTML = dayjs().format("ddd, D MMM, YYYY");

  actionDescription.addEventListener("input", () => {
    localStorage.setItem("actionDescription", actionDescription.value);
  });

  actionDescription.value = localStorage.getItem("actionDescription") || "";

  const inputWorkTime = document.getElementById("work-time");
  inputWorkTime.value = localStorage.getItem("workTime") || WORK_TIME;

  const inputRestTime = document.getElementById("rest-time");
  inputRestTime.value = localStorage.getItem("restTime") || REST_TIME;

  inputWorkTime.addEventListener("change", () => {
    WORK_TIME = inputWorkTime.value;
    minutes.innerHTML = WORK_TIME;
    localStorage.setItem("workTime", WORK_TIME);
  });

  inputRestTime.addEventListener("change", () => {
    REST_TIME = inputRestTime.value;
    localStorage.setItem("restTime", REST_TIME);
  });

  if (minutes) {
    minutes.innerHTML = localStorage.getItem("workTime") || WORK_TIME;
  }

  if (start) {
    start.addEventListener("click", () => {
      inputRestTime.disabled = true;
      inputWorkTime.disabled = true;
      audioNotification("start");
      if (minutes.innerHTML != 0 || seconds.innerHTML != 0) {
        minutes.innerHTML = pomodoroStep === "Work" ? WORK_TIME : REST_TIME;
        seconds.innerHTML = "00";
      }
      pomodoro(pomodoroStep, ALERT_MIDDLE_WORK_TIME, WORK_TIME, REST_TIME);
      pomodoroStep = pomodoroStep === "Work" ? "Rest" : "Work";
    });
  }
}

startPomodoroWorkTime();
