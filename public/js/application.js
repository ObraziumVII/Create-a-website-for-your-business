const submitButton = document.querySelector('#submitButton');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('passwordRepeat');
const passwordError = document.getElementById('passwordError');

if (submitButton) {
  console.log('submotButton', submitButton);
  submitButton.addEventListener('click', (event) => {
    console.log('password', password);
    if (password.value !== repeatPassword.value) {
      event.preventDefault();
      passwordError.hidden = false;
    }
  });
};
