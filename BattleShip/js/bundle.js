(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

let {model} = require('./model');
let {view} = require('./view');

function hanldeFireButton() {
    let guessInput = document.getElementById('guessInput');
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(event) {
    if (event.keyCode == 13 || event.which == 13) {
        let guessInput = document.getElementById('guessInput');
        let guess = guessInput.value;
        controller.processGuess(guess);
        guessInput.value = "";
    }
}

function parseGuess(guess) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("That's off the board, please make another guess." + guess);
    } else {
        let firstChar = guess.charAt(0).toUpperCase();
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("That's off the board, please make another guess." + guess);
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("That's off the board, please make another guess." + guess);
        } else {
            return row + column;
        }
    }
    return null;
}

let controller = {
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships in " + this.guesses + " guesses!");
                view.hideForm();
            }
        }
    },
    init: function() {
        document.getElementById('fireButton').onclick = hanldeFireButton;
        document.getElementById('guessInput').onkeypress = handleKeyPress(event);
        model.generateShipLocations();
    }
}

module.exports = {
    controller: controller
}
},{"./model":3,"./view":4}],2:[function(require,module,exports){
'use strict';

let {model} = require('./model');
let {view} = require('./view');
let {controller} = require('./controller');

window.onload = function () {
    view.buildTable(model.boardSize);
    controller.init();
};
},{"./controller":1,"./model":3,"./view":4}],3:[function(require,module,exports){
'use strict';

let {view} = require('./view');

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    // TODO: Randomize ship location
    ships: [
        {
            locations: [0, 0, 0],
            hits: ['', '', '']
        },
        {
            locations: [0, 0, 0],
            hits: ['', '', '']
        },
        {
            locations: [0, 0, 0],
            hits: ['', '', '']
        }  
    ],
    collision: function(locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHitMiss(guess, 'hit');
                view.displayMessage('HIT!');
                if (this.isSunk(ship)) {
                    view.displayMessage('You sank my Battleship!!');
                    this.shipsSunk++
                }
                return true;
            }
        }
        view.displayHitMiss(guess, 'miss');
        view.displayMessage('You missed.');
        return false;
    },
    generateShip: function() {
        let direction = Math.floor(Math.random() * 2);
        let row;
        let column;
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            column = Math.floor(Math.random() * (this.shipLength + 1));
        } else {
            row = Math.floor(Math.random() * (this.shipLength + 1));
            column = Math.floor(Math.random() * this.boardSize);
        }

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction ===1) {
                newShipLocations.push(row + "" + (column + i));
            } else {
                newShipLocations.push((row + i) + "" + column);
            }
        }
        return newShipLocations;
    },
    generateShipLocations: function() {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },
    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }
};

module.exports = {
    model: model
}
},{"./view":4}],4:[function(require,module,exports){
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
},{}]},{},[2]);
