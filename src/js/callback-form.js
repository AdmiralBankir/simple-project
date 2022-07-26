//const URL = 'https://emex.bitrix24.ru/rest/9873/z56lfbjkxa3g1o1o/crm.lead.add.json';
//const URL = 'https://emex.bitrix24.ru/rest/9873/xsr1kjknbu4mb5cg/crm.lead.add.json';
//const URL = 'https://emex.bitrix24.ru/rest/9873/h5s7egjkgzngmfr9/crm.lead.add.json';
// const URL = 'https://emex.bitrix24.ru/rest/9873/o74mq9dvno1rroy7/crm.lead.add.json';
const URL = 'https://emex.bitrix24.ru/rest/9873/lj7wtefx2dn1u66g/crm.lead.add.json';

import getCookie from './helpers/cookie';

const forms = document.querySelectorAll('.form-bitrix24');

function getYandexId() {
  return getCookie('_ym_uid');
}

function getFormData(form) {
  const data = { fields: {} };
  const phoneNumberInput = form.querySelector('input[name="phone"]');
  const nameInput = form.querySelector('input[name="name"]');
  const vinInput = form.querySelector('input[name="vin"]');
  const ymId = getYandexId();

  if (form.classList.contains('callback-form') || form.classList.contains('callback-form-popup')) {
    data.fields.TITLE = 'Обратный звонок kazan.emex.ru';
  } else if (form.classList.contains('form-podbor') || form.classList.contains('form-podbor-2')) {
    data.fields.TITLE = 'Подбор по VIN kazan.emex.ru';
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
    data.fields.UF_CRM_1569313419 = vinInput.value;
  }

  if (ymId) {
    data.fields.UF_CRM_METRIKA_ID = ymId;
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
    form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const data = getFormData(form);
      const response  = await sendData(data);
      if (response) {
        form.parentNode.classList.add('success');
      } else {
        //eslint-disable-next-line
        alert('Что-то пошло не так. Пожалуйста, повторите отправку формы');
      }
    });
  });
}
