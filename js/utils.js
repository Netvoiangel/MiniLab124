export const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
export const formValidation = {
  password: false,
  password_repeat: false, // Убедитесь, что ключ совпадает
};

// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false


// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid = password.length >= minLength && hasUppercase && hasNumber && hasSpecialChar;

  // В formValidation сохраняем статус валидации
  formValidation.password = isValid;

  return isValid;
};



export const validateEmail = (email) => {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return String(email)
    .toLowerCase()
    .match(regExp);
}


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  // Object.values(formValidation).forEach((e, i=0) => {console.log("validation status: ", e, " no ", i); i ++;})
  return Object.values(formValidation).every((validationStatus) => !!validationStatus)
}

export const validatePasswordRepeat = (repeatPassword, originalPassword) => {
  return repeatPassword === originalPassword;  // Сравниваем с оригинальным паролем
};


export const setFormValue = (valueKey, newValue, validator) => {
  formValues[valueKey] = newValue;
  if (validator !== undefined) {
    formValidation[valueKey] = validator(newValue);
    console.log(`Validation for ${valueKey}:`, formValidation[valueKey]); // Лог валидации
  }
};

// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT")
    return false
  }
  console.log("FORM IS FINE")
  console.log(formValues)
  return true
}
