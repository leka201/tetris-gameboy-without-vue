// teste do p5
let y = 0;

function setup() {
    createCanvas(600, 540);
}

function draw() {
    background(0);
    fill(255);
    rect(300, y, 30, 30);
    y += 1; // Move para baixo
    if (y > height) {
        y = 0; // Reseta a posição
    }
}


function orientPoints(pieceType, rotation) {
    let results =[];
    switch (pieceType) {
        case 0:
            switch(rotation) {
                case 0:
                results = [
                    [-2,0],
                    [-1,0],
                    [0,0],
                    [1,0]
                ];
                break;
            case 1:
                results=[
                    [0,-1],
                    [0,0],
                    [0,1],
                    [0,2]
                ];
                break;
            case 2:
                results =[
                    [-2,1],
                    [-1,1],
                    [0,1],
                    [1,1]
                ];
                break;
                case 3:
                    results =[
                        [-1,-1],
                        [-1,0],
                        [-1,1],
                        [-1,2]
                    ];
                    break;
            }
            break;
        case 1:
            switch(rotation) {
                case 0:
                    results= [
                        [-2,-1],
                        [-2,0],
                        [-1,0],
                        [0,0]
                    ];
                    break;
                case 1:
                    results = [
                        [-1,-1],
                        [-1,0],
                        [-1,-1],
                        [0,-1]
                    ];
                    break;
                case 2:
                    results= [
                        [-2,0],
                        [-1,0],
                        [0,0],
                        [0,1]
                    ];
                    break;
                case 3:
                    results = [
                        [-1,-1],
                        [-1,0],
                        [-1,1],
                        [-2,1]
                    ];
                    break;
            }
            break;
        case 2:
            switch (rotation) {
                case 0:
                    results = [
                        [-2,0],
                        [-1,0],
                        [0,0],
                        [0,-1]
                    ];
                    break;
                case 1:
                    results = [
                        [-1,-1,]
                        [-1,0],
                        [-1,1],
                        [0,1]
                    ];
                    break;
                case 2:
                    results = [
                        [-2,0],
                        [-2,2],
                        [-1,0],
                        [0,0]
                    ];
                    break;
                case 3:
                    results = [
                        [-2,-1],
                        [-1,-1],
                        [-1,0],
                        [-1,1]
                    ];
                    break;
            }
            break;
        case 3:
            results= [
                [-1,-1],
                [0,-1],
                [-1,0],
                [0,0]
            ];
            break;
        case 4:
            switch(rotation) {
                case 0:
                    results = [
                        [-1,-1],
                        [-2,0],
                        [-1,0],
                        [0,-1]
                    ];
                    break;
                case 1:
                    results = [
                        [-1,-1],
                        [-1,0],
                        [0,0],
                        [0,1]
                    ];
                    break;
                case 2:
                    results = [
                        [-1,0],
                        [-2,1],
                        [-1,-1],
                        [0,0]
                    ];
                    break;
                case 3:
                    results = [
                        [-2,-1],
                        [-2,0],
                        [-1,0],
                        [-1,1]
                    ];
                    break;
            }
            break;
        case 5:
            switch(rotation){
                case 0:
                    results = [
                        [-1,0],
                        [0,0],
                        [1,0],
                        [0,-1]
                    ];
                    break;
                case 1:
                    results = [
                        [0,-1],
                        [0,0],
                        [0,1],
                        [1,0]
                    ];
                    break;
                case 2:
                    results = [
                        [-1,0],
                        [0,0],
                        [1,0],
                        [0,1]
                    ];
                    break;
                case 3:
                    results = [
                        [0,-1],
                        [0,0],
                        [0,1],
                        [-1,0]
                    ];
                    break;
            }
            break;
        case 6:
            switch(rotation){
                case 0:
                    results = [
                        [-2,-1],
                        [-1,-1],
                        [-1,0],
                        [0,0]
                    ];
                    break;
                case 1:
                    results = [
                        [-1,0],
                        [-1,-1],
                        [0,0],
                        [0,-1]
                    ];
                    break;
                case 2:
                    results = [
                        [-2,0],
                        [-1,0],
                        [-1,-1],
                        [0,1]
                    ];
                    break;
                case 3:
                    results = [
                        [-2,0],
                        [-2,1],
                        [-1,0],
                        [-1,-1]
                    ];
                    break;
            }
            break;
    }
    return results;
}


//Define o tamanho de cada espaço da grade
const gridSpace =30;

//Declaração de variáveis
let fallingPiece;
let gridPieces = [];
let lineFades = [];
let gridWorkers = [];

let currentScore = 0;
let currentLevel = 1;
let linesCleared = 0;

let ticks = 0;
let updateEvery = 15;
let updateEveryCurrent = 15;
let fallSpeed = gridSpace * 0.5;
let pauseGame = false;
let gameOver = false;

//Define cada área do jogo
const gameEdgeLeft =  150;
const gameEdgeRight = 450;

//Define as colores das peças
const colors = [
    '#dca3ff',
    '#ff90a0',
    '#80ffb4',
    '#ff7666',
    '#70b3f5',
    '#b2e77d',
    '#ffd700',
];

// Configuração de função chamada uma vez no começo
function setup() {
    createCanvas(600, 540);
    console.log("Setup chamdado")

    // Criar uma nova peça caindo
    fallingPiece = new PlayPiece();
    fallingPiece.resetPiece();

    // Define uma fonte para o texto
    textFont('Ubuntu');
}

// Função de queda chamada frequentemente
function draw(){
    //Define as cores usadas no jogo
    const colorDark = '#0d0d0d';
    const colorLight = '#304550';
    const colorBackground = '#CDDC39';
    console.log("Draw chamado");

    // '#e1eeb0'

    //Define a cor de fundo
    background(colorBackground);

    //Desenha o lado direito do painel 
    fill(25);
    noStroke();
    rect(gameEdgeRight, 0, 150, height);

    //Desenha o lado esquerdo do painel
    rect(0,0, gameEdgeLeft, height);

    //Desenha o retângulo de pontuação
    fill(colorBackground);
    rect(450, 80, 150, 70);

    //Desenha o retângulo da próxima peça
    rect(460, 405, 130, 130, 5, 5);

    //Desenha o retângulo do nível
    rect(460, 210, 130, 60, 5, 5);

    //Desenha o retângulo de linhas
    rect(460, 280, 130, 60, 5, 5);

    //Desenha as linhas de pontuação
    fill(colorLight);
    rect(450, 85, 150, 20);
    rect(450, 110, 150, 4);
    rect(450, 140, 150, 4);

    //Desenha o banner de pontuação
    fill(colorBackground);
    rect(460, 60, 130, 35, 5, 5);

    //Desenha o retângulo interno do banner de pontuação
    strokeWeight(3);
    noFill();
    stroke(colorLight);
    rect(465, 65, 120, 25, 5, 5);

    //Desenha o retângulo interno da próxima peça
    stroke(colorLight);
    rect(465, 410, 120, 120, 5, 5);

    //Desenha o retângulo interno do nível
    rect(465, 215, 120, 50, 5, 5);

    //Desenha o retângulo interno das linhas
    rect(465, 285, 120, 50, 5, 5);

    //Desenha o rótulo de informações
    fill(25);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text("Score", 525, 85);
    text("Level", 525, 238);
    text("Lines", 525, 308);

    //Desenha as informações atuais
    textSize(24);
    textAlign(RIGHT);
    text(currentScore, 560, 135);

    text(currentLevel, 560, 260);
    text(linesCleared, 560, 330);

    //Desenha a borda do jogo
    stroke(colorDark);
    line(gameEdgeRight, 0, gameEdgeRight, height);

    //Mostra a queda de uma peça
    if (fallingPiece) {
        
        fallingPiece.show();

    }

    // Aumenta a velocidade da queda da peça se a seta pra baixo é pressionada
    if (keyIsDown(DOWN_ARROW)) {
        updateEvery = 2;
    } else {
        updateEvery = updateEveryCurrent;
    }

    //Atualiza o estado do jogo
    if (!pauseGame) {
        ticks++;
        if(ticks >= updateEvery) {
            ticks = 0;
            fallingPiece.fall(fallSpeed);
        }
    }

    //Mostra a grade de peças
    for(let i = 0; i < gridPieces.length; i++) {
        gridPieces[i].show();
    }

    //Mostra as queda das linhas
    for(let i = 0; i < lineFades.length; i++) {
        lineFades[i].show();
    }

    // processa o funcionamento da grade
    if (gridWorkers.length > 0) {
        gridWorkers[0].work();
    }

    //Explica os controles
    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(14);
    text("Controls:\n↑\n← ↓ →\n", 75, 155);
    text("Left and Right: \nmove side to side", 75, 230);
    text("Up:\nrotate", 75, 280);
    text("Down:\nfall faster", 75, 330);
    text("R:\nreset game", 75, 380);

    // Mostra o texto de game over
    if (gameOver) {
        fill(colorDark);
        textSize(54);
        text("Game Over!", 300, 270);
    }

    //Desenha a borda do jogo
    strokeWeight(3);
    stroke('#304550');
    noFill();
    rect(0, 0, width, height);
}

// Função chamada quando uma tecla é pressionada
function keyPressed() {
    if (keyCode === 82) {
        // 'Tecla R'
        resetGame();
       
    }
    

    if(!pauseGame) {
        if (keyCode === LEFT_ARROW) {
            fallingPiece.input(LEFT_ARROW);
        } else if (keyCode === RIGHT_ARROW) {
            fallingPiece.input(RIGHT_ARROW);
        }
        if (keyCode === UP_ARROW) {
            fallingPiece.input(UP_ARROW);
        }
    }

}

// Classe para uma peça caindo
class PlayPiece {
    constructor(){
        this.pos = createVector(300,0);
        this.rotation = 0;
        this.nextPieceType = Math.floor(Math.random() * 7);
        this.nextPieces = [];
        this.pieceType = 0;
        this.pieces = [];
        this.orientation = [];
        this.fallen = false;
    }

    // Gera a próxima peça
    nextPiece(){
        this.nextPieceType = pseudoRandom(this.pieceType);
        this.nextPieces = [];

        const points = orientPoints(this.nextPieceType, 0);
        let xx = 525, yy = 490;

        if (this.nextPieceType !== 0 && this.nextPieceType !== 3 && this.nextPieceType !== 5) {
            xx += (gridSpace * 0.5);
        }

        if (this.nextPieceType == 5) {
            xx -= (gridSpace * 0.5);
        }

        for (let i = 0; i < 4; i++) {
            this.nextPieces.push(new Square(xx + points[i][0] * gridSpace, yy + points[i][1] * gridSpace, this.nextPieceType));
        }
    }

    //Faz a peça cair
    fall(amount) {
        if(!this.futureCollision(0, amount, this.rotation)) {
            this.addPos(0, amount);
            this.fallen = true;
        } else {
            if (!this.fallen) {
                pauseGame = true;
                gameOver = true;
            } else {
                this.commitShape();           
            }
        }
    }
    //Reseta a peça atual
    resetPiece(){
        this.rotation = 0;
        this.fallen = false;
        this.pos.x = 330;
        this.pos.y = -60;
        
        this.pieceType = this.nextPieceType;

        this.nextPiece();
        this.newPoints();

        console.log("Peça resetada")
    }

    // Gera os pontos da peça atual
    newPoints() {
        const points = orientPoints(this.pieceType, this.rotation);
        this.orientation = points;
        this.pieces = [];

        for (let i  = 0; i < points.length; i++) {
            this.pieces.push(new Square(this.pos.x + points[i][0] * gridSpace, this.pos.y + points[i][1] * gridSpace, this.pieceType));
        }
    }

    //Atualiza a posição da peça atual
    newPointsCurrent() {
        const points = orientPoints(this.pieceType, this.rotation);
        this.orientation = points;
        this.pieces = [];

        for (let i = 0; i < points.length; i++) {
            this.pieces.push(new Square(this.pos.x + points[i][0] * gridSpace, this.pos.y + points[i][1] * gridSpace, this.pieceType));

        }
    }

    //Atualiza a posição da peça atual
    updatePoints(){
        if (this.pieces) {
            const points = orientPoints(this.pieceType, this.rotation);
            this.orientation = points;
            for (let i = 0; i < 4; i++) {
                this.pieces[i].pos.x = this.pos.x + points[i][0] * gridSpace;
                this.pieces[i].pos.y = this.pos.y + points[i][1] * gridSpace;
            }
        }
    }

    //Adiciona um deslocamento á posição da peça atual
    addPos(x,y) {
        this.pos.x += x;
        this.pos.y += y;
        
        if (this.pieces){
            for(let i = 0; i < 4; i++) {
                this.pieces[i].pos.x += x;
                this.pieces[i].pos.y += y;
            }
        }
    }
    // Check se isso se tornar uma colisão no futuro
    futureCollision(x, y, rotation) {
        let xx, yy, points = 0;
        if(rotation !== this.rotation) {
            points = this.orientPoints(this.pieceType, rotation);
        }

        for (let i = 0; i < this.pieces.length; i++) {
            if (points) {
                xx = this.pos.x + points[i][0] * gridSpace;
                yy = this.pos.y + points[i][1] * gridSpace;
            } else {
                xx = this.pieces[i].pos.x + x;
                yy = this.pieces[i].pos.y + y;
            }
            if (xx < gameEdgeLeft || xx + gridSpace > gameEdgeRight || yy + gridSpace > height) {
                return true;
            }
            for (let j = 0; j < gridPieces.length; j++) {
                if (xx == gridPieces[j].pos.x) {
                    if (yy >= gridPieces[j].pos.y && yy < gridPieces[j].pos.y + gridSpace) {
                        return true;
                    }
                    if (yy + gridSpace > gridPieces[j].pos.y && yy + gridSpace <= gridPieces[j].pos.y + gridSpace) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
                  
// Tratativa de inputs de usuário
 input(key) {
    switch(key) {
        case LEFT_ARROW:
            if ( !this.futureCollision(-gridSpace, 0, this.rotation)) {
                this.addPos(-gridSpace, 0);
            }
            break;
        case RIGHT_ARROW:
            if(!this.futureCollision(gridSpace,0, this.rotation)) {
                this.addPos(gridSpace, 0);
            }
            break;
        case UP_ARROW:

            this.rotate();
            let newRotation = this.rotation + 1;
            if(newRotation > 3) {
                newRotation = 0;
            } 
            if (!this.futureCollision(0,0, newRotation)) {
                this.rotation  = newRotation;
                this.updatePoints();
            }
            break;
    }
 }

 // Rotação da peça atual
 rotate(){
    this.rotation += 1;
    if (this.rotation > 3) {
        this.rotation = 0;
    }
    this.updatePoints();
 }

 //Mostra a peça atual
 show() {

    fill(255);
    rect(this.pos.x, this.pos.y, 30, 30);

    for (let i = 0; i < this.pieces.length; i++) {
        this.pieces[i].show();
    }
    for(let i = 0; i < this.nextPieces.length; i++) {
        this.nextPieces[i].show();
    }
 }

 // Comprometer a forma atual á grade
 commitShape(){
    for(let i = 0; i < this.pieces.length; i++) {
        gridPieces.push(this.pieces[i]);
    }
    this.resetPiece();
    analyzeGrid();
 }

}

//Classe para cada quadrado em uma peça
class Square {
    constructor(x,y, type) {
        this.pos = createVector(x,y)
        this.type = type;
    }

    //Mostra o quadrado
    show() {
        strokeWeight(2);
        
        fill(colors[this.type]);
        stroke(25);
        rect(this.pos.x, this.pos.y, gridSpace - 1, gridSpace - 1);

        noStroke();
        fill(255);
        rect(this.pos.x + 6, this.pos.y + 6, 18, 2);
        rect(this.pos.x + 6, this.pos.y + 6, 2, 16);
        fill(25);
        rect(this.pos.x + 6, this.pos.y + 20, 18, 2);
        rect(this.pos.x + 22, this.pos.y + 6, 2, 16);
    }
}

//Gera um pseudo número aleatório para a próxima peça
function pseudoRandom(previous) {
    let roll = Math.floor(Math.random() * 8);
    if (roll === previous || roll === 7) {
        roll = Math.floor(Math.random() * 7);
    }
    return roll;
}

//Analisa a grade e limpa as linhas se necessário
function analyzeGrid(){
    let score = 0;
    while (checkLines()) {
        linesCleared += 1;
        score += 50;
        if (linesCleared % 10 === 0) {
            currentLevel += 1;
            if (updateEveryCurrent > 2) {
                updateEveryCurrent -= 10;
            }
        }
    }
    if (score > 100) {
        score *= 2;
    }
    currentScore += score;
}

function checkLines() {
    for (let y = 0; y < height; y += gridSpace) {
        let count = 0;
        for (let i = 0; i < gridPieces.length; i++) {
            if (gridPieces[i].pos.y === y) {
                count++;
            }
        }
        if(count === 10) {
          
            //Remova as peças nas coodernadas y
            gridPieces = gridPieces.filter(piece => piece.pos.y !== y );
            //Move as peças para abaixo da coordernada y
            for (let i =0; i < gridPieces.length; i++) {
                if(gridPieces[i].pos.y < y) {
                    gridPieces[i].pos.y += gridSpace;
                }
            } 
            return true;
        }
    }
    return false;
}

//Classe para o funcionamento da grade
class Worker {
    constructor(y, amount) {
        this.amountActual = 0;
        this.amountTotal = amount;
        this.yVal = y;
    }
    
    // Perfomance do trabalho da grade
    work() {
        if (this.amountActual < this.amountTotal) {
            for (let j = 0; j < gridPieces.length; j++) {
                if( gridPieces[j].pos.y < y) {
                    gridPieces[j].pos.y += 5;
                }
            }
            this.amountActual += 5;
        } else {
            gridWorkers.shift();
        }
    }
}

//Reseta o estado do jogo
function resetGame(){
    fallingPiece = new PlayPiece();
    fallingPiece.resetPiece();
    gridPieces = [];
    lineFades = [];
    gridWorkers = [];
    currentScore = 0;
    currentLevel = 1;
    linesCleared = 0;
    ticks = 0;
    updateEvery = 15;
    updateEveryCurrent = 15;
    fallSpeed = gridSpace * 0.5;
    pauseGame = false;
    gameOver = false;
}
