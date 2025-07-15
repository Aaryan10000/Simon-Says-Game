let gameSeq = [];
let userSeq = [];
let highScore = 0;

let btns = ["yellow","red","purple","green"];

let started = 0;
let level = 0;

let h2 = document.querySelector("h2")

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game Started");
        started = true;
    }

    levelUp();
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function gameFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText=`Level ${level}`;

    let randIndx = Math.floor(Math.random()*3);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);gameSeq.push(randColor);
    // console.log(gameSeq);
    
    btnFlash(randBtn);
}

function checkAns(idx){
    // console.log("current level: ",level);
    
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if (highScore<level){
            highScore=level;
        }
        h2.innerHTML=`GAME OVER! Your score was: <b>${level}</b>. <br>Your high score is: <b>${highScore}</b>. <br><br>Press any key to started.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        
        reset();
    }
}

function btnPress() {
    let btn = this;
    gameFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started  = 0;
    gameSeq = [];
    userSeq = [];
    level = 0;
}