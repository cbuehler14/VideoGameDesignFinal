// Milestone #2
// Christopher Buehler, Stephanie Marin, Alex Supplee

 var tilemap_level1 = [
        "                ",
        "                ",
        "              c ",
        "c               ",
        "ppp      d      ",
        "        pppppppp",
        "       c        ",
        "      ppp    ppp",
        "  pp        c   ",
        "           ppppp",
        "ppppp           ",
        "  cpp         pp",
        "    p   pp  pppp",
        "       ppp     c",
        "                ",
        "pppppppppppppppp"];
        
// w = wall
// p = platform(can jump through from bottom)
// k = key
// d = door
// e = enemy 
// c = coin
// u = User's initial position

var a=random(1500);
var gravity = new PVector(0, 0.15);
var bottom = 400;
var keyArray = [];

// create chicken object
var chickenObj = function(x, y) {

    this.position = new PVector(x, y);
    this.acceleration = new PVector(0,0);
    this.velocity = new PVector(0,0);
    
    // keeps track of the walking state of the chicken
    this.i = 0;
    
    // controls the walking speed of the chicken
    this.curFrame = frameCount;
    
    this.forward = true;
    this.jump = false;
    
    //list of weapons that can be scrolled through and selected
    //if only one weapon or gun we can change this to a bool
    this.weapons = [];
    
    //not sure how many keys per level if multiple and you need array
    this.keys = [];
    
    //keep track of characters score based on mob kills, coins collected, ...
    this.score = 0;
};

var coinObj = function(x, y) {

    this.x = x;
    this.y = y;

    this.w = 20;
    this.wDir = -1;
    
    this.hidden = false;
};

var doorObj = function(x,y){
    
    this.x = x;
    this.y = y;
};

var wallObj = function(x, y) {

    this.position = new PVector(x, y);
};

var grassObj = function(x,y) {

    this.position = new PVector(x, y);
};

// booleans for different screens
var start = true;
var play = false;
var options = false;
var pause = false;
var instructions = false;
var levelCompleted = false;

var score = 0;
var t = 0;

// boolean for sound control
var sound = true;

// booleans tell when objects have been drawn
var chickenMade = false;

//create chicken objetc for start screen animation
var chicken = new chickenObj(10, 260);

// array to track chicken images
var chickens = [];

// 0 = door
var images = [];

// holds door objects
var doors = [];

var keys = [];
var coins = [];

var walls = [];
var grass = [];

// create chicken image and capture it
var chickenImg = function() {
    
    chickenMade = true;
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 0
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2, height/2+100, width/2, height/2+180);
    line(width/2, height/2+100, width/2, height/2+180);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 1
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-10, height/2+100, width/2-40, height/2+130);
    line(width/2+10, height/2+100, width/2+10, height/2+180);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 2
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-20, height/2+100, width/2-40, height/2+150);
    line(width/2+20, height/2+100, width/2+30, height/2+180);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 3
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-20, height/2+100, width/2-40, height/2+180);
    line(width/2+20, height/2+100, width/2+40, height/2+180);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 4
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-20, height/2+100, width/2-30, height/2+180);
    line(width/2+20, height/2+100, width/2+40, height/2+150);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 5
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-10, height/2+100, width/2-10, height/2+180);
    line(width/2+10, height/2+100, width/2+40, height/2+130);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 6
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2, height/2+100, width/2, height/2+180);
    line(width/2, height/2+100, width/2, height/2+180);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 7
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2+10, height/2+100, width/2+40, height/2+130);
    line(width/2-10, height/2+100, width/2-10, height/2+180);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 8
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2+20, height/2+100, width/2+40, height/2+150);
    line(width/2-20, height/2+100, width/2-30, height/2+180);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 9
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-20, height/2+100, width/2-40, height/2+180);
    line(width/2+20, height/2+100, width/2+40, height/2+180);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 10
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2+20, height/2+100, width/2+30, height/2+180);
    line(width/2-20, height/2+100, width/2-40, height/2+150);
    
    chickens.push(get(0,0,width,height));
    
    noStroke();
    fill(50, 100, 220);    // set background of the custom char
    rect(0, 0, 400, 400);
    // 11
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);
    
    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2+10, height/2+100, width/2+10, height/2+180);
    line(width/2-10, height/2+100, width/2-40, height/2+130);
    
    chickens.push(get(0,0,width,height));
};

var doorImg = function() {
    
    fill(100, 60, 10);
    rect(0, 0, 400, 400);
    stroke(50, 30, 5);
    strokeWeight(20);
    noFill();
    rect(50, 50, 120, 120);
    rect(230, 50, 120, 120);
    rect(50, 230, 120, 120);
    rect(230, 230, 120, 120);
    stroke(220, 180, 30);
    strokeWeight(40);
    ellipse(360, 200, 30, 20);
    
    images.push(get(0,0,400,400));  
};

// draws chicken image the size of one tile
chickenObj.prototype.draw = function() {

    if(!this.forward) {
        // contains states that change evry 5 frames to 
        // simluate walking movement
        switch (this.i) {
    
            case 0:
                image(chickens[0], this.position.x, this.position.y, 25, 25);
    
                break;
            case 1:
                image(chickens[1], this.position.x, this.position.y, 25, 25);
    
                break;
            case 2:
                image(chickens[2], this.position.x, this.position.y, 25, 25);
    
                break;
            case 3:
                image(chickens[3], this.position.x, this.position.y, 25, 25);
    
                break;
            case 4:
                image(chickens[4], this.position.x, this.position.y, 25, 25);
    
                break;
            case 5:
                image(chickens[5], this.position.x, this.position.y, 25, 25);
    
        }
    } else {
        
        switch (this.i) {
    
            case 0:
                image(chickens[6], this.position.x, this.position.y, 25, 25);
    
                break;
            case 1:
                image(chickens[7], this.position.x, this.position.y, 25, 25);
    
                break;
            case 2:
                image(chickens[8], this.position.x, this.position.y, 25, 25);
    
                break;
            case 3:
                image(chickens[9], this.position.x, this.position.y, 25, 25);
    
                break;
            case 4:
                image(chickens[10], this.position.x, this.position.y, 25, 25);
    
                break;
            case 5:
                image(chickens[11], this.position.x, this.position.y, 25, 25);
        }
    }

    if ((this.curFrame < (frameCount - 5)) && (keyArray[LEFT] || keyArray[RIGHT])) {

        this.curFrame = frameCount;

        this.i++;

        if (this.i > 5) {

            this.i = 0;
        }
    }
};

doorObj.prototype.draw = function() {
    
    image(images[0], this.x, this.y, 25, 25);
};

wallObj.prototype.draw = function() {
    
    stroke(0);
    strokeWeight(1);
    fill(110, 80, 25);
    rect(this.position.x, this.position.y, 25, 25);
};

grassObj.prototype.draw = function() {
    
    stroke(0);
    strokeWeight(1);
    fill(50, 180, 50);
    rect(this.position.x, this.position.y, 25, 25);
};

coinObj.prototype.draw = function() {
    
    var c1 = random(0,255);
    var c2 = random(0,255);
    var c3 = random(0,255);

    fill(c1, c2, c3);

    ellipse(this.x+15, this.y+15, this.w, 20);

    fill(255, 255, 0);

    ellipse(this.x+15, this.y+15, this.w*0.6, 12);

    this.w += this.wDir;

    if ((this.w > 20) || (this.w < 0)) {

        this.wDir = -this.wDir;
    }
};

chickenObj.prototype.move = function() {
    
    //if char below bottom
    if(this.position.y >= bottom-26){
        
        this.jump = false;
        
        this.acceleration.y = 0;
        this.velocity.y = 0;
        this.position.y = bottom-26;
        
    } else {
        
        this.jump = true;
        this.acceleration.add(gravity);
    }
    
    if(this.position.x >= 375) {
        
        this.position.x = 375;
        
    } else if(this.position.x <= 0){
        
        this.position.x = 0;
    }
    
    if(keyArray[LEFT]){
        
        this.forward = false;
        this.velocity.x = -3.2;
        
    } else if(keyArray[RIGHT]){
        
        this.forward = true;
        this.velocity.x = 3.2;
        
    } else {
        
        this.velocity.x = 0;
    }
    
    if(keyArray[UP] && !this.jump) {
        
        this.jump = true;
        this.acceleration.y = -1.5;
    }
    
    this.velocity.add(this.acceleration);
    
    this.position.add(this.velocity);
};

var keyPressed = function(){
    keyArray[keyCode] = 1;
};

var keyReleased = function(){
    keyArray[keyCode] = 0;
};

// allows user to navigate between different screens by clicking on the commands
var mouseClicked = function() {
    
    if(start && mouseX < 230 && mouseX > 170 && mouseY < 259 && mouseY > 225) {
        
        start = false;
        options = false;
        play = true;
        
    } else if (start && mouseX < 250 && mouseX > 145 && mouseY < 299 && mouseY > 265){
        
        start = false;
        play = false;
        options = true;
        chicken.position.x = 420;
        
    } else if (options) {
        
        if(sound && mouseX < 264 && mouseX > 132 && mouseY < 203 && mouseY > 175) {
            
            sound = false;
            
        } else if(!sound && mouseX < 264 && mouseX > 132 && mouseY < 203 && mouseY > 175) {
            
            sound = true;
            
        } else if(mouseX < 245 && mouseX > 155 && mouseY < 245 && mouseY > 215) {
        
            start = true;
            play = false;
            options = false;
            instructions = false;
            
        } else if(mouseX < 311 && mouseX > 81 && mouseY < 163 && mouseY > 135) {
            
            instructions = true;
            start = false;
            play = false;
            options = false;
        }
    } else if (play) {
        
        if(mouseX < 28 && mouseX > 10 && mouseY < 30 && mouseY > 10) {
            
            play = false;
            pause = true;
        }
    } else if (pause) {
        
        if(sound && mouseX < 264 && mouseX > 132 && mouseY < 203 && mouseY > 175) {
            
            sound = false;
            
        } else if(!sound && mouseX < 264 && mouseX > 132 && mouseY < 203 && mouseY > 175) {
            
            sound = true;
            
        } else if(mouseX < 245 && mouseX > 155 && mouseY < 245 && mouseY > 215) {
        
            start = false;
            play = true;
            options = false;
            pause = false;
        }
    } else if (instructions) {
        
        if(mouseX < 242 && mouseX > 150 && mouseY < 360 && mouseY > 330) {
            
            instructions = false;
            options = true;
        }
    }
};

// Initalizes the tilemap
var initTilemap = function() {

    for (var i = 0; i< tilemap_level1.length; i++) {

        for (var j =0; j < tilemap_level1[i].length; j++) {

            switch (tilemap_level1[i][j]) {

                case 'w': //walls.push(new wallObj(j*25, i*25)); 
                    break;
                case 'p': grass.push(new grassObj(j*25, i*25));
                    break;
                case 'c': coins.push(new coinObj(j*25, i*25));
                    break;
                case 'd': doors.push(new doorObj(j*25, i*25));
                    break;
            }
        }
    }
};

// draw the background for game play
var drawBackground = function() {

    background(50, 100, 220);
    noStroke();
    
    // sky
    //var n1 = a;  
    //for (var x=0; x<=400; x+=12) {
    //    var n2 = 0;
    //    for (var y=0; y<=350; y+=12) {
    //        var c = map(noise(n1,n2),0,1,0,255);
    //        fill(c, c, c+80,150);
    //        rect(x,y,12,12);
    //        n2 += 0.05; // step size in noise
    //    }
    //    n1 += 0.02; // step size in noise
    //}
    //a -= 0.01;  // speed of clouds
    
    noStroke();
    fill(190, 235, 250);
    ellipse(0, 20, 100, 140);
    ellipse(100, 30, 140, 140);
    ellipse(300, 120, 120, 100);
    ellipse(380, 100, 140, 140);
    
    if(!play) {
        
        stroke(0, 0, 0);
        strokeWeight(1);
        for(var i = 0; i < 400; i += 25) {
            
            fill(50, 180, 50);
            rect(i, 360, 25, 25);
            
            fill(110, 80, 25);
            rect(i, 380, 25, 25);
        }
    }
};

var reevaluateBottom = function() {
    
    var b1 = bottom;
    
    for(var j = 0; j < grass.length; j++) {
        
        if(chicken.position.y+26 <= grass[j].position.y && grass[j].position.y < b1 &&
            chicken.position.x+12.5 >= grass[j].position.x && 
                chicken.position.x+12.5 <= grass[j].position.x+25) {
            b1 = grass[j].position.y;
        } 
    }
    bottom = b1;
};

var checkFall = function() {
    
    var falling = true;
    for(var j = 0; j < grass.length; j++) {
        
        if(bottom === grass[j].position.y) {
            
            if(chicken.position.x+12.5 >= grass[j].position.x && 
                chicken.position.x+12.5 <= grass[j].position.x+25) {
                
                falling = false;
            } 
        } 
    }
    if(falling) {
        
        bottom = 375;
    }
};

var checkCoins = function() {
    
    for(var i = 0; i<coins.length; i++) {
        
        if(!coins[i].hidden && 
            dist(chicken.position.x+12.5, chicken.position.y+12.5, coins[i].x, coins[i].y) < 20) {
            
            coins[i].hidden = true;
            score++;
        }
    }
};

var checkDoor = function() {
    
    for(var i = 0; i<doors.length; i++) {
            
        if(dist(chicken.position.x, chicken.position.y, doors[i].x, doors[i].y)<30 && keyArray[DOWN]) {
            
            levelCompleted = true;
        }
    }
};

// Creates screen for game won
var gameWonScreen = function() {
    
    if ((t < 361)) {
        
            background(round(random(0, 255)), round(random(0, 100)), round(random(0, 255)));
            
            fill(255, 255, 255);
            textSize(t/9);
            text("Level completed!", (50*cos(360-t)), 160+(50*sin(360-t)));
            t+=6;
            
            textSize(20);
            text("Score: "+score, 165, 190);
    }
};

initTilemap();

// begin drawing
var draw = function() {

    // draw option screen
    if (levelCompleted) {
        
        gameWonScreen();
        
    } else if(!start && options) {
        
        background(130, 230, 100);
        
        fill(255, 255, 255);
        textSize(30);
        
        if(sound) {
            
            text("Sound off", 133, 200);
        } else {
            
            text("Sound on", 133, 200);
        }
        
        text("View Instructions", 84, 160);
        text("Return", 155, 240);
        
        chicken.draw();
        
    } else if(!start && play) { // draw playing background 
        
        drawBackground();
        
        var i = 0;
        noStroke();
        fill(80, 160, 255);
        rect(10, 10, 8, 20);
        rect(20, 10, 8, 20);
        
        for (i=0; i<doors.length; i++) {
            
            doors[i].draw();
        }
        
        chicken.draw();
        chicken.move();
        
        for (i=0; i<walls.length; i++) {

            walls[i].draw();
        }
    
        for (i=0; i<grass.length; i++) {
    
            grass[i].draw();
        }
    
        for (i=0; i<coins.length; i++) {
            
            if(!coins[i].hidden) {
                
                coins[i].draw();
            }
        }
        
        if(chicken.jump) {
            
            reevaluateBottom();
        }
        
        checkFall();
        checkCoins();
        checkDoor();
        
        fill(255, 255, 255);
        textSize(20);
        text("Score: "+score, 300, 20);
        
    } else if(!start && instructions) { // draw playing background 
        
        background(mouseX/2, 180, 400-mouseY/2);
        
        fill(255, 255, 255);
        textSize(30);
        text("Instructions", 125, 45);
        
        textSize(15);
        text("Use the up arrow to jump and left and right arrows to run!", 18, 80);
        
        text("Use the down button when jumping to ground pound!", 34, 100);
        text("Avoid enemies by jumping over them!", 84, 120);
        
        text("Earn special abilities by collecting coins!", 76, 170);
        text("Cash in coins once you have 5, 10, 20, or 30.", 60, 190);
        text("Higher coin amounts yield more effective abilities!", 44, 210);
        
        text("You will encounter colored keys on your journey.", 42, 260);
        text("One of them will open the colored door at the end.", 40, 280);
        text("You may have to return if you picked up the incorrect key.", 15, 300);
        text("Press down to go through the door when you reach it.", 25, 320);
        
        textSize(30);
        text("Return", 150, 355);
        
    } else if(pause) { // draw pause screen
        
        background(mouseY/2, 400-mouseX/2, 200);
        
        fill(255, 255, 255);
        
        if(sound) {
            
            textSize(30);
            text("Sound off", 133, 200);
        } else {
            
            textSize(30);
            text("Sound on", 133, 200);
        }
        
        text("Return", 155, 240);
        
    }else { // draw first screen
        
        if (!chickenMade) {
    
            chickenImg();
            doorImg();
        }
        
        drawBackground();

        fill(120, 176, 230);

        textSize(45);
        text("Flee the Coop!", 50, 140);

        fill(255, 255, 255);
        textSize(15);
        text("Christopher Buehler, Stephanie Marin, Alex Supplee", 30, 180);
            
        textSize(30);
        text("Play", 170, 250);
        
        textSize(30);
        text("Options", 145, 290);
        
    }
};
