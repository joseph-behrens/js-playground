'use strict';

let {view} = require('./view');
let {model} = require('./model');

function buildTable(numRows, numCols) {
    for (let i = 0; i < numRows; i += 1) {
        let table = document.getElementById('grid');
        let row = table.insertRow(i);
        for (j = 0; j < numCols; j += 1){
            let cell = row.insertCell(j);
            cell.id = String(i) + String(j);
        }
    }
}

window.onload = function () {
    buildTable(7, 7);
};