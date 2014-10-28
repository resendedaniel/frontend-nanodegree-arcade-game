// Test git

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -1;
    this.y = Math.floor(Math.random() * 5);
    this.speed = Math.random() * 100 + 1;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt/100 * this.speed;
    this.x = this.x > 8 ? -1 : this.x;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83 - 25));
}

// Increase enemy speed
// Parameter: if available adds to speed
Enemy.prototype.increaseSpeed = function(a) {
    if(!a) a = 10;
    this.speed += a;
}


// Player that is controllable
var Player = function() {
    var playerImages = [
                    'images/char-lucas.png',
                    'images/char-nina.png',
                    'images/char-babi.png'
                    // 'images/char-boy.png',
                    // 'images/char-cat-girl.png',
                    // 'images/char-horn-girl.png',
                    // 'images/char-pink-girl.png',
                    // 'images/char-princess-girl.png'
                    ];
    this.sprite = playerImages[Math.floor(Math.random() * playerImages.length)];
    this.x = 3;
    this.y = 5;
    this.points = 0;
}

// Update player's position
Player.prototype.update = function(e) {
    // console.log("(" + this.x + "," + this.y + ")");
    switch(e) {
        case 'left':
            move(this, -1, 0);
            break;
        case 'right':
            move(this, 1, 0);
            break;
        case 'up':
            move(this, 0, -1);
            break;
        case 'down':
            move(this, 0, 1);
            break;
        case 'ne':
            move(this, 1, -2);
            break;
        case 'en':
            move(this, 2, -1);
            break;
        case 'es':
            move(this, 2, 1);
            break;
        case 'se':
            move(this, 1, 2);
            break;
        case 'sw':
            move(this, -1, 2);
            break;
        case 'ws':
            move(this, -2, 1);
            break;
        case 'wn':
            move(this, -2, -1);
            break;
        case 'nw':
            move(this, -1, -2);
            break;
    }

    function move(that, a, b) {
        var nx = that.x + a, // newX
            ny = that.y + b; // newY

        // If it is an invalid position, skip move
        if((nx > -1 && nx < 8) && (ny > -1 && ny < 6)) {
            that.x = nx;
            that.y = ny;
        };
    }
}

// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83 + 40));
}

// Handle keyup function
Player.prototype.handleInput = function(e) {
    this.update(e);
}

// Gem class that adds points to player
var Gem = function() {
    var gemImages = [
                'images/Gem-Blue.png',
                'images/Gem-Green.png',
                'images/Gem-Orange.png'
            ];
    this.sprite = gemImages[Math.floor(Math.random() * gemImages.length)];
    this.x = Math.floor(Math.random() * 8);
    this.y = Math.floor(Math.random() * 5);
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83 - 15));
}

// This listens for key presses and sends the keys to your
// Ordinary moves and chess horse like
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        85: 'wn', // 2 to west 1 to north
        73: 'nw', // 2 to north 1 to west
        79: 'ne',
        80: 'en',
        74: 'ws',
        75: 'sw',
        76: 'se',
        186: 'es'
    }

    player.handleInput(allowedKeys[e.keyCode]);
});
