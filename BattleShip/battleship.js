/*jslint browser:true */
/*jslint for:true */
/*jslint es6 */
/*global window, console, for */


function buildTable() {
    'use strict';
    let i;
    let j;
    console.log('Building Table');
    for (i = 0; i < 7; i += 1) {
        let table = document.getElementById('grid');
        let row = table.insertRow(i);
        for (j = 0; j < 7; j += 1){
            let cell = row.insertCell(j);
            cell.id = String(i) + String(j);
        }
    }
}

window.onload = function () {
    'use strict';
    buildTable();
};