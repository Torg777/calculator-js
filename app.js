let block = document.querySelector(".block");
let numberN1 = "";
let numberN2 = "";
let numberN1End = Infinity;
let whatSybolArr = [];
let whatSybol;
let sum = "";
let actionN2 = false;


let sybolsArr = ["C", "*", "/", "+", "-", "**", "%", "~", "="];
let numbersArr = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

let calculatorBlock = document.createElement("div");
calculatorBlock.className = "calculator-block";
block.append(calculatorBlock);
let display = document.createElement("div");
display.className = "display";
calculatorBlock.append(display);
let displayInput = document.createElement("input");
display.append(displayInput);
displayInput.className = "display-input";
displayInput.setAttribute("placeholder", `0`);
let calculator = document.createElement("div");
calculator.className = "calculator d-flex";
calculatorBlock.append(calculator);
let numbersBlock = document.createElement("div");
numbersBlock.className = "numbers-block d-flex";
calculatorBlock.append(numbersBlock);


let funcSum = () => {
  for (i = 0; i < displayInput.value.length; i++) {
    if (displayInput.value[i] == sybolsArr[6] || displayInput.value[i] == sybolsArr[7]) {
      whatSybol = displayInput.value[i];
      numberN1End = i
    } else if (i < numberN1End) {
      numberN1 += displayInput.value[i];
    } else if (i > numberN1End) {
      numberN2 += displayInput.value[i];
    }
  }

  if (whatSybol != sybolsArr[6] && whatSybol != sybolsArr[7]) {
    sum = eval(displayInput.value);
  } else if (whatSybol == sybolsArr[6]) {
    sum = eval(numberN1) * eval(numberN2) / 100;
  } else if (whatSybol == sybolsArr[7]) {
    sum = Math.sqrt(eval(numberN1));
  }

  displayInput.value += sybolsArr[8] + sum;
  actionN2 = true;
  whatSybol = undefined;
  numberN1End = Infinity;
  numberN1 = '';
  numberN2 = '';

};


sybolsArr.forEach((e, index) => {
  let sybol = document.createElement("div");
  sybol.className = `sybol sybol-${index} d-flex`;
  sybol.id = `sybol-${index}`;
  calculator.append(sybol);
  sybol.innerHTML = `<p>${e}</p>`;
  sybol.addEventListener("click", () => {

    if (displayInput.value.length != 0) {
      if (index == 0) {
        displayInput.value = displayInput.value.slice(0, -1);
        // actionN2 = false;
        // sum = ''
        // if (displayInput.value == '') { ;  }
      } else if (index == 8) {
        funcSum()
      } else if (index != 0) {
        if (!actionN2) {
          if (isNaN(displayInput.value.slice(-1))) {
            displayInput.value = displayInput.value.slice(0, -1);
            if (isNaN(displayInput.value.slice(-1))) {
              displayInput.value = displayInput.value.slice(0, -1);
            }
          }
          displayInput.value += e;
        } else {
          displayInput.value = sum + e;
          actionN2 = false;
        }
      }
    }
  });
});

numbersArr.forEach((e) => {
  let number = document.createElement("div");
  number.className = `number number-${e} d-flex`;
  numbersBlock.append(number);
  number.innerHTML = `<p>${e}</p>`;
  number.addEventListener("click", () => (displayInput.value += e));
});
