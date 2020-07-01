const LARGURA_RAQUETE = 10;
const ALTURA_RAQUETE = 100;
const VENCEDOR_PLACAR = 3;

let jogador1Placar = 0;
let jogador2Placar = 0;
let raquete1y = 250;
let raquete2y = 250;
let bolax = 50;
let bolay = 50;
let mostrandoTelaVencedor = false;
let velocidadeBolax = 10;
let velocidadeBolay = 4;

window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    

    let framesPorSegundo = 30;
    setInterval(function() {
        moveTudo();
        desenhaTela();

    }, 1000/framesPorSegundo);

    canvas.addEventListener('mousedown', manipulaMouseClick);

    canvas.addEventListener('mousemove',
        function(evt){
            let mousePosicao = calculaMousePosicao(evt);
            raquete1y = mousePosicao.y - (ALTURA_RAQUETE/2);
        });
}

function calculaMousePosicao(evt) {
    let retangulo = canvas.getBoundingClientRect();
    let raiz = document.documentElement;
    let mousex = evt.clientX - retangulo.left - raiz.scrollLeft;
    let mousey = evt.clientY - retangulo.top - raiz.scrollTop;
    return {
        x:mousex,
        y:mousey
    };
}

function manipulaMouseClick(evt) {
    if(mostrandoTelaVencedor) {
        jogador1Placar = 0;
        jogador2Placar = 0;
        mostrandoTelaVencedor = false;
    }
}

function moveTudo(){
    if(mostrandoTelaVencedor) {
        return;
    }

    calcularMovimento();

    bolax = bolax + velocidadeBolax;
    bolay = bolay + velocidadeBolay;

    if(bolax < 0){
        if(bolay > raquete1y && bolay < raquete1y + ALTURA_RAQUETE){
            velocidadeBolax = -velocidadeBolax;

            let deltay = bolay
                    -(raquete1y+ALTURA_RAQUETE/2);
            velocidadeBolay = deltay * 0.35;        
        } else {
            jogador2Placar++;
            reiniciarBola();
        }
        
    }
    if(bolax > canvas.width){
        if(bolay > raquete2y && bolay < raquete2y + ALTURA_RAQUETE){
            velocidadeBolax = -velocidadeBolax;

            let deltay = bolay
                    -(raquete2y+ALTURA_RAQUETE/2);
            velocidadeBolay = deltay * 0.35;        
        } else {
            jogador1Placar++;
            reiniciarBola();
        }
    }

    if(bolay < 0){
        velocidadeBolay = -velocidadeBolay;
    }
    if(bolay > canvas.height){
        velocidadeBolay = -velocidadeBolay;
    }
}

function reiniciarBola(){
    if(jogador1Placar >= VENCEDOR_PLACAR || jogador2Placar >= VENCEDOR_PLACAR){
        mostrandoTelaVencedor = true;
    }
    velocidadeBolax = -velocidadeBolax;
    bolax = canvas.width/2;
    bolay = canvas.height/2;
}

function calcularMovimento(){
    let raquete2yCentro = raquete2y + (ALTURA_RAQUETE/2);
    if(raquete2yCentro < bolay - 35) {
        raquete2y = raquete2y + 6;
    } else if(raquete2y > bolay + 35){
        raquete2y = raquete2y - 6;
    }
}

function desenhaTela(){
    colorirRetangulo(0,0,canvas.width, canvas.height,'black');

    if(mostrandoTelaVencedor) {
        canvasContext.fillStyle = "white";

        if(jogador1Placar >= VENCEDOR_PLACAR) {
            canvasContext.fillText("Jogador esquerdo ganhou!!", 350, 200);
        } else if(jogador2Placar >= VENCEDOR_PLACAR) {
            canvasContext.fillText("Jogador direito ganhou!!", 350, 200);
        }

        canvasContext.fillText("Clique na tela para continuar", 350, 500);
        return;
    }

    desenhaRede();

    colorirRetangulo(0,raquete1y,LARGURA_RAQUETE,ALTURA_RAQUETE,'white');

    colorirRetangulo(canvas.width - LARGURA_RAQUETE,raquete2y,LARGURA_RAQUETE,ALTURA_RAQUETE,'white');

    colorirCirculo(bolax,bolay,10,'white');

    canvasContext.fillText(jogador1Placar, 100, 100);
    canvasContext.fillText(jogador2Placar, canvas.width-100, 100);
}

function desenhaRede() {
    for(let i=0; i<canvas.height; i+=40) {
        colorirRetangulo(canvas.width/2-1, i, 2, 20, "white");
    }
}

function colorirRetangulo(leftx,TopY,width,height,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftx,TopY,width,height)
}

function colorirCirculo(centerx,centery,radius,drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath();
    canvasContext.arc(centerx,centery,radius,0,Math.PI * 2,true);
    canvasContext.fill();
}