const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const equals = document.querySelector('.equal');
const signs = document.querySelectorAll('.sign');
const reset = document.querySelector('.reset');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";

let resultValue = 0;

const getFirstValue = (el) => {
  result.innerHTML = "";
  firstValue += el;
  result.innerHTML = firstValue;
  firstValue = +firstValue;
};

const getSecondValue = (el) => {
  if (firstValue !== "" && sign !== "") {
    secondValue += el;
    result.innerHTML = secondValue;
    secondValue = +secondValue;
  }
};

const getSign = () => {
  signs.forEach((s) => {
    s.addEventListener("click", (e) => {
      sign = e.target.getAttribute("value");
      isFirstValue = true;
    });
  });
};

const performCalculation = () => {
  result.innerHTML = "";
  switch (sign) {
    case "+":
      resultValue = firstValue + secondValue;
      break;
    case "-":
      resultValue = firstValue - secondValue;
      break;
    case "*":
      resultValue = firstValue * secondValue;
      break;
    case "/":
      resultValue = firstValue / secondValue;
      break;
  }
  result.innerHTML = resultValue;
  firstValue = resultValue;
  secondValue = "";
  checkResultLength();
};

const checkResultLength = () => {
  resultValue = JSON.stringify(resultValue);
  if (resultValue.length >= 8) {
    resultValue = JSON.parse(resultValue);
    result.innerHTML = resultValue.toFixed(5);
  }
};

numbers.forEach((n) => {
  n.addEventListener("click", (e) => {
    const atr = e.target.getAttribute("value");
    if (!isFirstValue) {
      getFirstValue(atr);
    }
    if (!isSecondValue) {
      getSecondValue(atr);
    }
  });
});

equals.addEventListener("click", performCalculation);

getSign();



negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue != "") {
        firstValue = firstValue * -1;
        resultValue = firstValue;
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
        secondValue = secondValue * -1;
        resultValue = secondValue;
    }
    result.innerHTML = resultValue;
});


function applyPercent() {
    result.innerHTML = "";
    if (firstValue != "") {
      firstValue = firstValue / 100;
      result.innerHTML = firstValue;
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
      secondValue = secondValue / 100;
      result.innerHTML = secondValue;
    }
  }
  percent.addEventListener('click', applyPercent);

  reset.addEventListener('click', () =>{
    result.innerHTML= 0;
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue= false;
    sign = "";
    resultValue = 0;
  })