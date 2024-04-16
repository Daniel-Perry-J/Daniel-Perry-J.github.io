const calculator = document.getElementById('calculator');
const display1 = document.getElementById('result');
const display2 = document.getElementById('operations');

// console.log('calculator=' + calculator);

// console.log('display=' + display);

let result = 0;  // final result of calculator
let acc = 0;  // accumulator for calculator
let cur = 0;  // current value being entered
let lastAction = null  // action

function handleCalculator(key) {
    let action = key;
    let asNumber = Number(key);
    console.log(`dataBefore: result=${result}, acc=${acc}, cur=${cur}, lastAction=${lastAction}, curAction=${action}`);

    if (!isNaN(asNumber)) {
        console.log(`Read the number : ${asNumber}`);
        cur*=10;
        cur+=asNumber;
        result = cur;
    } else {
        if (lastAction == null) {
            lastAction = action;
            acc = result;
            cur = 0;
            result = cur;
        } else {
            switch (lastAction) {
                case 'add':
                case '+':
                    acc += cur;
                    break;
                case 'subtract':
                case '-':
                    acc -= cur;
                    break;
                case 'divide' :
                case '/' :
                    if(cur==0) {
                        result = "Error!";
                    } else {
                        acc /= cur;
                    }
                    break;
                case 'mult' :
                case '*' :
                    acc *= cur;
                    break;
                case 'equals' :
                case '=' :
                case 'Enter' :
                    result = acc;
                    cur = acc;
                    break;
                case 'clear' :
                case 'Escape' :
                    result = 0;
                    acc = 0;
                    cur = 0;
                    lastAction = null;
                    break;
                case 'clear-entry' :
                case 'Backspace' :
                    cur = 0;
                    result = 0;
                    lastAction = null;
                    break;
                default:
                    console.log('Error!');
                    result = "Error!";
            }
            if (action=='clear' || action=='Escape') {
                result = 0;
                acc = 0;
                cur = 0;
                lastAction = null;
            } else if (action=='clear-entry' || action=='Backspace') {
                cur = 0;
                result = 0;
                lastAction = null;
            } else if (action!='equals' && action!='=' && action!='Enter') {
                lastAction = action;
                result = 0;
                cur = 0;
            } else {
                console.log(`result=${result}, acc=${acc}`);
                result = acc;
            }
        }
    }

    console.log(`dataAfter: result=${result}, acc=${acc}, cur=${cur}, lastAction=${lastAction}, curAction=${action}`);
    // Update the display
    display1.textContent = "" + result;
    display2.textContent = "" + acc;
}

calculator.addEventListener('click', (event) => {
    if (event.target.matches('button')) {
        const key = event.target; // where we clicked
        const action = key.id; // what action to perform
        console.log(`The button ${action} was clicked.`);
        handleCalculator(action);
    }
});

document.addEventListener('keyup', (event) => {
    const releasedKey = event.key;
    console.log(`The key "${releasedKey}" was released.`);
    handleCalculator(event.key);
});
