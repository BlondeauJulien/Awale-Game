const game = new Game();

document.getElementById('start').addEventListener('click', startGame);


/******************** Start Game Setup ******************/

function startGame() {
    fillSeedContainer();
    initializeScores();
    pickStartingPlayer();
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
    } else {
        game.playerOne.isTurnToPlay = false;
        game.playerTwo.isTurnToPlay = true;
    }
}