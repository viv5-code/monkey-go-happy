var ground,monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, bananaGroup, obstacleGroup;
var score
var invisibleGround;
var survivalTime = 0;
var monkeyCollided, monkeyCollidedimage;
var PLAY = 1;
var END = 0;
var gameState = PLAY ;


function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");
  obastacleImage = loadImage("obstacle.png");
  monkeyCollidedimage = loadImage("sprite_0.png")

}

function setup() {
  createCanvas(600, 600);

  monkeyCollided = createSprite(80, 345, 20, 20);
  monkeyCollided.addImage(monkeyCollidedimage)
  monkeyCollided.visible = false;

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(80, 407, 1500, 20);
  ground.velocityX = -1;
  ground.x = ground.width / 2;

  invisibleGround = createSprite(200, 407, 400, 10);
  invisibleGround.visible = false

  bananaGroup = createGroup();
  obstacleGroup = createGroup();



  monkey.setCollider("rectangle", 0, 0,  150, monkey.height);
  monkey.debug = true;
  score = 0;
}


function draw() {
  background("green");

  if (gameState === PLAY) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    ground.velocityX = -(4 + 3 * score / 100)

    if (keyDown("space") && monkey.y >= 340) {
      monkey.velocityY = -20;
      
    }

    monkey.velocityY = monkey.velocityY + 0.8

    monkey.collide(invisibleGround);

    food();
    obstacles();

    if (bananaGroup.collide(monkey)) {
      bananaGroup.destroyEach();
      score = score + 1;
    }

survivalTime = Math.round(frameCount / frameRate())

   if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }

  } else if (gameState === END) {
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    monkey.velocityX = 0;
    ground.velocityX = 0;

    monkeyCollided.visible = true;
    monkeyCollided.scale = 0.2;
    //monkey.visible = false;
    monkeyCollided.collide(invisibleGround);
    monkeyCollided.velocityX = 0;
    monkeyCollided.velocityY = 0;
    monkey.visible = false;

    stroke("black")
    textSize(30);
    fill = ("black")
    text("Your game is over", 200, 230)

  }


  stroke("white");
  textSize(20);
  fill = ("red");
  text("Score:" + score, 500, 50);

  stroke("black");
  textSize(20);
  fill = ("black");
  text("Survival Time :" + survivalTime, 70, 50);

  drawSprites();
}

function food() {
  if (frameCount % 150 === 0) {
    banana = createSprite(600, 120, 60, 20);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }

}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 380, 100, 100);
    //  obstacle.x =  Math.round(random(100,200));
    obstacle.addImage(obastacleImage);
    obstacle.velocityX = -(6 + score / 100);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;

    obstacleGroup.add(obstacle);

  }
}