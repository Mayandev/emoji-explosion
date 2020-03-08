import './css/index.css'
import { CanvasWriter } from './js/CanvasWriter';
import { Explosion } from './js/Explosion';
let mojeCanvas = null
let mojeCanvases = null;
let mojies = null;


function doSecretEmojiCanvas(txt) {
  const height = 256;

  const singleMojeCanvas = document.createElement("canvas");
  singleMojeCanvas.height = height;
  singleMojeCanvas.width = height;

  const singleMojeContext = singleMojeCanvas.getContext("2d")

  // singleMojeContext.clearRect(0, 0, singleMojeCanvas.width, singleMojeCanvas.height);

  singleMojeContext.translate(singleMojeCanvas.width / 2, singleMojeCanvas.height / 2);

  singleMojeContext.font = `${height}px Georgia`;
  const { width } = singleMojeContext.measureText(txt);
  singleMojeContext.fillText(txt, 0 - (width / 2), 0 + (height / 2.35));

  // singleMojeContext.setTransform(1, 0, 0, 1, 0, 0);

  return singleMojeCanvas
}


let splosions = []
let doingIt = false
let cw = null;

function doit() {
  splosions = splosions.filter((splode) => !splode.isOver());

  if (splosions.length) {
    cw.clear()
    splosions.forEach((boom) => {
      cw.write(mojeCanvas, boom)
    })
    requestAnimationFrame(doit)
  }
}

function setup(x, y) {
  const boom = new Explosion(x, y, mojeCanvases);
  boom.run();

  splosions.push(boom)

  if (!doingIt) {
    requestAnimationFrame(doit);
  }

}
document.addEventListener("DOMContentLoaded", (e) => {

  let canvasDom = document.getElementById("real-one");

  cw = new CanvasWriter(canvasDom);

  const input = document.getElementById("moje")
  const inputHeight = input.clientHeight;
  const defaultEmoji = "🚀 🔥 🌟 💥 🌎 💖 😎 🤩 🥳 🤡 🥰";
  const clientHeight = document.documentElement.clientHeight;
  const clientWidth = document.documentElement.clientWidth;
  canvasDom.setAttribute("height", clientHeight - inputHeight);
  canvasDom.setAttribute("width", clientWidth);

  if (!input.value.length) {
    input.z = localStorage.lastEmoje || '';
  }

  const refreshMojeCanvases = () => {
    mojeCanvases = input.value.length > 0 ? input.value.split(/\s+|\ /).map((moje) => doSecretEmojiCanvas(moje)) : defaultEmoji.split(' ').map((moje) => doSecretEmojiCanvas(moje));
  }

  refreshMojeCanvases();

  const persistInputValue = function (e) {
    localStorage.lastEmoje = this.value;
    refreshMojeCanvases();
  }


  input.addEventListener("blur", persistInputValue);

  let x, y;
  function timerFun() {

    //要执行的操作

    var timer = setTimeout(function () {
      x = Math.random() * clientWidth - clientWidth / 2;
      y = Math.random() * clientHeight - clientHeight / 2;
      console.log(x, y);

      setup(x, y)
      clearTimeout(timer);

      timerFun();


    }, 1000 + Math.random() * 500)

  }
  timerFun();
})