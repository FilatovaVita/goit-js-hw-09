import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
};
let formData = {};

populateTextarea();
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function populateTextarea() {
  let saveData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saveData) {
    refs.form.email.value = saveData.email || [];
    refs.form.message.value = saveData.message || [];
  }
}

console.log(refs.form);
