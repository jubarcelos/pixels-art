window.onload = function selectBlackColor() {
  document.getElementsByClassName('color')[0].className += ' selected';
};

function generateColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}
generateColor();

// criar os quatro quadrados da paleta de cores com classe, tamanho e cor sorteada.
function createPalette() {
  const palette = document.querySelector('#color-palette');
  for (let index = 0; index < 4; index += 1) {
    let color = 0;
    if (index === 0) {
      color = 'rgb(0,0,0)';
    } else {
      color = generateColor();
    }
    const colorItem = document.createElement('div');
    colorItem.style.width = '40px';
    colorItem.style.height = '40px';
    colorItem.style.border = 'solid 1px black';
    colorItem.style.background = color;
    colorItem.classList.add('color');
    palette.appendChild(colorItem);
  }
}
createPalette();

// criar o batão de reset
function creatResetButton() {
  const limpar = document.querySelector('.buttons');
  const button = document.createElement('button');
  button.id = 'clear-board';
  button.className = 'buttons';
  button.innerText = 'Limpar';
  limpar.appendChild(button);
}
creatResetButton();

// criar os quadrados pintáveis.
const bigSquareToPint = document.querySelector('#pixel-board');
const inputSquares = document.querySelector('#board-size');
let bigSquareBase = 0;

function createLineSquares(num) {
  // const num = document.querySelector('input');
  for (let index = 0; index < num; index += 1) {
    const line = document.createElement('div');
    line.classList.add('pixel');
    line.style.backgroundColor = 'rgb(255,255,255)';
    bigSquareToPint.appendChild(line);
  }
}
// ajuste do biSquare com a ajuda do Fernando Mós
function createPixel(num) {
  const spaceBox = 42; // tamanho do pixel
  for (let index = 0; index < num; index += 1) {
    const pixelBox = document.createElement('div');
    bigSquareToPint.appendChild(pixelBox);
    bigSquareToPint.style.width = `${spaceBox * num}px`;
    createLineSquares(num);
  }
}
createPixel(5);

// para que o usuário defina o número de quadrados - Ajuda do Bernardo
const selectButtonBigSquare = document.querySelector('#generate-board');
selectButtonBigSquare.addEventListener('click', () => {
  bigSquareToPint.innerHTML = '';
  if (inputSquares.value === '') {
    alert('Board inválido!');
  }
  if (inputSquares.value < 5) {
    bigSquareBase = 5;
    createPixel(bigSquareBase);
  } else if (inputSquares.value > 50) {
    bigSquareBase = 50;
    createPixel(bigSquareBase);
  } else {
    bigSquareBase = (inputSquares.value);
    createPixel(bigSquareBase);
  }
});

// selecionar a cor dentro da paleta - event.target aplica ao elemento selecionado (Brunão e Fumagalli me ajudaram a codar a lógica que desenvolvi)

const palette = document.querySelectorAll('.color');
for (let index = 0; index < palette.length; index += 1) {
  palette[index].addEventListener('click', (event) => {
    for (index = 0; index < palette.length; index += 1) {
      document.querySelector('.selected').classList.remove('selected');
      event.target.classList.add('selected');
    }
  });
}

// Para transferir a cor da paleta para o quadro pintável - correção de bug de pintar section com ajuda do Emerson Moreira.
function pintSquare(event) {
  const colorSelect = document.querySelector('.selected');
  const result = getComputedStyle(colorSelect).backgroundColor;
  const boardBox = event.target;
  if (boardBox.classList.contains('pixel')) {
    boardBox.style.backgroundColor = result;
  }
}
bigSquareToPint.addEventListener('click', pintSquare);
// essa variável foi declarada no escopo aberto, no momento de criar os quadrados pintáveis.

// função para limpar o bigSquare
const clear = document.querySelector('#clear-board');
clear.addEventListener('click', () => {
  const bigSquares = bigSquareToPint.children;
  for (let index = 0; index < bigSquares.length; index += 1) {
    bigSquares[index].style.backgroundColor = 'rgb(255,255,255)';
  }
});
