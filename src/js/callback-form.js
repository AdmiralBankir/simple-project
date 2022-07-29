const URL = 'https://emex.bitrix24.ru/rest/9873/z56lfbjkxa3g1o1o/profile.json';

const forms = document.querySelectorAll('#callback-form');

function getFormData(form) {
  const data = {};
  const phoneNumberInput = form.querySelector('input[name="phone"]');
  const nameInput = form.querySelector('input[name="name"]');
  const vinInput = form.querySelector('input[name="vin"]');

  if (phoneNumberInput) {
    data.phoneNumber = phoneNumberInput.value;
  }

  if (nameInput) {
    data.name = nameInput.value;
  }

  if (vinInput) {
    data.vin = vinInput.value;
  }

  return data;
}

async function sendData(data) {
  let ok = false;
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
  if (res) {
    ok = res.ok;
  }
  return ok;
}

export default function inirForms() {
  if (!forms || !forms.length) {return;}
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = getFormData(form);
      if (sendData(data)) {
        form.parentNode.classList.add('success');
      } else {
        //eslint-disable-next-line
        alert('Что-то пошло не так. Пожалуйста, повторите отправку формы');
      }
    });
  });
}