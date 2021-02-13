$(document).ready(() => {

  let output = $('#output');
  let isOn = true;
  let isEval = false;
  let numArr = [];
  let oprCount = 0;
  let lastBtn = null;
  let [firstNum, operator, secondNum, result] = [null, null, null, null];

  handleNumbers = (button) => {
    if (isOn) {
      isEval = false;
      lastBtn = button.value;
      // prevents double zeros
      if (button.value === '0' && output[0].innerHTML === '0') {
        return false;
      // adds zero in front of decimal  
      } else if (button.value === '.' && numArr.length === 0) {
        numArr.push(0); 
        numArr.push(button.value);  
      // prevents double decimals  
      } else if (button.value === '.' && numArr.includes('.') === true) {
        return false;
      } else {
        numArr.push(button.value); 
      }
             
      if (numArr.length > 12) {
        output.text('ERR MAX DIGIT');
      } else {
        output.text(numArr.join(''));
      }
    }
  };

  handleOperators = (button) => {
    if (isOn) {
      isEval = false;
      // checks to see if last btn pressed was an operator
      if (/[*/+]/.test(lastBtn)) {
        oprCount = 0;
      } else {
        oprCount++;
      }
      lastBtn = button.value;

      // allows calculation without pressing '='
      if (oprCount > 1) {
        calculate();
      } 
      
      // allows negative numbers for second number
      if (button.value === '-' && /[*/+]/.test(operator)) {
        firstNum = output[0].innerHTML;
        numArr = [button.value];
      // allows negative numbers for first number
      } else if (button.value === '-' && output[0].innerHTML === '0') {
        numArr.push(button.value);
      // positive numbers  
      } else {
        numArr = [];
        operator = button.value;
        firstNum = output[0].innerHTML;
      }
    } 
  };

  reset = () => {
    if (isOn) {
      isEval = false;
      numArr = [];
      oprCount = 0;
      [firstNum, operator, secondNum, result] = [null, null, null, null];
      output.text('0');
    }
  };

  backspace = () => {
    if (isOn) {
      isEval = false;
      numArr.pop();
      output.text(numArr.join(''));
      if (numArr.length === 0) {
        output.text('0');
      }
    }
  };

  percentage = () => {
    if (isOn) {
      isEval = false;
      let num = output[0].innerHTML;
      let decimal = num / 100;
      if (output[0].innerHTML === '0') {
        return false;
      } else {
        numArr.push(decimal);
        output.text(decimal);
      }
    }
  };

  calculate = () => {
    if (isOn) {
      // if '=' has already been pressed, isEval is set to true
      if (isEval) {
        // if isEval is true, output displays latest result 
        output.text(output[0].innerHTML);
      } else {
        secondNum = output[0].innerHTML;
        result = eval(firstNum + operator + secondNum);
        numArr = [];
        operator = null;
        if (result === Infinity || result === -Infinity) {
          divideByZero();
        } else if (result.toString().length > 12) {
          let fixedNum = result.toFixed(4);
          output.text(fixedNum);
          isEval = true;
        } else {
          output.text(result);
          isEval = true;
        }
      }
    }
  };

  power = () => {
    isOn = !isOn;
    if (isOn) {
      isEval = false;
      numArr = [];
      output.text('0');
    } else {
      output.text(null);
    }
  };

  divideByZero = () => {
    $('body').css('background-color', 'black')
    $('p').hide();
    $('span').hide();
    $('#calculator').animate({ width: '100%', height: '1px' }, 200);
    $('#calculator').children().animate({ width: '100%', height: '1px' }, 200);
    $('button').animate({ width: '100%', height: '1px' }, 200);
    $('button').children().animate({ width: '100%', height: '1px' }, 200);
    $('#calculator').animate({ width: '1px', height: '1px' }, 200).fadeOut(0);
    $('#calculator').children().animate({ width: '1px', height: '1px' }, 200);
    $('button').animate({ width: '1px', height: '1px' }, 200);
    $('button').children().animate({ width: '1px', height: '1px' }, 200);
    $('#egg').css('display', 'block');
    $('#egg').fadeOut(2500);
    $('#top').animate({ width: '300px', height: '30px' });
    $('.lines').animate({ width: '330px', height: '2px' });
    $('#display').animate({ width: '280px', height: '60px' });
    $('#btns-pad').animate({ width: '280px', height: '350px' });
    $('button').animate({ width: '68px', height: '68px' });
    $('button').children().animate({ width: '62px', height: '62px' });
    $('p').show();
    $('span').show();
    $('#calculator').animate({ width: '310px', height: '500px' }).delay(2500).fadeIn(1000);
    setTimeout(() => { $('body').css('background-color', '#414958') }, 3000);
  }

  // add event listeners to all of the buttons
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.value === 'num-btn') {
        handleNumbers(button);
      } else if (button.classList.value === 'opr-btn') {
        handleOperators(button);
      } else if (button.value === 'AC') {
        reset();
      } else if (button.value === 'CE') {
        backspace();
      } else if (button.value === '%') {
        percentage();
      } else if (button.value === '=') {
        oprCount = 0;
        calculate();
      } else if (button.value === '⏻') {
        power();
      }
    });
  });

  // btn styles for clicks
  $('.num-btn').mousedown((e) => {
    $(e.currentTarget).addClass('num-btn-clicked');
  });
  $('.num-btn').mouseup((e) => {
    $(e.currentTarget).removeClass('num-btn-clicked');
  });
  $('.opr-btn').mousedown((e) => {
    $(e.currentTarget).addClass('opr-btn-clicked');
  });
  $('.opr-btn').mouseup((e) => {
    $(e.currentTarget).removeClass('opr-btn-clicked');
  });
  $('.equals-btn').mousedown((e) => {
    $(e.currentTarget).addClass('equals-btn-clicked');
  });
  $('.equals-btn').mouseup((e) => {
    $(e.currentTarget).removeClass('equals-btn-clicked');
  });
  $('.clear-btn').mousedown((e) => {
    $(e.currentTarget).addClass('clear-btn-clicked');
  });
  $('.clear-btn').mouseup((e) => {
    $(e.currentTarget).removeClass('clear-btn-clicked');
  });
  $('.power-btn').mousedown((e) => {
    $(e.currentTarget).addClass('power-btn-clicked');
  });
  $('.power-btn').mouseup((e) => {
    $(e.currentTarget).removeClass('power-btn-clicked');
  });

});

// RUNNING LIST OF BUGS TO FIX

// Can type 0 before other numbers - ex. 02 [✅]
// Can type ex. .2 which needs to be converted to 0.2 [✅]
// If result is the same as the second number, need a way to distinguish calculation is done [❌]
// Having some difficulties with negative numbers [✅]
// Logging zeros after decimal sometimes [❌]
// Can type a decimal, then press CE back to 0, then type number after 0, like 02 [❌]
// If you press '=' immediately after pressing '=', calculate is run again [✅] 


// REQUIREMENTS

// Calculator should turn on. [✅]

// Display should be set to 0. [✅]

// When number buttons are pressed, display should show number value 
   // and concat numbers together on screen. [✅]

// When decimal button is pressed, display should add decimal to end of number(s). [✅]

// When operator buttons are pressed, number on screen should be saved as first number 
   // of operation, and stay displayed until next number is recorded on display. [✅]

// If another operator button is pressed immediately after opr btn has been pressed, 
   // replace operator button value with most recent opr btn value, unless it is '-' 
   // in which the following number should be treated as a negative value. [✅]

// If CE button is pressed, last digit on screen should be removed. [✅]

// If AC button is pressed, reset everything, display should be 0. [✅]

// If '=' button is pressed, a calculate function should take first number, operator, 
   // and second number and evaluate the operation. Display should show result. [✅]

// If number button is pressed immediately after result is displayed, 
   // new operation is started. [✅]

// If operator button is pressed immediately after result is displayed, 
   // result equals first number. [✅]

// If additional operator button is pressed after second number, calculate operation, 
   // display result, store result as first number and additional operator button 
   // gets saved as operator. [✅]

// Buttons should transform when clicked as though you are pressing them. [✅]
