//Create variables here
var dog,dogimg,happydogimg;
var foodStock, foodS;
var database;
var feed,addFood;
var fedTime, lastFed;
var foodObj;
var gameState;
var sd = 0;

function preload()
{
  //load images here
  happydogimg = loadImage("images/happydog.png");
  dogimg= loadImage("images/Dog.png");
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();

  dog = createSprite(700,300);
  dog.addImage("dog",dogimg);
  dog.scale =0.2;
  
  feed=createButton("Feed the dog"); 
  feed.position(750,25); 
  feed.mousePressed(feedDog); 

  addFood=createButton("Add Food"); 
  addFood.position(900,25); 
  addFood.mousePressed(addFoods); 

  // other buttons

  choosing_states();

  feed_button=createButton("Feed");
  feed_button.position(350,50);
  feed_button.mousePressed(function(){
    gameState = 0
  });

  bath_button=createButton("I wanna bath");
  bath_button.position(250,85);
  bath_button.mousePressed(function(){
    gameState = 3
  });

  livingroom_button=createButton("I wanna go in living room");
  livingroom_button.position(375,85);
  livingroom_button.mousePressed(function(){
    gameState = 4
  });

  vacci_chart_button=createButton("View Vaccination Chart");
  vacci_chart_button.position(575,85);
  vacci_chart_button.mousePressed(function(){
    gameState = 10
  });

  injection_button=createButton("View injection");
  injection_button.position(775,85);
  injection_button.mousePressed(function(){
    gameState = 6
  });

  vaccination_button=createButton("Vaccinate your pet");
  vaccination_button.position(900,85);
  vaccination_button.mousePressed(function(){
    gameState = 5
  });

  bedroom_button=createButton("Go to Bedroom");
  bedroom_button.position(250,120);
  bedroom_button.mousePressed(function(){
    gameState = 1
  });

  garden_button=createButton("Go to Garden");
  garden_button.position(375,120);
  garden_button.mousePressed(function(){
    gameState = 2
  });

  running_button=createButton("Let's Go for Running");
  running_button.position(500,120);
  running_button.mousePressed(function(){
    gameState = 8
  });

  runningover_button=createButton("Come From Running");
  runningover_button.position(675,120);
  runningover_button.mousePressed(function(){
    gameState = 9
  });

  lazy_button=createButton("I'm Lazyyy");
  lazy_button.position(850,120);
  lazy_button.mousePressed(function(){
    gameState = 7
  });

  foodStock = database.ref('Food');
  foodStock.on("value",function(data){
    foodS = data.val();
  })

  foodObj = new Food(foodS,lastFed,gameState);
}

function draw() {
  
  gameStating();
}

//function to update food stock and last fed time 
function feedDog(){ 
  dog.addImage("dog",happydogimg); 
  foodObj.updateFoodStock(foodObj.getFoodStock())
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    hour:hour()
  })
} 

//function to add food in stock
function addFoods(){ 
  dog.addImage("dog",dogimg);
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
} 

function gameStating(){
  if(gameState === 0){
    background(46,139,87);

    feed.show()
    addFood.show()

    fedTime = database.ref('hour');
    fedTime.on("value",function(data){
      lastFed = data.val();
    });

    fill("black");
    textSize(30);
 
    text("Food Available:" + foodS,200,500);
    drawSprites();
    //add styles here
  
    foodObj.display();

    fill(255,255,254); 
    textSize(15); 
    if(lastFed > 12 && lastFed < 24){
      lastFed = lastFed-12
      text('Last Feed: '+lastFed+'pm',350,30)
    }else if(lastFed === 24){
      lastFed = lastFed-12
      text('Last Feed: '+lastFed+'am',350,30)
    }else if(lastFed < 12){
      text('Last Feed: '+lastFed+'am',350,30)
    }

  }
  else if(gameState === 1){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.bedroom()
  }
  else if(gameState === 2){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.garden()
  }
  else if(gameState === 3){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.washroom()
  }
  else if(gameState === 4){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.livingroom()
  }
  else if(gameState === 5){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.vaccination()
  }
  else if(gameState === 6){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.injection()
  }
  else if(gameState === 7){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.lazy()
  }
  else if(gameState === 8){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.running()
  }
  else if(gameState === 9){
    feed.hide()
    addFood.hide()
    background(255);
    foodObj.runningover()
  }
  else if(gameState === 10){
    feed.hide();
    addFood.hide();
    background(255);
    foodObj.vacci_chart();
  }
}

function choosing_states(){
  a = hour()
  if(a>17 && a<25){
    gameState = 0;
  }
  else if(a === 1 && a<7){
    gameState = 10
  }
  else if(a>6 && a<8){
    gameState = 4;
  }
  else if(a>7 && a<9){
    gameState = 8
  }
  else if(a>8 && a<10){
    gameState = 9
  }
  else if(a>9 && a<11){
    gameState = 3
  }
  else if(a>10 && a<12){
    gameState = 5
  }
  else if(a>11 && a<13){
    gameState = 6
  }
  else if(a>12 && a<16){
    gameState = 7
  }
  else if(a>15 && a<17){
    gameState = 2
  }
  else if(a>16 && a<18){
    gameState = 1
  }

  console.log(gameState)
  
}
