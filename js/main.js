import { 
  setFormValue, 
  submitSignUpForm, 
  validateEmail, 
  validatePassword, 
  getValidationStatus, 
  validatePasswordRepeat, 
  formValidation,
  formValues // Добавляем этот импорт
} from "./utils.js";
////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
// const passwordField = document.getElementById(password_id);
password.classList.add("valid")
password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
console.log("Document")
console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const email_id = 'email'

const sign_in_link_id = 'sign_in_link'
const sign_up_form_id = 'sign_up_form'
// const sign_in_form_id = 'sign_in_form'  // Пригодится
const sign_up_btn_id = 'sign_up_btn'
const sign_in_form_id = 'sign_in_form'


// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
first_name.oninput = (e) => setFormValue(first_name_id, e.target.value)  // Установить значение без валидации

const email = document.getElementById(email_id);
email.oninput = (e) => setFormValue(email_id, e.target.value, validateEmail) // Установить значение с валидацией

const passwordField = document.getElementById(password_id);

const passwordRepeatField = document.getElementById("password-repeat");

const login_email = document.getElementById("login_email");

const login_password = document.getElementById("login_password");

const login_btn = document.getElementById("login_btn");
login_btn.onclick = (e) => {
  e.preventDefault(); // Отключить перезагрузку страницы

  // Получаем значения полей
  const emailValue = document.getElementById("login_email").value.trim();
  const passwordValue = document.getElementById("login_password").value.trim();

  // Простая проверка: email должен быть валидным, пароль не пустым
  const emailValid = validateEmail(emailValue);
  const passwordValid = passwordValue !== ""; // Проверка на пустоту

  if (emailValid && passwordValid) {
    console.log("Login successful!");
    console.log({ email: emailValue, password: passwordValue });
  } else {
    console.log("Invalid login credentials");

    // Подсвечиваем поля, если они невалидны
    if (!emailValid) {
      document.getElementById("login_email").classList.add("invalid");
    }
    if (!passwordValid) {
      document.getElementById("login_password").classList.add("invalid");
    }
  }
};


// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым
const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "none";
  document.getElementById(sign_in_form_id).style.display = "";
  toggleLoginButton(); // Обновить состояние кнопки авторизации
};

switch_to_sign_up.onclick = (e) => {
  document.getElementById(sign_in_form_id).style.display = "none";
  document.getElementById(sign_up_form_id).style.display = "";
  toggleSignUpButton(); // Обновить состояние кнопки регистрации
};

const sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  submitSignUpForm()
}

// Функция блокировки/разблокировки кнопки регистрации
const toggleSignUpButton = () => {
  const signUpButton = document.getElementById(sign_up_btn_id); // Убедимся, что элемент кнопки получен
  const isValid = getValidationStatus();
  signUpButton.disabled = !isValid;
};

// Функция блокировки/разблокировки кнопки авторизации
const toggleLoginButton = () => {
  const loginButton = document.getElementById("login_btn");
  const emailValid = validateEmail(document.getElementById("login_email").value);
  const passwordValid = document.getElementById("login_password").value.trim() !== "";
  loginButton.disabled = !(emailValid && passwordValid); // Блокируем, если email или пароль невалидны
};

// Валидация имени (только для регистрации)
first_name.oninput = (e) => {
  setFormValue(first_name_id, e.target.value);
  toggleSignUpButton();
};

// Валидация email для регистрации
email.oninput = (e) => {
  setFormValue(email_id, e.target.value, validateEmail);
  toggleSignUpButton();
};

// Валидация пароля для регистрации
passwordField.oninput = (e) => {
  const isValid = validatePassword(e.target.value);
  
  // Обновляем статус валидации для пароля
  formValidation.password = isValid;

  if (isValid) {
    passwordField.classList.remove("invalid");
    passwordField.classList.add("valid");
  } else {
    passwordField.classList.remove("valid");
    passwordField.classList.add("invalid");
  }

  setFormValue(password_id, e.target.value, validatePassword);
  toggleSignUpButton();
};

passwordRepeatField.oninput = (e) => {
  const repeatPassword = e.target.value;
  const originalPassword = passwordField.value;

  // Используем setFormValue для обновления значения и статуса валидации
  setFormValue("password_repeat", repeatPassword, (value) => validatePasswordRepeat(value, originalPassword));

  // Синхронизация цвета полей
  const isValid = formValidation.password_repeat; // Статус валидации из formValidation
  if (isValid) {
    passwordRepeatField.classList.remove("invalid");
    passwordRepeatField.classList.add("valid");
  } else {
    passwordRepeatField.classList.remove("valid");
    passwordRepeatField.classList.add("invalid");
  }

  // Переключение кнопки регистрации
  toggleSignUpButton();
};

// Валидация email для авторизации
login_email.oninput = (e) => {
  setFormValue("login_email", e.target.value, validateEmail);
  toggleLoginButton();
};

// Валидация пароля для авторизации
login_password.oninput = (e) => {
  const isValid = e.target.value.trim() !== "";
  if (isValid) {
    login_password.classList.remove("invalid");
    login_password.classList.add("valid");
  } else {
    login_password.classList.remove("valid");
    login_password.classList.add("invalid");
  }
  toggleLoginButton();
};

document.addEventListener("DOMContentLoaded", () => {
  toggleSignUpButton();
  toggleLoginButton();
});
