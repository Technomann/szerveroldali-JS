
function toggleLogtOutButton(){
    const logOutButton = document.getElementById("logout-button");
    if(logOutButton.classList.contains("block")){
        logOutButton.classList.remove("block");
        logOutButton.classList.add("hidden");
    }else{
        logOutButton.classList.remove("hidden");
        logOutButton.classList.add("block");
    }
}

(function(){
    document.getElementById("logged-in-user").addEventListener("click", toggleLogtOutButton);
})();