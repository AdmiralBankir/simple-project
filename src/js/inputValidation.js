'use strict';

//eslint-disable-next-line
const TEL_REGEXP = /^[\d ()+-]+$/;

function onInputValidation(evt) {
  const value = evt.target.value;
  if (value.match(TEL_REGEXP)) {
    evt.target.value = value;
  } else {
    evt.target.value = value.slice(0, -1);
  }
}

export default function inputValidationInit() {
  const inputs = document.querySelectorAll('input[name="phone"]');
  inputs.forEach(input => input.addEventListener('input', onInputValidation));
}
