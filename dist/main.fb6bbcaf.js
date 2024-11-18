// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePasswordRepeat = exports.validatePassword = exports.validateEmail = exports.submitSignUpForm = exports.setFormValue = exports.getValidationStatus = exports.formValues = exports.formValidation = void 0;
var formValues = exports.formValues = {}; // Сюда пишутся значения формы (Object как в Java, или dict из Python)
var formValidation = exports.formValidation = {
  password: false,
  password_repeat: false // Убедитесь, что ключ совпадает
};

// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false

// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
var validatePassword = exports.validatePassword = function validatePassword(password) {
  var minLength = 8;
  var hasUppercase = /[A-Z]/.test(password);
  var hasNumber = /\d/.test(password);
  var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  var isValid = password.length >= minLength && hasUppercase && hasNumber && hasSpecialChar;

  // В formValidation сохраняем статус валидации
  formValidation.password = isValid;
  return isValid;
};
var validateEmail = exports.validateEmail = function validateEmail(email) {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  var regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return String(email).toLowerCase().match(regExp);
};

// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
var getValidationStatus = exports.getValidationStatus = function getValidationStatus() {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  // Object.values(formValidation).forEach((e, i=0) => {console.log("validation status: ", e, " no ", i); i ++;})
  return Object.values(formValidation).every(function (validationStatus) {
    return !!validationStatus;
  });
};
var validatePasswordRepeat = exports.validatePasswordRepeat = function validatePasswordRepeat(repeatPassword, originalPassword) {
  return repeatPassword === originalPassword; // Сравниваем с оригинальным паролем
};
var setFormValue = exports.setFormValue = function setFormValue(valueKey, newValue, validator) {
  formValues[valueKey] = newValue;
  if (validator !== undefined) {
    formValidation[valueKey] = validator(newValue);
    console.log("Validation for ".concat(valueKey, ":"), formValidation[valueKey]); // Лог валидации
  }
};

// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
var submitSignUpForm = exports.submitSignUpForm = function submitSignUpForm() {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT");
    return false;
  }
  console.log("FORM IS FINE");
  console.log(formValues);
  return true;
};
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils.js");
////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
// const passwordField = document.getElementById(password_id);
password.classList.add("valid");
password.classList.remove("valid");

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
console.log("Document");
console.log(document);

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
var first_name_id = 'first_name';
var last_name_id = 'last_name';
var password_id = 'password';
var email_id = 'email';
var sign_in_link_id = 'sign_in_link';
var sign_up_form_id = 'sign_up_form';
// const sign_in_form_id = 'sign_in_form'  // Пригодится
var sign_up_btn_id = 'sign_up_btn';
var sign_in_form_id = 'sign_in_form';

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

var first_name = document.getElementById(first_name_id);
first_name.oninput = function (e) {
  return (0, _utils.setFormValue)(first_name_id, e.target.value);
}; // Установить значение без валидации

var email = document.getElementById(email_id);
email.oninput = function (e) {
  return (0, _utils.setFormValue)(email_id, e.target.value, _utils.validateEmail);
}; // Установить значение с валидацией

var passwordField = document.getElementById(password_id);
var passwordRepeatField = document.getElementById("password-repeat");
var login_email = document.getElementById("login_email");
var login_password = document.getElementById("login_password");
var login_btn = document.getElementById("login_btn");
login_btn.onclick = function (e) {
  e.preventDefault(); // Отключить перезагрузку страницы

  // Получаем значения полей
  var emailValue = document.getElementById("login_email").value.trim();
  var passwordValue = document.getElementById("login_password").value.trim();

  // Простая проверка: email должен быть валидным, пароль не пустым
  var emailValid = (0, _utils.validateEmail)(emailValue);
  var passwordValid = passwordValue !== ""; // Проверка на пустоту

  if (emailValid && passwordValid) {
    console.log("Login successful!");
    console.log({
      email: emailValue,
      password: passwordValue
    });
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
var switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = function (e) {
  document.getElementById(sign_up_form_id).style.display = "none";
  document.getElementById(sign_in_form_id).style.display = "";
  toggleLoginButton(); // Обновить состояние кнопки авторизации
};
switch_to_sign_up.onclick = function (e) {
  document.getElementById(sign_in_form_id).style.display = "none";
  document.getElementById(sign_up_form_id).style.display = "";
  toggleSignUpButton(); // Обновить состояние кнопки регистрации
};
var sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = function (e) {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault();
  (0, _utils.submitSignUpForm)();
};

// Функция блокировки/разблокировки кнопки регистрации
var toggleSignUpButton = function toggleSignUpButton() {
  var signUpButton = document.getElementById(sign_up_btn_id); // Убедимся, что элемент кнопки получен
  var isValid = (0, _utils.getValidationStatus)();
  signUpButton.disabled = !isValid;
};

// Функция блокировки/разблокировки кнопки авторизации
var toggleLoginButton = function toggleLoginButton() {
  var loginButton = document.getElementById("login_btn");
  var emailValid = (0, _utils.validateEmail)(document.getElementById("login_email").value);
  var passwordValid = document.getElementById("login_password").value.trim() !== "";
  loginButton.disabled = !(emailValid && passwordValid); // Блокируем, если email или пароль невалидны
};

// Валидация имени (только для регистрации)
first_name.oninput = function (e) {
  (0, _utils.setFormValue)(first_name_id, e.target.value);
  toggleSignUpButton();
};

// Валидация email для регистрации
email.oninput = function (e) {
  (0, _utils.setFormValue)(email_id, e.target.value, _utils.validateEmail);
  toggleSignUpButton();
};

// Валидация пароля для регистрации
passwordField.oninput = function (e) {
  var isValid = (0, _utils.validatePassword)(e.target.value);

  // Обновляем статус валидации для пароля
  _utils.formValidation.password = isValid;
  if (isValid) {
    passwordField.classList.remove("invalid");
    passwordField.classList.add("valid");
  } else {
    passwordField.classList.remove("valid");
    passwordField.classList.add("invalid");
  }
  (0, _utils.setFormValue)(password_id, e.target.value, _utils.validatePassword);
  toggleSignUpButton();
};
passwordRepeatField.oninput = function (e) {
  var repeatPassword = e.target.value;
  var originalPassword = passwordField.value;

  // Используем setFormValue для обновления значения и статуса валидации
  (0, _utils.setFormValue)("password_repeat", repeatPassword, function (value) {
    return (0, _utils.validatePasswordRepeat)(value, originalPassword);
  });

  // Синхронизация цвета полей
  var isValid = _utils.formValidation.password_repeat; // Статус валидации из formValidation
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
login_email.oninput = function (e) {
  (0, _utils.setFormValue)("login_email", e.target.value, _utils.validateEmail);
  toggleLoginButton();
};

// Валидация пароля для авторизации
login_password.oninput = function (e) {
  var isValid = e.target.value.trim() !== "";
  if (isValid) {
    login_password.classList.remove("invalid");
    login_password.classList.add("valid");
  } else {
    login_password.classList.remove("valid");
    login_password.classList.add("invalid");
  }
  toggleLoginButton();
};
document.addEventListener("DOMContentLoaded", function () {
  toggleSignUpButton();
  toggleLoginButton();
});
},{"./utils.js":"js/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44997" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map