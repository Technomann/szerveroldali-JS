let comparableSpacecraftIds = [];
let checkboxes = document.querySelectorAll('input[type=checkbox]');
const compareButton = document.getElementById('compare-button');

function compare(e){
    e.preventDefault();
    if(comparableSpacecraftIds.length < 2){
        compareButton.href = '#';
        const errorMsg = document.getElementById('compare-error-message');
        errorMsg.classList.remove('hidden');
        errorMsg.classList.add('block');
    }else if(comparableSpacecraftIds.length === 2){
        //compareButton.href = '/compare/' + comparableSpacecraftIds[0] + '/' + comparableSpacecraftIds[1];
        //console.log(compareButton.href);
        //compareButton.click();
        /*const http = new XMLHttpRequest();
        const url='/compare/' + comparableSpacecraftIds[0] + '/' + comparableSpacecraftIds[1];
        http.open("GET", url);
        http.send();

        http.onreadystatechange = (err) => {
            if(err)
                console.log(err);
            console.log(http.responseText)
        }*/
        window.location.href = "/compare/" + comparableSpacecraftIds[0] + '/' + comparableSpacecraftIds[1];
        console.log(window.location.href);
    }else{
        console.log('You have been naughty!');
    }
}

function changeUncheckedBoxesBehaviour(enable){
    const uncheckedBoxes = Array.from(checkboxes)
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
    //QUERY ALL CHECKBOXES AND RUN FOREACH ON PAGE LOADED
    checkboxes.forEach(function(checkbox){
        //ADD EVENTLISTENER TO EVERY CHECKBOX
        checkbox.addEventListener('change', function(){
            //SELECT CHECKED ONES' IDs
            comparableSpacecraftIds = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.id);

            if(comparableSpacecraftIds.length === 2){
                //IF 2 IS CHECKED, DISABLE THE OTHERS
                changeUncheckedBoxesBehaviour(false);
            }else{
                //OTHERWISE ENABLE THE OTHERS
                changeUncheckedBoxesBehaviour(true);
            }
        });
    });

    //QUERY COMPARE BUTTON AND ADD EVENTLISTENER
    compareButton.addEventListener('click', compare);
})();