const calculator = () => {
  //Get elements
  const el = (element) => {
    if (element.charAt(0) === '#') {
      return document.querySelector(element);
    }

    return document.querySelectorAll(element);
  };

  let viewer = el('#viewer'), // Calculator screen where result is displayed
    equals = el('#equals'), // Equal button
    nums = el('.num'), // List of numbers
    ops = el('.ops'), // List of operators
    theNum = '', // Current number
    oldNum = '', // First number
    resultNum, // Result
    operator;

  // When number is clicked get the current number selected
  function setNum() {
    if (resultNum) {
      // If a result was displayed, reset number
      theNum = this.getAttribute('data-num');
      resultNum = '';
    } else {
      // Disallow . from being entered multiple times
      if (this.getAttribute('data-num') === '.' && theNum.indexOf('.') !== -1) {
        return;
      }
      // Add digit to previous number (this is a string)
      theNum += this.getAttribute('data-num');
    }

    // Limit number input to 10 digits
    if (theNum.length > 10) {
      theNum = theNum.slice(0, 10);
      return;
    }
    viewer.innerHTML = theNum; // Display current number
  }

  // When: Operator is clicked. Pass number to oldNum and save operator
  function moveNum() {
    oldNum = theNum;
    theNum = '';
    operator = this.getAttribute('data-ops');
  }

  // When: Equals is clicked. Calculate result
  const displayNum = () => {
    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Perform operation
    switch (operator) {
      case 'plus':
        resultNum = oldNum + theNum;
        break;

      case 'minus':
        resultNum = oldNum - theNum;
        break;

      case 'times':
        resultNum = oldNum * theNum;
        break;

      case 'divided by':
        resultNum = oldNum / theNum;
        break;

      // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        // If result is not a number (set off by eg double-clicking operators or clicking one operator and then another)
        resultNum = 'Not a number';
      } else {
        // If result is infinity (set off by dividing by zero)
        resultNum = 'Oh my';
        el('#calculator').classList.add('broken'); // Break calculator
        el('#reset').classList.add('show'); // And show reset button
      }
    }

    // Display result
    viewer.innerHTML = resultNum;

    // Reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum;
  };

  // When: Clear button is pressed. Clear everything
  const clearAll = () => {
    oldNum = '';
    theNum = '';
    viewer.innerHTML = '0';
  };

  /* The click events */

  // Add click event to numbers
  nums.forEach((num) => {
    num.addEventListener('click', setNum);
  });

  // Add click event to operators
  ops.forEach((op) => {
    op.addEventListener('click', moveNum);
  });

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el('#clear').onclick = clearAll;

  // Add click event to reset button
  el('#reset').onclick = () => {
    window.location = window.location;
  };
};

calculator();
