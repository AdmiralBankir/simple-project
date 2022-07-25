'use strict';

export default function(sticky) {
  const header = document.querySelector('header');

  if (window.pageYOffset >= sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}