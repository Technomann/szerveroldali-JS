let comparableSpacecraftIds = [];

function compare(){
    if(comparableSpacecraftIds.length < 2){
        //make error visible
    }
}

function disableUncheckedBoxes(){

}

(function(){
    let checkboxes = document.querySelectorAll('input[type=checkbox]');

    checkboxes.forEach(function(checkbox){
        checkbox.addEventListener('change', function(){
            comparableSpacecraftIds = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.id);

            if(comparableSpacecraftIds.length = 2){
                disableUncheckedBoxes();
            }
            //disable unchecked ones
        });
    });

    const compareButton = document.getElementById('compare-button');
    compareButton.addEventListener('click', compare);
})();