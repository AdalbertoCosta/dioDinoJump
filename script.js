const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let position = 0;
let isJumping = false;
let isGameOver = false;

document.addEventListener('keyup', (event) =>{
    if(event.keyCode === 32 || event.keyCode === 38){
        console.log("apertou pular");
        if(!isJumping) {
            jump();
        }  
    }
    if(event.keyCode === 40){
        console.log("apertou deslizar");
    }

    if(event.keyCode === 39){
        console.log("apertou correr");
    }
});

function jump() {
    isJumping = true;
    let upInterval = setInterval(()=> {
        if(position >= 150 ) {
            clearInterval(upInterval);

            //decida
            let downInterval = setInterval(() =>{
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
            }else {
            position -=20;
            dino.style.bottom = position + "px";
            }
        }, 20);
        
        }else{
            //Subida
            position += 20;
            dino.style.bottom = position + 'px';
        } 
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 100 && cactusPosition < 160 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.head.innerHTML = ' <link rel="stylesheet" href="style.css">';
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}
 createCactus();