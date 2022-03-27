let comparableSpacecraftIds = [];

function compare(){
    if(comparableSpacecraftIds.length < 2){
        const errorMsg = document.getElementById('compare-error-message');
        errorMsg.classList.remove('hidden');
        errorMsg.classList.add('block');
    }else{
        const Http = new XMLHttpRequest();
        const url='/compare/' + comparableSpacecraftIds[0] + '/' + comparableSpacecraftIds[1];
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            console.log(Http.responseText)
        }
    }
}

function changeUncheckedBoxesBehaviour(nable){
    const checkBoxes = ducument.querySelectorAll('input[type=checkbox]');
    const uncheckedBoxes = Array.from(checkBoxes)
    .filter(i => !i.checked);

    for(key in uncheckedBoxes){
        let ub = uncheckedBoxes[key];
        if(enable){
            ub.disabled = false;
        }else{ 
            ub.disabled = true;
        }
    }
}

(function(){
    let checkboxes = document.querySelectorAll('input[type=checkbox]');

    checkboxes.forEach(function(checkbox){
        checkbox.addEventListener('change', function(){
            comparableSpacecraftIds = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.id);

            if(comparableSpacecraftIds.length = 2){
                changeUncheckedBoxesBehaviour(false);//disable
            }else{
                changeUncheckedBoxesBehaviour(true);//enable
            }
        });
    });

    const compareButton = document.getElementById('compare-button');
    compareButton.addEventListener('click', compare);
})();