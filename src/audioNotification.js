export default function audioNotification(type) {
  const notification = {
    finish: new Audio("./assets/finish.mp3"),
    alert: new Audio("./assets/alert.mp3"),
    start: new Audio("./assets/start.mp3"),
  };

  notification[type].play();
}
