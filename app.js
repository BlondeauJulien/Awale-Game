const game = new Game();

document.getElementById('start').addEventListener('click', startGame);

/****** Set Up The Board Game *******/

let playerOneBoardGameSide = [...document.querySelectorAll('.seed-container-p1')]
let playerTwoBoardGameSide = [...document.querySelectorAll('.seed-container-p2')]

const boardGame = [playerOneBoardGameSide.reverse(), playerTwoBoardGameSide];


/******************** Start Game Setup ******************/

function startGame() {
    if(game.gameStarted === false) {
        fillSeedContainer();
        initializeScores();
        pickStartingPlayer();

        game.gameStarted = true;
    }

}

function fillSeedContainer() {
    let seedContainers = document.querySelectorAll('.seed-container');
    for(let i = 0; i< seedContainers.length; i++) {
        seedContainers[i].innerText = '4';
    }
}

function initializeScores() {
    let scores = document.querySelectorAll('.score');
    for(let i = 0; i< scores.length; i++) {
        scores[i].innerText = 0;
    }
}

function pickStartingPlayer() {
    let flipACoin = Math.floor(Math.random() * 2);

    if (flipACoin === 0) {
        game.playerOne.isTurnToPlay = true;
        game.playerTwo.isTurnToPlay = false;
        document.querySelector('.container-player1').style.background = '#e62d2d';
    } else {
        game.playerOne.isTurnToPlay = false;
        game.playerTwo.isTurnToPlay = true;
        document.querySelector('.container-player2').style.background = '#313cda';
    }
}


/******************* Gameplay  ******************************/

let seedContainers = document.querySelectorAll('.seed-container');

for(let i = 0; i<seedContainers.length; i++) {
    seedContainers[i].addEventListener('click', play);
}

function play(e) {


    if(e.target.classList.contains('seed-container-p1') && game.playerOne.isTurnToPlay === true) {

        playedContainer(e);
        
    } else if (e.target.classList.contains('seed-container-p2') && game.playerTwo.isTurnToPlay === true){
        
        playedContainer(e);
    }
}

function playedContainer(e) {
    let clickedContainerValue = parseFloat(e.target.innerText);
    let clickedPositionOnBoard = parseFloat(e.target.id.replace('seedCount', ''));
    let lastElementFilled;

    for(let i = clickedContainerValue; i>0; i--) {

        if(document.getElementById(`seedCount${clickedPositionOnBoard}`) === document.getElementById('seedCount12')) {
            clickedPositionOnBoard = 1;
            document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText = parseFloat(document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText) +1;
            e.target.innerText -= 1;
            lastElementFilled = document.getElementById(`seedCount${clickedPositionOnBoard}`);

        } else {
            document.getElementById(`seedCount${++clickedPositionOnBoard}`).innerText = parseFloat(document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText) + 1;
            e.target.innerText -= 1;
            lastElementFilled = document.getElementById(`seedCount${clickedPositionOnBoard}`);
        }
    }
}