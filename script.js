let operatorList = ['/', '*', '-', '+'];

function compute() {
    let buttons = document.querySelectorAll('button');
    let operation = ['0'];
    let currentOperator = '';
    let isDecimal = false;
    let sign = '+';

    buttons.forEach(button => {
        button.removeEventListener('click', clickButton);
        button.addEventListener('click', clickButton);

        function clickButton() {
            let lastElement = operation[operation.length-1];
            if (operation == 'ERROR') {
                operation = ['0'];
            }
            if (button.className == 'operand') {
                if (operation == '0') {
                    operation[0] = button.textContent
                }
                else if (button.textContent == '0' && operation[operation.length-1] == 0 && operatorList.some(item => operation[operation.length-2].includes(item))) {
                    // Do nothing
                }
                else {
                    operation.push(button.textContent);
                }
            }

            if (button.className == 'operator') {
                if (operation.some(item => operatorList.includes(item))) {
                    if (operatorList.some(item => lastElement.includes(item)) == false) {
                        [sign, operation] = getOperand(sign, operation);
                        if (operation != 'ERROR') {
                            operation.push(button.textContent);
                            currentOperator = button.textContent;
                        }
                    }
                    else {
                        operation.pop();
                        operation.push(button.textContent);
                        currentOperator = button.textContent;
                    }
                }
                else if (operation != '0' && lastElement != '.') {
                    operation.push(button.textContent);
                    currentOperator = button.textContent;
                }
                isDecimal = false; 
            }

            if (button.className == 'delete') {
                if (lastElement == '.') {
                    isDecimal = false;
                }
                operation.pop();
                if (operation == '') {
                    operation[0] = '0';
                }
            }

            if (button.className == 'clear') {
                operation = [];
                operation[0] = '0';
                isDecimal = false;
                sign = '+';
            }

            if (button.className == 'decimal') {
                if (isDecimal == false && operatorList.some(item => lastElement.includes(item)) == false) {
                    operation.push('.');
                    isDecimal = true;
                }
            }

            if (button.className == 'equal') {
                if (operation.some(item => operatorList.includes(item)) && operatorList.some(item => lastElement.includes(item)) == false) {
                    [sign, operation] = getOperand(sign, operation);
                }
            }



            let screen = document.querySelector('.screen');
            screen.textContent = printScreen(sign, operation);
            console.log(sign, operation);


        }
    });
}

function printScreen(sign, operation) {
    if (sign == '-') {
        return sign + operation.join('');
    }
    else {
        return operation.join('');
    }
}

function getOperand(sign, operation) {
    let operator = getOperator(operation);
    let operationString = operation.join('');
    let operand = operationString.split(operator);
    if (sign == '-') {
        operand[0] = sign+operand[0];
    }
    let result;
    if (operator == '+') {
        result = parseFloat(operand[0]) + parseFloat(operand[1]);
    }    
    else if (operator == '-') {
        result = parseFloat(operand[0]) - parseFloat(operand[1]);
    }
    else if (operator == '*') {
        result = parseFloat(operand[0]) * parseFloat(operand[1]);
    }
    else if (operator == '/') {
        if (parseFloat(operand[1]) == 0) {
            return [sign='+', ['ERROR']];
        }
        result = parseFloat(operand[0]) / parseFloat(operand[1]);
    }

    operation = [];
    if (result < 0) {
        sign = '-';
        result = result * -1;
    }
    else {
        sign = '+';
    }
    result = parseFloat(result.toFixed(4));
    resultString = result.toString();
    operation.push(resultString);
    return [sign, operation];
} 

function getOperator(operation) {
    let operator = '';
    let toInt = [];
    for (let i=0; i<operation.length; i++) {
        if (operation[i] == '.') {
            toInt.push(0);
        }
        else {
            toInt.push(parseInt(operation[i]));
        }
        if (isNaN(toInt[i])) {
            operator = operation[i];
        }
    }
    return operator;
}


compute();




// in the equal function, pass operation as well as sign


// function first() {
//     let a = 50;
//     a = sec(a);
//     console.log(a);
// }

// function sec(a) {
//     let b = 10 + a;
//     b = third(b);
//     return b;
// }

// function third(b) {
//     let c = b + 10;
//     return c;
// }

//first();

