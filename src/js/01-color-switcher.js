const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    const hex = getRandomHexColor();
    document.querySelector('body').style.backgroundColor = hex;
    console.log(hex);
  }, 1000);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  console.log(`${timerId}`);
});
