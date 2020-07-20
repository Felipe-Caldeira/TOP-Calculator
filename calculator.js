const display = document.querySelector(".calcDisplay");
const history = document.querySelector(".history");

let displayVal = "0";
let prevVal = "0";
let selectedOperator = "";
let pastEquateVal;
let startNewNum = true;
let enterClicked = false;

function setup() {
    document.querySelectorAll(".number").forEach(num => {
        num.addEventListener("click", insertNumber);
    });

    document.querySelectorAll(".operator").forEach(op => {
        op.addEventListener("click", insertOperator);
    });

    document.querySelector(".decimal").addEventListener("click", insertDecimal);

    document.querySelector(".enter").addEventListener("click", equate);

    document.querySelector(".delete").addEventListener("click", deleteChar);
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
    if (displayVal.length > 20) return;
    (displayVal == "0") ? displayVal = event.target.innerText: displayVal += event.target.innerText;
    updateDisplay();
}

function insertOperator(event) {
    if (enterClicked) {
        history.innerText = displayVal + (selectedOperator || event.target.innerText);
        prevVal = displayVal;
        enterClicked = false;
    }
    if (!startNewNum) {
        let oldOperator = selectedOperator;
        selectedOperator = event.target.innerText;
        history.innerText += displayVal + selectedOperator;
        displayVal = operate(oldOperator, prevVal, displayVal);
        prevVal = displayVal;
        updateDisplay();
        startNewNum = true;
    } else {
        selectedOperator = event.target.innerText;
        history.innerText = (history.innerText.slice(0, -1) || 0) + selectedOperator;
    }
}

function insertDecimal(event) {
    if (displayVal.includes(".") || displayVal.length > 20) return;
    if (startNewNum) {
        displayVal = "0."
        startNewNum = false;
    }
    else {
        displayVal += ".";
    }
    updateDisplay();
}

function equate(event) {
    if (Debs()) return;
    if (enterClicked) {
        history.innerText = prevVal + selectedOperator + pastEquateVal + "=";
        displayVal = operate(selectedOperator, displayVal, pastEquateVal);
        prevVal = displayVal;
        updateDisplay();
    }
    if (!startNewNum) {
        history.innerText += displayVal + "=";
        pastEquateVal = displayVal;
        displayVal = operate(selectedOperator, prevVal, displayVal);
        prevVal = displayVal;
        updateDisplay();
        startNewNum = true;
        enterClicked = true;
    }
}

function operate(op, prev, curr) {
    if (op == "") {
        return curr;
    }
    [prev, curr] = [prev - 0, curr - 0];
    let result;
    switch (op) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "×":
            result = prev * curr;
            break;
        case "÷":
            result = prev / curr;
            break;
        case "%":
            result = prev % curr; // Not intended function, but okei
            break;
    }

    result = result.toString();
    // if (result.length > 21) {
    //     let wholePart, decimalPart;
    //     [wholePart, decimalPart] = result.split(".");
    //     if (!decimalPart || wholePart.length > 20) {
    //         result = "OVERFLOW";
    //     }
    //     else {
    //         result = wholePart + "." + decimalPart.slice(0, 21 - wholePart.length);
    //     }
    // }
    return result;
}

function clearAll() {
    displayVal = "0";
    prevVal = "0";
    selectedOperator = "";
    history.innerText = "";
    startNewNum = true;
    updateDisplay();
}

function deleteChar() {
    if (!startNewNum) {
        displayVal = displayVal.slice(0, -1);
        if (!displayVal) displayVal = 0;
        updateDisplay();
    }
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



function Debs() {
    if (["9999", "991999", "9091999", "0.9091999"].includes(displayVal)) {
        displayVal = "Thanks for all your support! I love you babe 😘❤"
        updateDisplay();
        displayVal = "0";
        history.innerText = "";

        clearTimeout(heartGrow);
        heartGrow();
        setTimeout(heartGrow, 3000);

        return true;
    }
}

function heartGrow() {
    document.querySelector(".heart").classList.toggle("heartGrow")
}
