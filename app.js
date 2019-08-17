const game = new Game();

document.getElementById('start').addEventListener('click', startGame);

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

        updateScore(lastElement.lastElementFilled, 'seed-container-p1');

        turnChangePlayer('p1');

        checkVictory('p1');
        
    } else if (e.target.classList.contains('seed-container-p2') && game.playerTwo.isTurnToPlay === true){
        
        playedContainer(e);

        updateScore(lastElement.lastElementFilled, 'seed-container-p2');

        turnChangePlayer('p2');

        checkVictory('p2');
    };
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

    return lastElement = {
        lastElementFilled: lastElementFilled
    }
}

function updateScore(lastElement, className) {
    if(className === 'seed-container-p1' && lastElement.classList.contains('seed-container-p2') ) {
        let positionOnBoard = lastElement.id.replace('seedCount', '');

        while(lastElement.classList.contains('seed-container-p2') && (lastElement.innerText == 2 || lastElement.innerText == 3)) {
            game.playerOne.score += parseFloat(lastElement.innerText);
            lastElement.innerText = 0;
            document.querySelector('.score-player-one').innerText = game.playerOne.score;
            lastElement = document.getElementById(`seedCount${--positionOnBoard}`);
        }
    } else if (className === 'seed-container-p2' && lastElement.classList.contains('seed-container-p1')) {
        let positionOnBoard = lastElement.id.replace('seedCount', '');

        while(lastElement.classList.contains('seed-container-p1') && (lastElement.innerText == 2 || lastElement.innerText == 3)) {
            game.playerTwo.score += parseFloat(lastElement.innerText);
            lastElement.innerText = 0;
            document.querySelector('.score-player-two').innerText = game.playerTwo.score;
            lastElement = document.getElementById(`seedCount${--positionOnBoard}`);
            
            if (lastElement === null) break;
            
        }
    }
}

function turnChangePlayer(player) {
    if (player === 'p1') {
        game.playerOne.isTurnToPlay = false;
        game.playerTwo.isTurnToPlay = true;
        document.querySelector('.container-player2').style.background = '#313cda';
        document.querySelector('.container-player1').style.background = '#fff';
    } else {
        game.playerOne.isTurnToPlay = true;
        game.playerTwo.isTurnToPlay = false;
        document.querySelector('.container-player1').style.background = '#e62d2d';
        document.querySelector('.container-player2').style.background = '#fff';
    }
}

function checkVictory(player) {
    if(game.playerOne.score > 24) {
        alert('Player 1 WINS!!!')
    } else if (game.playerTwo.score > 24) {
        alert('Player 2 WINS!!!')
    }
}