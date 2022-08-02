//const URL = 'https://emex.bitrix24.ru/rest/9873/z56lfbjkxa3g1o1o/crm.lead.add.json';
//const URL = 'https://emex.bitrix24.ru/rest/9873/xsr1kjknbu4mb5cg/crm.lead.add.json';
const URL = 'https://emex.bitrix24.ru/rest/9873/h5s7egjkgzngmfr9/crm.lead.add.json';

const forms = document.querySelectorAll('.form-bitrix24');

function getFormData(form) {
  const data = { fields: {} };
  const phoneNumberInput = form.querySelector('input[name="phone"]');
  const nameInput = form.querySelector('input[name="name"]');
  const vinInput = form.querySelector('input[name="vin"]');

  if (form.classList.contains('.callback-form') || form.classList.contains('.callback-form-popup')) {
    data.fields.TITLE = 'Обратный звонок kazan.emex.ru (test)';
  } else if (form.classList.contains('.form-podbor') || form.classList.contains('.form-podbor-2')) {
    data.fields.TITLE = 'Подбор по VIN kazan.emex.ru (test1)';
  }

  if (phoneNumberInput) {
    data.fields.PHONE = {
      'n0': {
        'VALUE': phoneNumberInput.value,
        'VALUETYPE': 'WORK',
      },
    };
  }

  if (nameInput) {
    data.fields.NAME = nameInput.value;
  }

  if (vinInput) {
    data.fields.VIN = vinInput.value;
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