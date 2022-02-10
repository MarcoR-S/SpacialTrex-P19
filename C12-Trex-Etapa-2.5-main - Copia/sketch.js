var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem, nuvemImg, grupoNuvens;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6, grupoObstaculos;
var PLAY = 1, END = 0;
var gameState = PLAY;
var gameOverImg, restartImg;
var Game, Rest;
var jump, die, checkpoint;
var edges;
var score = 0;


function preload(){
  trex_running = loadAnimation("TrexOrg.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("EspaçoCideral.png");
  
  nuvemImg = loadImage("Jupter.png");

  obstaculo1 = loadImage("Nave1.png");
  obstaculo2 = loadImage("Nave2.png");
  obstaculo3 = loadImage("Nave3.png");
  obstaculo4 = loadImage("Nave4.png");
  obstaculo5 = loadImage("Nave5.png");
  obstaculo6 = loadImage("Nave6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage ("restart.png");

  jump = loadSound ("jump.mp3");
  die = loadSound ("die.mp3");
  checkpoint = loadSound ("checkpoint.mp3");
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  

  grupoObstaculos = createGroup();
  grupoNuvens = createGroup();

  ground = createSprite(width/2,height/2);
  ground.addImage("ground",groundImage);
  ground.scale = 4
  
  //crie um sprite de trex
  trex = createSprite(50,500 ,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("bateu",trex_collided);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)

  
  
  //crie um solo invisível
  invisibleGround = createSprite(width/2,height-10,width,2);
  invisibleGround.visible = false;
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)
  trex.debug = false;
  trex.setCollider("circle",0,0,50);
  //trex.setCollider("rectangle",0,0,200,trex.height);
 Game = createSprite(width/2,height/2-50);
 Game.addImage(gameOverImg);
 Game.scale = 1.2
 

 Rest = createSprite(width/2,height/2);
 Rest.addImage(restartImg);
 Rest.scale = 0.5;

}

function draw() {
  //definir cor do plano de fundo
  background(180);
  edges = createEdgeSprites();
  


  //console.log(trex.y)
  
  text("PONTUAÇÃO: "+score,width-180,20); 
 
  
  
  if(gameState == PLAY){
    if(trex.isTouching(edges)){
      gameState = END;
    }
    ground.velocityX = -(4 + 1.5*score/100);
    Game.visible = false;
    Rest.visible = false;
    score = score+round(frameCount/90)
  // pulando o trex ao pressionar a tecla de espaço
    if(keyDown("space") || touches.length > 0) {
    trex.velocityY = -10;
    jump.play();
    touches = []
    }
    trex.velocityY = trex.velocityY + 1
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(grupoObstaculos.isTouching(trex)){
      // trex.velocityY = -10;
      // trex.velocityY += 1
      die.play();
      gameState = END;
      
      
    }

    if(score > 0 && score% 300 == 0){
      checkpoint.play();
    }
    criarNuvens();
    criarObstaculos();



  }else if(gameState == END){
    ground.velocityX = 0;
    grupoObstaculos.setVelocityXEach(0);
    grupoNuvens.setVelocityXEach(0);
    trex.changeAnimation("bateu", trex_collided);
    trex.velocityY = 0;
    grupoObstaculos.setLifetimeEach(-1);
    grupoNuvens.setLifetimeEach(-1);
    Game.visible = true;
    Rest.visible = true;
    if(mousePressedOver(Rest)){
      reset();
    }


  }

 
  
  
  

  

  drawSprites();
}

//função para gerar as nuvens
function criarNuvens(){
 //escreva seu código aqui
  if(frameCount%300 == 0){
    nuvem = createSprite(width+20,height-300,40,10);
    nuvem.velocityX = -5;
    nuvem.addImage(nuvemImg);
    nuvem.scale = 0.5
    nuvem.y = random(0,300);
    nuvem.lifetime = 900;
    trex.depth = nuvem.depth+1

    grupoNuvens.add(nuvem);
  }
 
}

function criarObstaculos(){
  if(frameCount%50 == 0){
    var obstaculo = createSprite(width+20,height-45,50,40);
    obstaculo.y = random (30,600);
    obstaculo.velocityX = -(6 + 1.5 * score/300);
    var rand = round(random(1,6));
    switch(rand){
      case 1: obstaculo.addImage(obstaculo1);
      break;

      case 2: obstaculo.addImage(obstaculo2);
      break;

      case 3: obstaculo.addImage(obstaculo3);
      break;

      case 4: obstaculo.addImage(obstaculo4);
      break;

      case 5: obstaculo.addImage(obstaculo5);
      break;

      case 6: obstaculo.addImage(obstaculo6);
      break;

     
      default: break;

    }

    obstaculo.scale = 0.3;
    obstaculo3.scale = 0.05
    obstaculo4.scale = 0.05  
    obstaculo
    obstaculo.lifetime = 600;

    grupoObstaculos.add(obstaculo);
  }
}

function reset(){
  gameState = PLAY;
  score = 0;
  grupoObstaculos.destroyEach();
  grupoNuvens.destroyEach();
  trex.changeAnimation("running", trex_running);
  trex.y = 500

}
