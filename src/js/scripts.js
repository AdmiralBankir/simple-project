'use strict';

import stickyHeader from '@/js/sticky-header';
import tab from '@/js/tabs.js';
import popup from '@/js/popup.js';
import createVideo from './video';
import inirForms from './callback-form';
import inputValidationInit from './inputValidation';

const videoId = 'hDXI8A0-UCA';

window.onload = function() {
  if (document.querySelectorAll('.car-brand__tabs').length) {
    tab('.car-brand__tabs');
  }
  if (document.querySelectorAll('.our-work__tabs').length) {
    tab('.our-work__tabs');
  }

  const sticky = document.querySelector('header').offsetTop;
  if (sticky) {
    stickyHeader(sticky);

    window.onscroll = function() {
      stickyHeader(sticky);
    };
  }

  // отображаем текст поиска на result.html
  const result = document.querySelector('.results-text');
  if (result) {
    const text = document.location.search;
    if (text.length > 1) {
      const i = text.indexOf('=') + 1;
      result.textContent = decodeURI(text.substring(i));
    }
  }

  const searchForm = document.querySelector('.search-form');

  if (searchForm) {
    const regexNumber = /^\d+/;
    //const regexVIN = new RegExp('^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}[A-Z0-9-]\\d{5}$');
    const regexVIN = new RegExp(
      '^[A-HJ-NPR-Z\\d]{8}[\\dA-Z][A-HJ-NPR-Z\\d]{2}[A-Z0-9-]\\d{5}$',
    );

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelector('.search-form>input');

      if (regexNumber.test(input.value)) {
        location.href = 'https://emex.ru/products/' + input.value;
      } else if (regexVIN.test(input.value)) {
        // vin for test: Z6FAXXESMAJT02521, WAUBH54B11N111054, WDF44781313229645
        location.href =
          'https://emex.ru/catalogs/original2/modifications?vin=' + input.value;
      } else {
        location.href = '/result.html?search=' + input.value;
      }
    });
  }

  // window.resize = function() {
  //   sticky = document.querySelector('header').offsetTop;
  // };

  popup();
  inirForms();
  inputValidationInit();

  createVideo(videoId);
};
