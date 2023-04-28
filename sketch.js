//0 = faz nada
//1 = vai fazer alguma coisa
var PLAY = 1;
var END = 0;
var gameState  = PLAY;

console.log(x)




//cons
var Mk,Michael_Klein, edges;
var ground;
var groundImage;
var cloud_image;

//game over botao
var button, button_img;

//grupos
var cloud_group, ob_group;

var jump
var Check
var end

var Points = 0

var ob1;
var ob2;
var ob3;
var ob4;
var ob5;
var ob6;

var ground_invisible;
var underbone
//imagens

//indentar - organizar | depurar - resolver bugs


//exemplo de notas, media
/*var marks = [30,40,45,35];

for(var i = 0; i<marks.length; i = i+1)
{
  console.log(marks[i]);
*/

function preload()
{

  Michael_Klein = loadAnimation("frame1.png","frame2.png","frame3.png");

  groundImage = loadImage("ground2.png");

jump = loadSound("Processo.mp3")
end = loadSound("Fox.mp3")
Check = loadSound("O.mp3")

  cloud_image = loadImage("a.png");

  ob1 = loadImage("ob1.png");
  ob2 = loadImage("ob2.png");
  ob3 = loadImage("ob3.png");
  ob4 = loadImage("ob4.png");
  ob5 = loadImage("ob5.png");
  ob6 = loadImage("ob6.png");

  underbone = loadAnimation("depre.png")


  //pré carregar a imagem do button_img
  button_img = loadImage("Tome.png");

}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  edges = createEdgeSprites();




  //criando o Mk
  Mk = createSprite(width*0.1,160,20,50);
  Mk.addAnimation("running",Michael_Klein);
  Mk.addAnimation("under", underbone)
  Mk.scale = 0.5;
  Mk.x = 50;
  Mk.debug = false;
  //ofset x , ofset
  Mk.setCollider("rectangle", 0,0,60,100);
     underbone.scale = 0.65;
     


  ground = createSprite(300,180);
  ground.addImage(groundImage);
  ground.velocityX = -10;
  ground.debug = false;


  ground_invisible = createSprite(300,190,600,10);
  ground_invisible.visible = false;


  cloud_group = new Group();;
  ob_group = new Group();

  
  button = createSprite(300,100);

  button.addImage(button_img);
 
}




function draw()
{
 /* var rand = Math.round(random(1,50));
  console.log(rand)*/

    //definir a cor do plano de fundo 
    background("white");

 

   if(keyDown("enter"))
{
  
}
    if(gameState === PLAY)
    {
      Points = Points + Math.round(getFrameRate()/60)
      text("Points: " + Points,300,50)

      button.visible = false;

      spawn_Cloud();
    criar_obstaculos();

    if(touches.length> 0 || keyDown("space") && Mk.y >= 150)
    {
      Mk.velocityY = -15
      touches = [];
    }

    Mk.velocityY = Mk.velocityY + 1;

    if(keyDown(RIGHT_ARROW))
    {
      text("nao da pra corre o burro",300,100);
     }
     
     if(ground.x < 0)
     {
       ground.x = ground.width/2
     }
 


    if(ob_group.isTouching(Mk))
    {
      gameState = END;
      end.play()
    }
 
    }

      

    if(gameState === END)
    {
      ground.velocityX = 0;
      Mk.changeAnimation("under", underbone);
      Mk.velocityY = 0;

      ob_group.setLifetimeEach(-1);
      ob_group.setVelocityXEach(0);

      cloud_group.setVelocityXEach(0);
      cloud_group.setLifetimeEach(-1);

      text("Press Enter For Restart",300,100)

      button.visible = true;

      if(mousePressedOver(button))
      {
        reset();
      }
      
    }

    //console.log(Mk.y)
      

    

  //impedir que o Mk caia
    Mk.collide(ground_invisible);

   

    drawSprites();
}

//função reset 
function reset()
{
  
  gameState = PLAY;
  cloud_group.destroyEach();
  ob_group.destroyEach();
  
  Mk.changeAnimation("running",Michael_Klein)

  score = 0;
}



//criar a nuvem
function spawn_Cloud()
{
  //fps (% modulo)
  if(frameCount %60 === 0)
  {
    var cloud = createSprite(600,50);
    cloud.velocityX = -5;
    cloud.addImage(cloud_image);
    cloud.scale = 0.05;
    cloud.y = Math.round(random(30,50))
    cloud.lifetime = 120;
    cloud_group.add(cloud);
  }
  

}


//criar obstaculos
function criar_obstaculos()
{
  if(frameCount %60 === 0)
  {
    var cacto = createSprite(width,160)
    cacto.velocityX = -35;
    cacto.lifetime = 30;
    //
    cacto.debug = true;
 
    
    var rand = Math.round(random(1,6));
    switch(rand)
    {
        case 1: cacto.addImage(ob1);
        cacto.scale = 0.65;
        break;
        case 2: cacto.addImage(ob2);
        cacto.scale = 0.65;
        break;
        case 3: cacto.addImage(ob3);
        cacto.scale = 0.65;
        break;
        case 4: cacto.addImage(ob4);
        cacto.scale = 0.65;
        break;
        case 5: cacto.addImage(ob5);
        cacto.scale = 0.55;
        break;
        case 6: cacto.addImage(ob6);
        cacto.scale = 0.50;
        break;
        default: break;
    }

    ob_group.add(cacto);
  }


}


