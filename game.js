class Game{
    constructor(){
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,410,75,75)
    player1.addImage("player1",player_img)
    player1.setCollider('rectangle',0,39,100,8)
    player1.scale = 0.8
    
    player2 = createSprite(800,410,75,75)
    player2.addImage("player2", player_img)
    player2.scale = 0.8
    player2.setCollider('rectangle',0,39,100,8)

    players=[player1,player2]
     }
    
    play(){
      form.hide();
      Player.getPlayerInfo();
      image(bg,0,0,700,500)
      var x =100;
      var y=200;
      var index = 0
      strokeWeight(4)
      line(0,455,700,455)
      image(rect,12,10,150,45)
      image(rect,12,60,150,45)
      drawSprites();
      for(var plr in allPlayers){
          index = index+1;
          x = 500-allPlayers[plr].distance;
          y = 410;
          
          players[index -1].x = x;
          players[index - 1].y = y;
            
          if(index === player.index){
            textSize(24)
            fill(0)
            text(allPlayers[plr].name,x-35,y+23)
          }
          textSize(24)
          fill(0)
          text("Player1: "+ allPlayers.player1.score,25,40)
          text("Player2: "+ allPlayers.player2.score,25,90)
          text("Take 25 score to win",130,485)
      }
     if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
         player.distance -= 5
         player.update();
     }
     if (keyIsDown(LEFT_ARROW) && player.index !== null) {
         player.distance += 5
         player.update();
     }
      if (frameCount % 70 === 0) {
          fruits = createSprite(random(50,650),0,100,100);
          fruits.velocityY = 8;
          var rand = Math.round(random(1,5));
          switch(rand){
              case 1: fruits.addImage("fruit1",f1);
              break;
              case 2: fruits.addImage("fruit1",f2);
              break;
              case 3: fruits.addImage("fruit1",f3);
              break;
              case 4: fruits.addImage("fruit1",f4);
              break;
              default: fruits.addImage("fruit1",f5);
              break;
          }
          fruits.depth = player1.depth-=1
          player2.depth = player1.depth+=1
          fruitGroup.add(fruits);
      }
      
       if (player.index !== null) {
         for (var i = 0; i < fruitGroup.length; i++) {
             if (fruitGroup.get(i).isTouching(players)) {
                 fruitGroup.get(i).destroy();
                 player.score = player.score+1;
                 player.update()
             }
         }
       }
       if(player.score >= 25){
         gameState=2
       }
    }
    end(){
      imageMode(CENTER)
      image(over,350,100,300,150)
      fill(255)
      textSize(28)
      text("Thank you for playing",230,250)
    }
}
