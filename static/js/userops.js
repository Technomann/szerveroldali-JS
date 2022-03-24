
function toggleLogoutButton(){
    const logOutContainer = document.getElementById("user-ops");
    if(logOutContainer.classList.contains("block")){
        logOutContainer.classList.remove("block");
        logOutContainer.classList.add("hidden");
    }else{
        logOutContainer.classList.remove("hidden");
        logOutContainer.classList.add("block");
    }
}

(function(){
    document.getElementById("logged-in-user").addEventListener("click", toggleLogoutButton);
})();