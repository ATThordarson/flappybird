// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var labelScore;
var player;
var pipes;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg","assets/200px-Master_Sword_WW.png");
    game.load.image("playerImg2","assets/212px-Royal_Crest_TP.png");
    game.load.image("Navi","assets/rsz_navi_artwork.png");
    game.load.audio("score","assets/NaviSound.mp3");
    game.load.image("Shield",'assets/rsz_linkshield.png');
    game.load.image("block",'assets/rsz_1rsz_cloud.png');

}

/*
 * Initialises the game. This function is only called once.
 */
function create(){
    // set the background colour of the scene
   game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.setBackgroundColor("#6699FF");
    game.add.text(50,170,"Welcome to my flight of Navi game!",{font: "40px Impact",fill: "#009933"});
    game.add.sprite(280,10,"playerImg");
    game.add.sprite(10,10,"playerImg2");
    game.add.sprite(590,2,"Shield");


    player = game.add.sprite(100,200,"Navi");
    game.physics.arcade.enable(player);

    pipeInterval = 1.75;
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND,generatePipe);

    //game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    labelScore =game.add.text(20,20,"0");

    player.body.gravity.y=250;

    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(gameover);

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);


    pipes = game.add.group();
    generatePipe();







}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player,pipes,gameover);



}
    function changeScore() {
    score = score + 1;
        labelScore.setText(score.toString());
    }

function moveRight () {
    player.x = player.x + 10;
}

function moveLeft () {
    player.x = player.x - 10;
}

function moveUp () {
    player.y = player.y - 10;
}

function moveDown () {
    player.y = player.y + 10;
}


    function generatePipe(){
        var gap = game.rnd.integerInRange(1,5);
        for(var count = 0; count < 8; count++) {
            if (count!=gap && count!=gap+1) {
                addPipeBlock(800,count*50);
            }
        }
        changeScore();
    }
function addPipeBlock(x,y) {
    var pipe = pipes.create(x,y,"block");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x=-200

}

function playerJump() {
    player.body.velocity.y=-200;
}


    function gameover() {
        location.reload();
    }


