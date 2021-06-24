const sendForm = document.querySelector('#sendForm');

sendForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(event);
  const name = event.target.name.value;
  const companyName = event.target.companyName.value;
  const phone = event.target.phone.value;
  const email = event.target.email.value;
  const description = event.target.description.value;
  const img = event.target.img.value;
  const link = event.target.link.value;

  const response = await fetch('/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({
    //   name,
    //   companyName,
    //   phone,
    //   email,
    //   description,
    //   img,
    //   link,
    // }),

  });

  // const res = await response.json();
  // if (res) {
  //   alert('Ваша заявка принята!11111111');
  // } else {
  //   alert('Заполните все поля');
  // }
  // if (response.status === 200) {
  //   alert('Ваша заявка принята!11111111');
  // } else {
  //   alert('Заполните все поля');
  // }

  window.alert('Ваша заявка принята!11111111');
});
