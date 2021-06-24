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
});
