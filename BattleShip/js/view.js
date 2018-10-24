'use strict';

let view = {
    displayMessage: function(msg) {
        document.getElementById('messageArea').innerHTML = msg;
    },
    displayHitMiss: function(location, action) {
        document.getElementById(location).setAttribute('class', action)
    },
    hideForm: function() {
        document.getElementById('guessForm').style.display = 'none';
    },
    buildTable: function(tableSize) {
        for (let i = 0; i < tableSize; i += 1) {
            let table = document.getElementById('grid');
            let row = table.insertRow(i);
            for (let j = 0; j < tableSize; j += 1){
                let cell = row.insertCell(j);
                cell.id = String(i) + String(j);
            }
        }
    }
}

module.exports = {
    view: view
}