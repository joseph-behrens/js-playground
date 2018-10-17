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