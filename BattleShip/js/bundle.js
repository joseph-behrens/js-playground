(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*jslint browser:true */
/*jslint for:true */
/*jslint es6 */
/*global window, console, for */

let {view} = require('./view');
let {model} = require('./model');

function buildTable(numRows, numCols) {
    'use strict';
    let i;
    let j;
    
    for (i = 0; i < numRows; i += 1) {
        let table = document.getElementById('grid');
        let row = table.insertRow(i);
        for (j = 0; j < numCols; j += 1){
            let cell = row.insertCell(j);
            cell.id = String(i) + String(j);
        }
    }
}

window.onload = function () {
    'use strict';
    buildTable(7, 7);
};
},{"./model":2,"./view":3}],2:[function(require,module,exports){
let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    // TODO: Randomize ship location
    ships: [
        {
            locations: ['10', '20', '30'],
            hits: ['', '', '']
        },
        {
            locations: ['32', '33', '34'],
            hits: ['', '', '']
        },
        {
            locations: ['63', '64', '65'],
            hits: ['', '', '']
        }   
    ],
    
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let locations = ship.locations;
            let index = locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                return true;
            }
        }
        return false;
    }
};

module.exports = {
    model: model
}
},{}],3:[function(require,module,exports){
let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },
    displayHitMiss: function(location, action) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', action)
    }
}

module.exports = {
    view: view
}
},{}]},{},[1]);
