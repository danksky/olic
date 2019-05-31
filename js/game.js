
var playerPiece;
var chairPiece;

function startGame() {
    playerPiece = new player(30, 30, "red", 10, 120);

    chairPiece = new chair(30, 30, "lightblue", 20, 50);

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function chair(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function player(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.attached) {
            this.attached.x += this.speedX;
            this.attached.y += this.speedY;
        }
    }
    this.attached = null;
}

function updateGameArea() {
    myGameArea.clear();
    
    playerPiece.speedX = 0;
    playerPiece.speedY = 0;    
    if (myGameArea.keys && myGameArea.keys[32]) {
        if (playerPiece.attached) {
            // playerPiece.attached = null
        }
        else {
            playerPiece.attached = chairPiece;
            console.log(playerPiece.attached);
        }
    }
    if (myGameArea.keys && myGameArea.keys[37]) {
        playerPiece.speedX = -1; 
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
        playerPiece.speedX = 1; 
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
        playerPiece.speedY = -1; 
    }
    if (myGameArea.keys && myGameArea.keys[40]) {
        playerPiece.speedY = 1; 
    }
    chairPiece.update();
    playerPiece.newPos();    
    playerPiece.update();
}