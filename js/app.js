// necessary variables and arrayes for the game
const allEnemies = [];
let end = false ;
const speedUp = document.querySelector('#speedUp');

// ************* Enemy Class *************
const Enemy = function(x, y, speed) {
    // initial variables for enemy X position , Y postion and Speed
    this.x = x ;
    this.y = y ;
    this.speed = speed ;

    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt ;

    // when enemy go beyond the boundries back again
    if (this.x > 500){
        this.x = (Math.random() * 300) - 400 ;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ************* Player Class *************
const Player = function(x, y) {
    // initial variables for Player`s start X postion and Y postition  
    this.x = x ;
    this.y = y ;

    // players char image
    this.sprite = 'images/char-boy.png' ;
};

// This class requires an update(), render()
Player.prototype.update = function() {
    // when the game ends reset the player`s position
    if (end) {
        this.x = 200;
        this.y = 380;
    }   

    // boundaries check 
    if (this.x > 400){
        this.x = 400 ;
    }
    else if (this.x < 0) {
        this.x = 0 ;
    }
    else if (this.y < -19) {
        this.y = -20 ;
        popup();
    }
    else if (this.y > 380) {
        this.y = 380 ;
    }

    // collision with enemy check
    allEnemies.forEach(function (enemy) {
        // if the player and the enemy on the same level 
        // and distance between them about 30 return the player
        // to the initial position
        if (enemy.y === player.y){
            if ((enemy.x - player.x) > -30 && (enemy.x - player.x) < 30){
                player.x = 200 ;
                player.y = 380 ;
            }     
        }
    })
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y) ;
}

// a handleInput() method.
Player.prototype.handleInput = function (keyPressed) {
    if (keyPressed === 'left') {
        this.x -= 100 ;
    }
    else if (keyPressed === 'right') {
        this.x += 100 ;
    }
    else if (keyPressed === 'up') {
        this.y -= 80 ;
    }
    else if (keyPressed === 'down') {
        this.y += 80 ;
    }
}

// **** Now instantiate the objects ****
const player = new Player(200, 380 , 50) ;
const enemyPosition = [60 , 140 , 220 , 60, 140] ;
const enemyPositionX = [50, 100, 50,-400 , -700]

// Place all enemy objects in an array called allEnemies
for (i = 0; i<enemyPosition.length; i++){
    let speed = (Math.random() * 200) + 100 ;
    const enemy = new Enemy(enemyPositionX[i] , enemyPosition[i] , speed) ;
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// increase the speed of enemies by 75 if used clicked the button
speedUp.addEventListener('click', function() {
    allEnemies.forEach(function(enemy){
        enemy.speed += 75 ;
    })
});

// when the player reach the water popup the winning window
function popup () {
    document.querySelector('.win').classList.add('show');
    end = true ;
}
