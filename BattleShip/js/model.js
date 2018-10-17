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