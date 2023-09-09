import audioNotification from "./audioNotification.js";
import workingStep from "./workingStep.js";

export default async function pomodoro(
  step,
  ALERT_MIDDLE_WORK_TIME,
  WORK_TIME,
  REST_TIME
) {
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  const currentStep = document.getElementById("current-step");

  let interval = setInterval(() => {
    currentStep.innerHTML = step === "Work" ? "Work" : "Rest";
    if (seconds.innerHTML == 0) {
      if (minutes.innerHTML == 0) {
        clearInterval(interval);
        seconds.innerHTML = "00";
        workingStep(false);
        audioNotification("finish");
        minutes.innerHTML = step === "Work" ? REST_TIME : WORK_TIME;
        setTimeout(() => {
          audioNotification("finish");
        }, 500);
        currentStep.innerHTML = step === "Work" ? "Rest" : "Work";
      } else {
        minutes.innerHTML--;
        if (minutes.innerHTML < 10) {
          minutes.innerHTML = "0" + minutes.innerHTML;
        }
        if (
          minutes.innerHTML == ALERT_MIDDLE_WORK_TIME - 1 &&
          seconds.innerHTML == "00"
        ) {
          audioNotification("alert");
        }
        seconds.innerHTML = 59;
      }
    } else {
      seconds.innerHTML--;
      if (seconds.innerHTML < 10) {
        seconds.innerHTML = "0" + seconds.innerHTML;
      }
    }
    document.title = `${minutes.innerHTML}:${seconds.innerHTML} + ${step}`;
  }, 1000);
}
