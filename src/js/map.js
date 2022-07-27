import pin from 'assets/map-icon.svg';
const API_KEY = '22bee5d8-836c-4b8f-9531-35fb945a7911';

const mapScript = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;

const options = {
  rootMargin: '0%',
  threshold: 0.1,
};
const callback = function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('insertScript');
      insertScipt();
    }
  });
};

const observer = new IntersectionObserver(callback, options);
const target = document.querySelector('.map');

if (target) {
  observer.observe(target);
}

function insertScipt() {
  const script = document.createElement('script');
  script.src = mapScript;
  document.querySelector('body').appendChild(script);
  setTimeout(() => {
    if (window.ymaps) {
      window.ymaps.ready(initMap);
      observer.disconnect();
    }
  }, 1000);
}

function initMap() {
  const myMap = new window.ymaps.Map('map', {
    center: [55.79827854997976, 49.10946665314929],
    zoom: 12,
    controls: [],
  });

  const balloonLayout = window.ymaps.templateLayoutFactory.createClass(
    '<div class="map__pin-layout">' +
              '$[[options.contentLayout observeSize minWidth=312 minHeight=138]]' +
              '</div>',
  );
  const balloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
    `
      <address class="map__pin">
      <h3 class="map__pin-title h3">Эмекс на Беломорской</h3>
      <p class="map__pin-text">режим работы</p>
      <p class="map__pin-text">адрес</p>
      <button class="map-pin__close" type="button" aria-label="Закрыть подробную информацию">
        <svg width="24" height="24">
          <use xlink:href="#close"></use>
        </svg>
      </button>
    </address>
      `, {
      build: function() {
        this.constructor.superclass.build.call(this);
        this.$element = document.querySelector('.map__pin-layout');
        this.closeBtn = this.$element.querySelector('.map-pin__close');
        this.closeBtn.addEventListener('click', this._onCloseButtonClick.bind(this));
      },
      clear: function() {
        this.closeBtn.removeEventListener('click', this._onCloseButtonClick);
        this.constructor.superclass.clear.call(this);
      },
      _onCloseButtonClick: function(e) {
        e.preventDefault();
        this.events.fire('userclose');
      },
    },
  );
  const officePlacemark = (window.officePlacemark = new window.ymaps.Placemark(
    [55.86778356887693, 49.054616999999965],
    {
      balloonContent: 'Отдел продаж',
    },
    {
      iconLayout: 'default#image',
      iconImageHref: pin,
      iconImageSize: [76, 76],
      iconImageOffset: [-38, -38],

      balloonShadow: false,
      balloonLayout: balloonLayout,
      balloonContentLayout: balloonContentLayout,
      balloonPanelMaxMapArea: 0,
      balloonOffset: [-180, -167],
      hideIconOnBalloonOpen: false,
    },
  ));

  myMap.geoObjects.add(officePlacemark);
}
