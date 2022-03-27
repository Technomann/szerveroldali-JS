function showModalImage(id){
	const image = document.getElementById(id);
    let modal = document.getElementById("modal-container");
    let modalContent = document.getElementById("modal-content");

    modal.style.display = "block";
    modalContent.src = image.src;
}

function modalClose(){
    let modal = document.getElementById("modal-container");
    modal.style.display = "none";
}

(function(){
    const modalCloseButton = document.getElementById('modal-close');
    modalCloseButton.addEventListener('click', modalClose);
})();
  