const display = document.querySelector(".calcDisplay");
const history = document.querySelector(".history");

let displayVal = "0";
let prevVal = "";
let selectedOperator = "";
let startNewNum = true;
let enterClicked = false;

function setup() {
    document.querySelectorAll(".number").forEach(num => {
        num.addEventListener("click", insertNumber);
    });

    document.querySelectorAll(".operator").forEach(op => {
        op.addEventListener("click", insertOperator);
    });

    document.querySelector(".enter").addEventListener("click", equate);
}

function insertNumber(event) {
    if (enterClicked) {
        clearAll();
        enterClicked = false;
    }
    if (startNewNum) {
        displayVal = "";
        startNewNum = false;
    }
    displayVal += event.target.innerText;
    updateDisplay();
}

function insertOperator(event) {
    if (enterClicked) {
        history.innerText = displayVal + selectedOperator;
        prevVal = displayVal;
        enterClicked = false;
    }
    if (!startNewNum) {
        let oldOperator = selectedOperator;
        selectedOperator = event.target.innerText; 
        history.innerText += displayVal + selectedOperator;
        if (prevVal != "") displayVal = operate(oldOperator, prevVal, displayVal);
        prevVal = displayVal;
        updateDisplay();
        startNewNum = true;
    }
    else {
        selectedOperator = event.target.innerText;
        history.innerText = history.innerText.slice(0, -1) + selectedOperator; 
    }
}

function insertDecimal(event) {

}

function equate(event) {
    if (!startNewNum) {
        history.innerText += displayVal + "=";
        displayVal = operate(selectedOperator, prevVal, displayVal);
        prevVal = displayVal;
        updateDisplay();
        startNewNum = true;
        enterClicked = true;
    }
}

function operate(op, prev, curr) {
    [prev, curr] = [prev - 0, curr - 0];
    switch (op) {
        case "+":
            return prev + curr;
        case "-":
            return prev - curr;
        case "×":
            return prev * curr;
        case "÷":
            return prev / curr;
        case "%":
            return prev % curr; // Not intended function, but okei
    }
}

function clearAll() {
    displayVal = "0";
    prevVal = "";
    selectedOperator = "";
    history.innerText = "";
    startNewNum = true;
    updateDisplay();
}

function deleteChar() {

}

function updateDisplay() {
    display.innerText = displayVal;
}


function lastChar(str) {
    return str.charAt(str.length - 1);
}

function isOperator(char) {
    return "+-×÷%".includes(char);
}

window.onload = setup;