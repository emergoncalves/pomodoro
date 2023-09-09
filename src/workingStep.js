export default function workingStep(isWorking) {
  const coffeeImg = document.querySelector("#coffee-img");
  const startImg = document.querySelector("#start-img");
  const inputRestTime = document.getElementById("rest-time");
  const inputWorkTime = document.getElementById("work-time");

  if (isWorking) {
    coffeeImg.classList.add("hidden");
    startImg.classList.remove("hidden");
  } else {
    coffeeImg.classList.remove("hidden");
    startImg.classList.add("hidden");
    inputWorkTime.disabled = false;
    inputRestTime.disabled = false;
  }
}
