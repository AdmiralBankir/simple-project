import pinIcon from 'assets/map-icon.svg';
import PINS from './data/pins';
const API_KEY = '22bee5d8-836c-4b8f-9531-35fb945a7911';

const mapScript = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;

const options = {
  rootMargin: '0%',
  threshold: 0.1,
};
const callback = function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
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
    controls: ['zoomControl'],
  });

  PINS.forEach((pin) => {
    const balloonLayout = window.ymaps.templateLayoutFactory.createClass(
      '<div class="map__pin-layout">' +
                '$[[options.contentLayout observeSize minWidth=312 minHeight=138]]' +
                '</div>', 
      {
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
        /**
                           * Используется для автопозиционирования (balloonAutoPan).
                           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                           * @function
                           * @name getClientBounds
                           * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                           */
        getShape: function() {      
          const position = {
            top: this.$element.offsetTop,
            left: this.$element.offsetLeft,
          };
                
          return new window.ymaps.shape.Rectangle(new window.ymaps.geometry.pixel.Rectangle([
            [position.left, position.top], [
              position.left + this.$element.offsetWidth,
              position.top + this.$element.offsetHeight + 40,
            ],
          ]));
        },
        /**
                           * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                           * @function
                           * @name onSublayoutSizeChange
                           */
        onSublayoutSizeChange: function() {
          balloonContentLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                
          this.events.fire('shapechange');
        },
        _onCloseButtonClick: function(e) {
          e.preventDefault();
          this.events.fire('userclose');
        },
      },
    );
    const balloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
      `
        <address class="map__pin">
        <h3 class="map__pin-title h3">${pin.name}</h3>
        <p class="map__pin-text">${pin.schedule}</p>
        <p class="map__pin-text">${pin.address.replace('Россия, Республика Татарстан, Казань,', '')}</p>
        <button class="map-pin__close" type="button" aria-label="Закрыть подробную информацию">
          <svg width="24" height="24">
            <use xlink:href="#close"></use>
          </svg>
        </button>
      </address>
        `);
    const officePlacemark = (window.officePlacemark = new window.ymaps.Placemark(
      [pin.latitude, pin.longitude],
      {
        balloonContent: 'Отдел продаж',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: pinIcon,
        iconImageSize: [76, 76],
        iconImageOffset: [-38, -38],
  
        balloonShadow: false,
        balloonLayout: balloonLayout,
        balloonContentLayout: balloonContentLayout,
        balloonPanelMaxMapArea: 0,
        balloonOffset: [-156, -143],
        hideIconOnBalloonOpen: true,
      },
    ));
    myMap.geoObjects.add(officePlacemark);
  });

}
