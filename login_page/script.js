import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsUA6-jOnae8uXuEvM4mUQZ4752Rs0eQY",
  authDomain: "intern-17ec9.firebaseapp.com",
  databaseURL: "https://intern-17ec9-default-rtdb.firebaseio.com",
  projectId: "intern-17ec9",
  storageBucket: "intern-17ec9.appspot.com",
  messagingSenderId: "408542557356",
  appId: "1:408542557356:web:213d8b922f7c28f23a9b09",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Authentication
const auth = getAuth(app);

//Initialize Realtime Database
const database = getDatabase(app);

function validateForm() {
  const emailInput = document.querySelector(".email");
  const password = document.querySelector(".password");
  const inputs = document.querySelectorAll(".input");
  const errorMessageContainer = document.querySelector(".error-msg");

  const emailValue = emailInput.value.trim();

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  let valid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      valid = false;

      input.classList.add("error");
      input.classList.remove("success");

      errorMessageContainer.innerHTML = "Please fill in your credentials";
    } else {
      valid = true;

      input.classList.remove("error");
      input.classList.add("success");

      errorMessageContainer.innerHTML = "";
    }
  });

  if (valid) {
    if (!isValidEmail(emailValue)) {
      valid = false;

      emailInput.classList.add("error");
      emailInput.classList.remove("success");

      errorMessageContainer.innerHTML = "Invalid Email";
    } else {
      valid = true;
      emailInput.classList.remove("error");
      emailInput.classList.add("success");

      errorMessageContainer.innerHTML = "";
    }
  }

  if (valid) {
    if (password.value.trim().length < 6) {
      valid = false;

      password.classList.add("error");
      password.classList.remove("success");

      errorMessageContainer.innerHTML = "Password too short";
    } else {
      valid = true;

      password.classList.remove("error");
      password.classList.add("success");

      errorMessageContainer.innerHTML = "";
    }
  }

  return valid;
}

//validateForm()

function submitForm() {
  const submitButton = document.querySelector(".submit-btn");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (validateForm()) {
      const email = document.querySelector(".email").value;
      const password = document.querySelector(".password").value;

      submitButton.value = "Loading...";

      signInUser(email, password);

      //console.log('Form is valid')
    } else {
      //console.log('Form is not valid')
    }
  });
}

submitForm();

function signInUser(email, password) {
  const errorMessageContainer = document.querySelector(".error-msg");
  const submitButton = document.querySelector(".submit-btn");

  const hashedPassword = md5(password);

  signInWithEmailAndPassword(auth, email, hashedPassword)
    .then((userCredential) => {
      //signed in
      var user = userCredential.user;

      errorMessageContainer.innerHTML = "";

      showPopUp();

      setTimeout(() => {
        window.location.href = "/secured-page/index.html";
      }, 1700);

      //console.log("user-exist");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      submitButton.value = "LOGIN";

      if (error.code === "auth/invalid-credential") {
        errorMessageContainer.innerHTML = "Invalid Email or password";
      }

      //console.error(errorMessage);
    });
}

function showPopUp() {
  const inputs = document.querySelectorAll(".input");
  const popUp = document.querySelector(".pop-up");

  popUp.style.display = "flex";

  inputs.forEach((input) => {
    input.value = "";
  });

  setTimeout(() => {
    popUp.style.display = "none";
  }, 1500);
}
