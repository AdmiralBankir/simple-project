'use strict';

const btn = document.querySelector('button');

if (btn) {
  btn.addEventListener('click', () => {
    //eslint-disable-next-line
    alert('test script is working!');
  });
}