const ref = {
  startBtn: document.querySelector(`[data-start]`),
  stopBtn: document.querySelector(`[data-stop]`),
  backgBody: document.querySelector(`body`)
};
let timerId = null;

ref.startBtn.addEventListener("click", () => {
 
  timerId = setInterval(() => {
    if(timerId!==null){
      ref.startBtn.disabled = true;
    }
    ref.backgBody.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }, 1000)});

ref.stopBtn.addEventListener("click", () => {
  clearInterval(timerId); 
  ref.startBtn.disabled = false;
});



