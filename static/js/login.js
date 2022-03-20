function displayLoginForm(){
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

function displayRegisterForm(){
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}



(function(){
    document.getElementById("login-button").addEventListener("click", displayLoginForm);
    document.getElementById("register-button").addEventListener("click", displayRegisterForm);
})();