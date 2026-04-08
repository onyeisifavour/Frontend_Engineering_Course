   
   
//    Calculator script
   const display = document.getElementById('display');

    function appendToDisplay(input) {
        if (display.innerText === '0') {
            display.innerText = input;
        } else {
            display.innerText += input;
        }
    }

    function clearDisplay() {
        display.innerText = '0';
    }

    function calculateResult() {
        try {
            display.innerText = eval(display.innerText);
        } catch (error) {
            display.innerText = "Error";
        }
    }