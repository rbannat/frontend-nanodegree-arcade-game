// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var lanes = [50, 130, 220]; //y values for the different lanes
    this.width = 100;
    this.height = 100;
    this.x = -101;
    this.y = lanes[Math.floor(Math.random() * lanes.length)];
    this.speed = Math.floor(Math.random() * (120 - 20)) + 20;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * 10 * dt;

    //remove enemy from enemy array
    if (this.x > 500) {
        allEnemies.splice(allEnemies.indexOf(this), 1);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 202;
    this.y = 300;
    this.isDead = false;
    this.won = false;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    if (this.isDead || this.won) {
        this.x = 202;
        this.y = 300;
    }
    this.isDead = false;
    this.won = false;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            if (this.x - 101 >= 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y - 83 >= 0) {
                this.y -= 83;
            } else {
                this.won = true;
            }
            break;
        case 'right':
            if (this.x + 101 <= 500) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y + 83 <= 400) {
                this.y += 83;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
window.setInterval(function () {
    allEnemies.push(new Enemy());
}, 500);
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
