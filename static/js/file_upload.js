const uploadButton = document.getElementById('upload-input');
const fileChosen = document.getElementById('upload-text');
const uploadContainer = document.getElementById('upload-container');
const uploadImage = document.getElementById('upload-photo');

(function(){
    if(window.location.href.includes('new')){
        uploadButton.addEventListener('change', 
            function(){
                fileChosen.textContent = this.files[0].name;
            }
        );
    }
})();