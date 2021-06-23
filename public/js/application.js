<<<<<<< HEAD
const telInput = document.getElementById('phone');
const errorMsg = document.getElementById('error-msg');
const validMsg = document.getElementById('valid-msg');

telInput.intlTelInput({
  utilsScript: 'js/utils.js',
});

// валидация при потере фокуса
telInput.blur(() => {
  if (trim(telInput.val())) {
    if (telInput.intlTelInput('isValidNumber')) {
      validMsg.removeClass('hide');
    } else {
      telInput.addClass('error');
      errorMsg.removeClass('hide');
      validMsg.addClass('hide');
    }
  }
});

// сброс при нажатии на клавишу
telInput.keydown(() => {
  telInput.removeClass('error');
  errorMsg.addClass('hide');
  validMsg.addClass('hide');
});
=======
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
>>>>>>> 91f4696d8e79cd1f7f74491307363c4fa49084d9
