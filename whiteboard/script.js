const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

let drawing = false;
let color = "#000000";
let brushSize = 5;
let isAddingTextbox = false;

// Tools
const colorPicker = document.getElementById("colorPicker");
const brushSizeInput = document.getElementById("brushSize");
const clearBoard = document.getElementById("clearBoard");
const addTextbox = document.getElementById("addTextbox");

colorPicker.addEventListener("input", (e) => {
  color = e.target.value;
});

brushSizeInput.addEventListener("input", (e) => {
  brushSize = e.target.value;
});

clearBoard.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

addTextbox.addEventListener("click", () => {
  isAddingTextbox = true;
  canvas.style.cursor = "text";
  console.log("Add Text");
});

// Drawing functionality
canvas.addEventListener("mousedown", (e) => {
  if (isAddingTextbox) {
    console.log("1-Adding textbox");
    addTextBox(e.clientX, e.clientY);
    isAddingTextbox = false;
    canvas.style.cursor = "crosshair";
    return;
  }
  drawing = true;
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function addTextBox(x, y) {
  const input = document.createElement("input");
  input.type = "text";
  input.style.left = `${x}px`;
  input.style.top = `${y}px`;
  input.style.zIndex=1000;
  input.style.backgroundColor="red";

  document.body.appendChild(input);
// input.focus();
console.log(input);
  input.addEventListener("blur", () => {
    const text = input.value;
    if (text.trim() !== "") {
      ctx.fillStyle = color;
      ctx.font = "16px Arial";
      ctx.fillText(text, x - canvas.offsetLeft, y - canvas.offsetTop + 16); // Adjust for baseline
    }
    alert();
    // document.body.removeChild(input);
  });

  input.focus();
}

// Resize canvas dynamically
window.addEventListener("resize", () => {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(canvas, 0, 0);

  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 100;
  ctx.drawImage(tempCanvas, 0, 0);
});
