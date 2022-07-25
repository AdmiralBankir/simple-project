'use strict';

const tab = function(section) {
  const tabNav = document.querySelectorAll(section+' .tabs__link>a');
  const tabContent = document.querySelectorAll(section+' .tabs__item');
  const pointer = document.querySelector(section+' .tabs__pointer');

  tabNav.forEach(item => {
    item.addEventListener('click', selectTabNav);
  });

  setPointer();

  function setPointer() {
    const activeTab = document.querySelector(section+' .tabs__link>a.is-active');
    pointer.style.width = activeTab.offsetWidth + 'px';
    pointer.style.left = activeTab.offsetLeft + 'px';
  }

  function selectTabNav(e) {
    e.preventDefault();
    tabNav.forEach(item => {
      item.classList.remove('is-active');
    });
    this.classList.add('is-active');
    const tabName = this.getAttribute('data-tab-name');
    setPointer();
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    tabContent.forEach(item => {
      item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active');
    });
  }
};

window.onload = function() {
  if (document.querySelectorAll('.car-brand__tabs').length) {
    tab('.car-brand__tabs');
  }
  if (document.querySelectorAll('.our-work__tabs').length) {
    tab('.our-work__tabs');
  }
};
