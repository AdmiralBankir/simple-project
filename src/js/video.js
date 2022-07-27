'use strict';

const video = document.querySelector('.video__media');

const generateURL = (id) => {
  return 'https://youtu.be/' + id;
};

const createPicture = (id) => {
  return `<picture>
            <source type="image/webp" srcset="https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp">
            <img class="video__preview-image" src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" alt="Видео на YouTube">
        </picture>`;
};


const generateURLIframe = (id) => {
  const query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
};

const createIframe = (id) => {
  const iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURLIframe(id));

  return iframe;
};

const onVideoItemClick = (item, id) => {
  const link = video.querySelector('a');
  const button = video.querySelector('.video__play-button');
  const iframe = createIframe(id);
  iframe.classList.add('video__iframe');

  link.remove();
  button.remove();
  item.prepend(iframe);
};

const getPlayIcon = () => {
  return `<svg width="132" height="132">
    <use xlink:href="#play-icon"></use>
  </svg>`;
};

export default function createVideo(id) {
  if (!video) {return;}
  const item = document.createElement('div');
  const link = document.createElement('a');
  const button = document.createElement('button');

  item.classList.add('video__item');
  link.setAttribute('href', generateURL(id));
  button.classList.add('video__play-button');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Смотреть видео на YouTube');

  link.insertAdjacentHTML('afterbegin', createPicture(id));
  button.insertAdjacentHTML('afterbegin', getPlayIcon());
  item.appendChild(link);
  video.appendChild(button);
  video.prepend(item);

  const playBtn = video.querySelector('.video__play-button');

  if (playBtn) {playBtn.addEventListener('click', () => onVideoItemClick(item, id));}
}

