const sendForm = document.querySelector('#sendForm');
const inputName = document.querySelector('#inputName');
const inputCompany = document.querySelector('#inputCompany');
const inputPhone = document.querySelector('#inputPhone');
const inputEmail = document.querySelector('#inputEmail');
const inputDecription = document.querySelector('#inputDecription');
const inputImg = document.querySelector('#inputImg');
const inputLink = document.querySelector('#inputLink');
sendForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = inputName.value;
  const companyName = inputCompany.value;
  const phone = inputPhone.value;
  const email = inputEmail.value;
  const description = inputDecription.value;
  const img = inputImg.value;
  const link = inputLink.value;
  console.log('Отправляем феч');
  const response = await fetch('/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      companyName,
      phone,
      email,
      description,
      img,
      link,
    }),
  });
  window.alert('Ваша заявка принята!');
  inputName.value = '';
  inputCompany.value = '';
  inputPhone.value = '';
  inputEmail.value = '';
  inputDecription.value = '';
  inputImg.value = '';
  inputLink.value = '';
});

// cvar element = document.getElementById('phone');
const maskOptions = {
  mask: '+7(000)000-00-00',
  lazy: false,
};
const mask = new IMask(inputPhone, maskOptions);

// const element2 = document.getElementById('email');
// const maskOptions2 = {
//   mask(value) {
//     if (/^[a-z0-9_\.-]+$/.test(value)) return true;
//     if (/^[a-z0-9_\.-]+@$/.test(value)) return true;
//     if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value)) return true;
//     if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value)) return true;
//     if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value)) return true;
//     if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value)) return true;
//     if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value)) return true;
//     return false;
//   },
//   lazy: false,
// };
// const mask2 = new IMask(inputEmail, maskOptions2);
