const calculator = document.getElementById('calculator');
const display1 = document.getElementById('result');
const display2 = document.getElementById('operations');

// console.log('calculator=' + calculator);

// console.log('display=' + display);

var result = 0;  // final result of calculator
var acc = 0;  // accumulator for calculator
var cur = 0;  // current value being entered
var lastAction = null  // action

calculator.addEventListener('click', (event) => {
    if (event.target.matches('button')) {
        const key = event.target; // where we clicked
        const action = key.id; // what action to perform

        // console.log(`action=${action}`);

        if (key.className === 'numbers') {
            // logic for numbers
            // console.log(`number=${action}`);
            cur*=10;
            cur+=parseInt(action);
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
                        acc += cur;
                        break;
                    case 'subtract':
                        acc -= cur;
                        break;
                    case 'divide':
                        if(cur==0) {
                            result = "Error!";
                        } else {
                            acc /= cur;
                        }
                        break;
                    case 'mult':
                        acc *= cur;
                        break;
                    case 'equals':
                        result = acc;
                        cur = acc;
                        break;
                    default:
                        result = "Error!";
                }
                lastAction = action;
            }
        }

        // Update the display
        display1.textContent = "" + result;
        display2.textContent = "" + acc;
    }
});
