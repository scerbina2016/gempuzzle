//document.body.innerHTML='<div>dddddddddddddddddddd</div>';

//document.body.insertAdjacentHTML('<div>aaaaaaaaaaaaaaaaaaaaa</div>');
const divi =document.getElementById("main");
//<canvas id="canvas"></canvas>
//document.createElement('section');
divi.innerHTML=`<div class="puzzle"><canvas id="canvas"></canvas></div>
<div class="menu" id="top_menu">
<div class="but" id="but_run"><p>New game</p></div>
<div class="but" id="but_stop"><p>Stop</p></div>
<div class="but" id="but_save"><p>Save</p></div>
<div class="but" id="but_res"><p>Result</p></div>
</div>

<div class="out" id="out_bar">
    <div class="out" id="out_moves"><p>Moves:</p></div>
    <div class="out" id="out_moves_value"><p>0</p></div>
    <div class="out" id="out_time"><p>Time:</p></div>
    <div class="out" id="out_time_value"><p>00:00:00</p></div>
</div>
<div class="choice_bar"><span>Other size:</span>
  <div><a class="choice" id="choice_4x4" href="index.html">4X4</a></div>
  <div><a class="choice" id="choice_5x5" href="index55.html">5X5</a></div>
  <div><a class="choice" id="choice_7x7" href="index66.html">6X6</a></div>
  <div><a class="choice" id="choice_8x8" href="index77.html">7X7</a></div>
</div>`

console.log(divi);
//const new_Div=document.createElement('canvas');
//new_Div.id='canvas';

//document.body.insertBefore(new_Div,divi);

//document.body.appendChild(new_Div);
//console.log(new_Div);

//divi[0].innerHTML='<div>aaaaaaaaaaaaaaaaaaaaa</div>';
//puzzl.innerHTML='<div>aaaaaaaaaaaaaaaaaaaaa</div>';
const burger = document.querySelector("main");

function fixTimeBegining(){
  let date = new Date();
  let time = [date.getHours(),date.getMinutes(),date.getSeconds()]
  return time;
}
let timeBegin;
let timeRun;
let gameTime;
function clockTimer(){

  let t = document.getElementById('out_time_value');
  t.started = new Date;
  t.update = ms => t.innerHTML = new Date(ms).toISOString().split(/T|\./)[1]
  setInterval(() => t.update(new Date - t.started), 500);
  gameTime=t.update(new Date - t.started);//======================
  console.log('gameTime   '+gameTime);
}

  /*let date = new Date();
  let timer = [];
  let time = [date.getHours(),date.getMinutes(),date.getSeconds()];
  if(timeRun==0){timeBegin[2]=time[2]};
timeRun=1;
  console.log(time);
  timer[0] = time[0]-timeBegin[0];
  timer[1] = time[1]-timeBegin[1];
  if(time[2]==0){timeBegin[2]=time[2]};
  timer[2] = time[2]-timeBegin[2];
  if(timer[0] < 10){timer[0] = "0"+ timer[0];}
  if(timer[1] < 10){timer[1] = "0"+ timer[1];}
  //if(timer[2]<0 &&timer[1]==0){timer[2]=-timer[2]};
  if(timer[2] < 10){timer[2] = "0"+ timer[2];}
  let current_time = [timer[0],timer[1],timer[2]].join(':');
  //let current_time = [timer[0],timer[1],timer[2]].join(':');
  let clock = document.getElementById("out_time_value");
  clock.innerHTML = current_time;//current_time;
  setTimeout("clockTimer()", 1000);
}*/
//===============================================================================================

function getRandomBool() {
    if (Math.floor(Math.random() * 2) === 0) {
      return true;
    }
  }
  
  function Game(context, cellSize){
    this.state = [
      [1,2,3,4,5,6,7,8],
      [9,10,11,12,13,14,15,16],
      [17,18,19,20,21,22,23,24],
      [25,26,27,28,29,30,31,32],
      [33,34,35,36,37,38,39,40],
      [41,42,43,44,45,46,47,48],
      [49,50,51,52,53,54,55,56],
      [57,58,59,60,61,62,63,0]
    ];
    
    this.color = "red";
  
    this.context = context;
    this.cellSize = cellSize;//=====================================
  
    this.clicks = 0;
  }
  
  Game.prototype.getClicks = function() {
    return this.clicks;
  };
  
  Game.prototype.cellView = function(x, y) {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      x + 1, 
      y + 1, 
      this.cellSize - 2, 
      this.cellSize - 2
    );
  };
  
  Game.prototype.numView = function() {
    this.context.font = "bold " + (this.cellSize/2) + "px Sans";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "white";
  };
  
  Game.prototype.draw = function() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.state[i][j] > 0) {
          this.cellView(
            j * this.cellSize, 
            i * this.cellSize
          );
          this.numView();
          this.context.fillText(
            this.state[i][j], 
            j * this.cellSize + this.cellSize / 2,
            i * this.cellSize + this.cellSize / 2
          );
        }
      }
    }
  };
  
  Game.prototype.getNullCell = function(){
    for (let i = 0; i<8; i++){
      for (let j=0; j<8; j++){
        if(this.state[j][i] === 0){
          return {x: i, y: j};
        }
      }
    }
  };
  
  Game.prototype.move = function(x, y) {
    let nullCell = this.getNullCell();
    let canMoveVertical = (x - 1 == nullCell.x || x + 1 == nullCell.x) && y == nullCell.y;
    let canMoveHorizontal = (y - 1 == nullCell.y || y + 1 == nullCell.y) && x == nullCell.x;
  
    if (canMoveVertical || canMoveHorizontal) {
      this.state[nullCell.y][nullCell.x] = this.state[y][x];
      this.state[y][x] = 0;
      this.clicks++;
    }
  };
    
  Game.prototype.victory = function() {
    let combination = [
    [1,2,3,4,5,6,7,8],
    [9,10,11,12,13,14,15,16],
    [17,18,19,20,21,22,23,24],
    [25,26,27,28,29,30,31,32],
    [33,34,35,36,37,38,39,40],
    [41,42,43,44,45,46,47,48],
    [49,50,51,52,53,54,55,56],
    [57,58,59,60,61,62,63,0]];
    let res = true;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (combination[i][j] != this.state[i][j]) {
          res = false;
          break;
        }
      }
    }
    return res;
  };
  
  Game.prototype.mix = function(count) {
    let x, y;
    for (let i = 0; i < count; i++) {
      let nullCell = this.getNullCell();
  
      let verticalMove = getRandomBool();
      let upLeft = getRandomBool();
  
      if (verticalMove) {
        x = nullCell.x; 
        if (upLeft) {
          y = nullCell.y - 1;
        } else {
          y = nullCell.y + 1;
        }
      } else {
        y = nullCell.y; 
        if (upLeft) {
          x = nullCell.x - 1;
        } else {
          x = nullCell.x + 1;
        }
      }
  
      if (0 <= x && x <= 7 && 0 <= y && y <= 7) {
        this.move(x, y);
      }
    }
  
    this.clicks = 0;
  };

  //==================================================================================================
const runMix=document.getElementById("but_run");
const stopGame=document.getElementById("but_stop");

  window.addEventListener('resize', () => {  window.location.href = window.location.href});
  let cellSize;
  window.onload = function(){
    
    let canvas = document.getElementById("canvas");
    if(window.innerWidth<window.innerHeight){
        canvas.width  = window.innerWidth-150;
        canvas.height = window.innerWidth-150;
        let cellSize = window.innerWidth / 8; 
    } else {
        canvas.width  = window.innerHeight-150;
        canvas.height = window.innerHeight-150; 
        let cellSize = window.innerWidth / 8; 
    }

    //canvas.width  = window.innerWidth;//=================================================
    //canvas.height = window.innerWidth;
  
    let context = canvas.getContext("2d");
    context.fillRect(0, 0, canvas.width, canvas.height);
  //let  cellSize = (canvas.width) / 4;
    let cellSize = (canvas.width) / 8; 
  console.log('cells   '+ cellSize);
    let game = new Game(context, cellSize);
    
    game.mix(300);
    game.draw();
    runMix.addEventListener('click',()=>{
      window.location.href = window.location.href
      
    });//===========================
    
    canvas.onclick = function(e) {
      let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
      let y = (e.pageY - canvas.offsetTop)  / cellSize | 0;
     // if(game.getClicks()==1) { timeBegin=fixTimeBegining()};//===
     // clockTimer();//===
      onEvent(x, y); 
    };
  
    canvas.ontouchend = function(e) {
      let x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
      let y = (e.touches[0].pageY - canvas.offsetTop)  / cellSize | 0;
      //if(game.getClicks()==1) { timeBegin=fixTimeBegining()};//===
      //clockTimer();//===
      onEvent(x, y);
    };  
  
    function onEvent(x, y) { 
      game.move(x, y);
      context.fillRect(0, 0, canvas.width, canvas.height);
      game.draw(); 
      if(game.getClicks()==1) { timeBegin=fixTimeBegining();timeRun=0;clockTimer();};
      console.log('begining    '+timeBegin);
      stopGame.addEventListener('click',() =>{return});
      //clockTimer();//==================================
     document.getElementById('out_moves_value').innerText=game.getClicks();//================================
     
     
      if (game.victory()) {
        alert("Win! "+game.getClicks()+" clicks! " + 'and time:'+ document.getElementById('out_time_value').innerHTML); 
        game.mix(300);
        window.location.href = window.location.href;
        context.fillRect(0, 0, canvas.width, canvas.height);
        game.draw(context, cellSize);
      }
    }
  }