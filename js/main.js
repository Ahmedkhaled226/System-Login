let signupName = document.getElementById('signupName')
let signupEmail = document.getElementById('signupEmail')
let signupPassword = document.getElementById('signupPassword')
let signInEmail = document.getElementById('signInEmail')
let signInPassword = document.getElementById('signInPassword')
let msgSignupName = document.getElementById('msgSignupName')
let msgSignupEmail = document.getElementById('msgSignupEmail')
let msgSignupPassword = document.getElementById('msgSignupPassword')
let msgSignInEmail = document.getElementById('msgSignInEmail')
let msgSignupInPassword = document.getElementById('msgSignupInPassword')
let btnSignUp = document.getElementById('btnSignUp')
let btnLogin = document.getElementById('btnLogin')
let alertSuccess = document.getElementById('alertSuccess')
let exists = document.getElementById('exist')
let incorrects = document.getElementById('incorrect')

let signupContainer = []

if (localStorage.getItem('allData') == null) {
    signupContainer = []
} else {
    signupContainer = JSON.parse(localStorage.getItem('allData'))
}



function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3"> inputs is required</span>'
        return false
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
        return false
    }
    if (emailSignUpValid() == true && passwordSignUpValid() == true && nameSignUpValid() == true) {
        let user = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        }
        signupContainer.push(user)
        localStorage.setItem('allData', JSON.stringify(signupContainer))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        clearInput()
        return true

    }
}


function isEmailExist() {
    for (let i = 0; i < signupContainer.length; i++) {
        if (signupContainer[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
            return false; // email already exists
        }
    }
    return true; // email does not exist
}
function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}


function emailSignUpValid() {
    let text = signupEmail.value;
    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    if (regex.test(text) == true) {
        signupEmail.classList.add("is-valid");
        signupEmail.classList.remove("is-invalid");
        msgSignupEmail.classList.add('d-none');
        document.getElementById('exist').innerHTML = '<span class="text-success m-3"></span>'
        return true
    } else {
        signupEmail.classList.add("is-invalid");
        signupEmail.classList.remove("is-valid");
        msgSignupEmail.classList.remove('d-none');
        msgSignupEmail.innerHTML = 'Invalid email address';
        return false
    }
}
function passwordSignUpValid() {
    let text = signupPassword.value;

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 digit
    if (regex.test(text) == true) {
        signupPassword.classList.add("is-valid");
        signupPassword.classList.remove("is-invalid");
        msgSignupPassword.classList.add('d-none');
        document.getElementById('exist').innerHTML = '<span class="text-success m-3"></span>'

        return true;
    } else {
        signupPassword.classList.add("is-invalid");
        signupPassword.classList.remove("is-valid");
        msgSignupPassword.classList.remove('d-none');
        msgSignupPassword.innerHTML = 'Invalid password (must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 digit)';
        return false;
    }
}
function nameSignUpValid() {
    let text = signupName.value;
    let regex = /^\w{3,}(\s+\w+)*$/; // allow only letters, min 3, max 20 characters
    if (regex.test(text) == true) {
        signupName.classList.add("is-valid");
        signupName.classList.remove("is-invalid");
        msgSignupName.classList.add('d-none');
        document.getElementById('exist').innerHTML = '<span class="text-success m-3"></span>'

        return true;
    } else {
        signupName.classList.add("is-invalid");
        signupName.classList.remove("is-valid");
        msgSignupName.classList.remove('d-none');
        msgSignupName.innerHTML = 'Invalid name (only letters, 3-20 characters)';
        return false;
    }
}
function clearInput() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
    signupName.classList.remove("is-valid");
    signupEmail.classList.remove("is-valid");
    signupPassword.classList.remove("is-valid");
    signupName.classList.remove("is-invalid");
    signupEmail.classList.remove("is-invalid");
    signupPassword.classList.remove("is-invalid");
    msgSignupName.classList.add('d-none');
    msgSignupEmail.classList.add('d-none');
    msgSignupPassword.classList.add('d-none');

}


//signIn-------------------------------
let userNameValue = localStorage.getItem('loginData')
if (userNameValue) {
    document.getElementById('username').innerHTML = `Welcome ` + userNameValue
}
function signIn() {
    let email = signInEmail.value
    let password = signInPassword.value
    for (let i = 0; i < signupContainer.length; i++) {
        if (email.toLowerCase() === signupContainer[i].email.toLowerCase() && password.toLowerCase() === signupContainer[i].password.toLowerCase()) {
            localStorage.setItem('loginData', signupContainer[i].name)
            window.location.href = './home.html'
        } else {
            signInEmail.classList.add("is-invalid");
            signInEmail.classList.remove("is-valid");
            signInPassword.classList.add("is-invalid");
            signInPassword.classList.remove("is-valid");
            document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3"> Invalid email or password</span>'

        }
    }
}



function emailSignInValid() {
    let text = signInEmail.value;
    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    if (regex.test(text) == true) {
        signInEmail.classList.add("is-valid");
        signInEmail.classList.remove("is-invalid");
        return true
    } else {
        signInEmail.classList.add("is-invalid");
        signInEmail.classList.remove("is-valid");
        msgSignupEmail.classList.remove('d-none');
        return false
    }
}
function passwordSignInValid() {
    let text = signInPassword.value;

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 digit
    if (regex.test(text) == true) {
        signInPassword.classList.add("is-valid");
        signInPassword.classList.remove("is-invalid");
        return true;
    } else {
        signInPassword.classList.add("is-invalid");
        signInPassword.classList.remove("is-valid");
        return false;
    }
}