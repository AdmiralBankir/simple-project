'use strict';

export default function() {
  const btn = document.querySelectorAll('.car-brand__link, .car-brand__all, .catalog__link');
  const close = document.querySelector('.popup__close');
  const popup = document.querySelector('.popup');
  const body = document.querySelector('body');

  if (btn) {
    btn.forEach(item => {
      item.addEventListener('click', showPopup);
    });
  }

  if (close) {
    close.addEventListener('click', closePopup);
  }

  function showPopup(e) {
    e.preventDefault();
    popup.classList.add('is-active');
    body.classList.add('popup-active');
  }

  function closePopup(e) {
    e.preventDefault();
    popup.classList.remove('is-active');
    body.classList.remove('popup-active');
  }

}