import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("grass.png");

class wall extends Sprite {
    constructor(x, y, name, image) {
        super();
        this.x = x;
        this.y = y;
        this.name = "name";
        this.setImage(image);
        this.accelerateOnBounce = false;

    }
}
new wall(0, 0, "A spooky castle wall", "castle.png");

let leftWall = new wall(0, 200, "Left side wall", "wall.png");

let rightWall = new wall(game.displayWidth- 48, 200, "Right side wall", "wall.png");

class Princess extends Sprite {
    constructor() {
        super();
        this.name = "Princess Ann";
        this.setImage("ann.png");
        this.height = 48;
        this.width = 48;
        this.x = game.displayWidth / 2;
        this.y = game.displayHeight - this.height;
        this.speedWhenWalking = 150;
        this.lives = 3;
        this.accelerateOnBounce = false;
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
        this.speedWhenWalking = 150;
    }
    handleLeftArrowKey(){
    this.playAnimation ("left");
    this.angle = 180;
    this.speed = this.speedWhenWalking
    }
    handleRightArrowKey(){
        this.playAnimation ("right");
        this.angle = 360;
        this.speed = this.speedWhenWalking;
    }
    handleGameLoop() {
        this.y = Math.max(5, this.y); 
        this.y = Math.min(game.displayHeight - this.height, this.y);
        this.x = Math.max(0, this.x);
        this.x = Math.min(game.displayWidth - this.width, this.x);
        this.speed = 0;
    }
    handleCollision(otherSprite) {
        let horizontalOffset = this.x - otherSprite.x;
        let verticalOffset = this.y - otherSprite.y;
        if (Math.abs(horizontalOffset) < this.width / 3 
                    && verticalOffset > this.height / 4) {
            otherSprite.angle = 90 + 2 * horizontalOffset;
        }
        return false;
    }
}
let Ann = new Princess();

class Ball extends Sprite {
    constructor(x, y, name, image){
        super();
        this.height = 48;
        this.width = 48;
        this.x = x;
        this.y = y;
        this.name = "name";
        this.setImage(image);
        this.defineAnimation("spin", 0, 11);
        this.playAnimation("spin", true);
        this.speed = 1;
        this.angle = 50 + Math.random() * 80;
    }
    handleGameLoop(){
        if(this.speed < 200){
            this.speed ++  ;
        }
    }
}
new Ball(350, 350, "A ball", "ball.png");
