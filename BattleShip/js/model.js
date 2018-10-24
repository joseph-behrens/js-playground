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