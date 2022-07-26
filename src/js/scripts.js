'use strict';

import stickyHeader from '@/js/sticky-header';
import tab from '@/js/tabs.js';
import popup from '@/js/popup.js';
import createVideo from './video';

const videoId = 'hDXI8A0-UCA';

window.onload = function() {
  if (document.querySelectorAll('.car-brand__tabs').length) {
    tab('.car-brand__tabs');
  }
  if (document.querySelectorAll('.our-work__tabs').length) {
    tab('.our-work__tabs');
  }

  const sticky = document.querySelector('header').offsetTop;
  stickyHeader(sticky);

  window.onscroll = function() {
    stickyHeader(sticky);
  };

  // window.resize = function() {
  //   sticky = document.querySelector('header').offsetTop;
  // };

  popup();

  createVideo(videoId);
};

