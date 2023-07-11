function compute(first = null, mid = null, last = null) {

    let buttons = document.querySelectorAll('button');

    function clickButton() {
        if (mid == null && this.className == 'operand') {
            if (first == 0 || first == null) {
                first = parseInt(this.textContent);
              } else {
                first = parseInt(first.toString() + this.textContent);
              }
              printScreen(first);
        }
        if (last == null && this.className == 'operator') {
            mid = this.textContent;
            printScreen(first, mid);
        }
        if (mid != null && this.className == 'operand') {
            if (last == 0 || last == null) {
                last = parseInt(this.textContent);
              } else {
                last = parseInt(last.toString() + this.textContent);
              }
              printScreen(first, mid, last);
        }
        if (mid != null && last != null && this.className == 'operator') {
            getOperator(first, mid, last, this.textContent);
        }
    }

    function addClickButton() {
        buttons.forEach(button => {
            button.removeEventListener('click', clickButton);
            button.addEventListener('click', clickButton);
        });
    }
    addClickButton();
}

function getOperator(first, mid, last, newMid) {
    if (mid == '/') {
        divide(first, last, newMid);
    }
    else if (mid == '*') {
        multiply(first, last, newMid);
    }
    else if (mid == '-') {
        subtract(first, last, newMid);
    }
    else if (mid == '+') {
        add(first, last, newMid);
    }
}

function add(first, last, newMid) {
    let sum = first+last;
    printScreen(sum, newMid);
    compute(sum, newMid, null);
}

function subtract (first, last, newMid) {
    let dif = first-last;
    printScreen(dif, newMid);
    compute(dif, newMid, null);
}

function multiply (first, last, newMid) {
    let mul = first*last;
    printScreen(mul, newMid);
    compute(mul, newMid, null);
}

function divide (first, last, newMid) {
    let div = Math.round(first/last*10000) / 10000;
    printScreen(div, newMid);
    compute(div, newMid, null);
}

function printScreen(first = 0, mid = null, last = null) {
    let screen = document.querySelector('.screen');
    if (mid == null) {
        screen.textContent = first;
    }
    else if (mid != null && last == null) {
        screen.textContent = first + ' ' + mid;
    }
    else {
        screen.textContent = first + ' ' + mid + ' ' + last;
    }
}

compute();

// create del function first, use array