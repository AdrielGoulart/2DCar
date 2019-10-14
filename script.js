"use strict";
var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");

var x = 200, y = 200, ang = 0;
var alt = 50, larg = 50;
var vel = 10, acelerar = 0;
var scale = 0.8;
var cor = "rgb(255,0,0)";
var rotacao;
var fundoImg = new Image();
var explosaoImg = new Image();
var explodir = false;


var teclas = [];
for (let index = 0; index < 256; index++) {
    teclas[index] = false;
}


function desenhar() {
    processaTeclas();

    //Limpa a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgb(255,128,0)";
    ctx.lineWidth = 2;

    x += (vel * acelerar) * Math.cos(Math.PI / 180 * ang);
    y += (vel * acelerar) * Math.sin(Math.PI / 180 * ang);


    ctx.save();

    fundo();
    retanguloFaroisTras(77, 72);
    retanguloFaroisTras(77, 40);
    retanguloFaroisFrente(17, 72);
    retanguloFaroisFrente(17, 40);
    retanguloPneu(62, 34);
    retanguloPneu(62, 78);
    retanguloPneu(3, 34);
    retanguloPneu(3, 78);
    retanguloCorpo();
    if (explodir) {
        explosao();
    }

    ctx.restore();
    requestAnimationFrame(desenhar);
}

//Função que constroi o corpo
function retanguloCorpo() {
    ctx.save();
    ctx.fillStyle = "rgb(0,50,0)";
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillRect(-larg / 2, -alt / 2, 100, 50);
    ctx.restore();
}


//Função que constroi os Fárois Traseiros
function retanguloFaroisTras(posX, posY) {
    ctx.save();
    ctx.fillStyle = cor;
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillRect(larg - posX, alt - posY, 12, 12);
    ctx.restore();
}

//Função que constroi os Fárois Dianteiros
function retanguloFaroisFrente(posX, posY) {
    ctx.save();
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillRect(larg + posX, alt - posY, 12, 12);
    ctx.restore();
}

//Função que constroi os Pneus
function retanguloPneu(posX, posY) {
    ctx.save();
    ctx.fillStyle = "rgb(0,100,0)";
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.PI / 180 * ang);
    ctx.fillRect(larg - posX, alt - posY, 15, 12);
    ctx.restore();
}

requestAnimationFrame(desenhar);

document.onkeydown = function (evt) {
    teclas[evt.keyCode] = true;
}

document.onkeyup = function (evt) {
    teclas[evt.keyCode] = false;
    if (evt.keyCode == 38 || evt.keyCode == 40) {
        acelerar = 0;
        cor = "rgb(255,0,0)";
    }
}

function fundo() {
    fundoImg.src = "fundo.png";
    ctx.drawImage(fundoImg, 0, 0);
}

function explosao() {
    explodir = true;
    explosaoImg.src = "explosao.png";
    ctx.drawImage(explosaoImg, x, y - 30);
    ctx.drawImage(explosaoImg, x - 80, y - 30);
    ctx.drawImage(explosaoImg, x - 40, y - 80);
    setTimeout(function () {
        location.reload();
    }, 400);
}


//Move o carro
function processaTeclas() {
    //Acelerador 
    if (teclas[38]) {
        if ((x + (larg * scale)) >= 880 || (y + (alt * scale)) >= 880 || (x - (larg * scale)) <= 26 || (y - (alt * scale)) <= 26) {
            acelerar = 0;
            teclas[37] = false;
            teclas[39] = false;
            explosao();
        } else {
            acelerar = 1;
        }

    }
    //Ré do Carro
    if (teclas[40]) {
        if ((x + (larg * scale)) >= 920 || (y + (alt * scale)) >= 920 || (x - (larg * scale)) <= -26 || (y - (alt * scale)) <= -26) {
            acelerar = 0;
            teclas[37] = false;
            teclas[39] = false;
            explosao();
        } else {
            acelerar = -1;
            //Muda a cor do farol para branco caso dê a Ré
            cor = "rgb(255,255,255)";
        }
    }

    //Seta para esquerda
    if (teclas[37] && (teclas[38] || teclas[40])) {
        ang -= 5;
    }
    //Seta para direita
    if (teclas[39] && (teclas[38] || teclas[40])) {
        ang += 5;
    }
    //Letra A aumenta o tamanho do carro
    if (teclas[65] && scale < 1.2) {
        scale += 0.1;
    }
    //Letra D diminui o tamanho do carro
    if (teclas[68] && scale > 0.5) {
        scale -= 0.1;
    }

}










