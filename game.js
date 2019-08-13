class Game {
    constructor() {
        this.playerOne = {
            isTurnToPlay: false,
            score: 0
        }
        this.playerTwo = {
            isTurnToPlay: false,
            score: 0
        }
    }

    /******************** Start Game Setup ******************/

    startGame() {
        game.fillSeedContainer();
        game.initializeScores();
        game.pickStartingPlayer();
    }
    
    fillSeedContainer() {
        let seedContainers = document.querySelectorAll('.seed-container');
        for(let i = 0; i< seedContainers.length; i++) {
            seedContainers[i].innerText = '4';
        }
    }
    
    initializeScores() {
        let scores = document.querySelectorAll('.score');
        for(let i = 0; i< scores.length; i++) {
            scores[i].innerText = 0;
        }
    }
    
    pickStartingPlayer() {
        let flipACoin = Math.floor(Math.random() * 2);
    
        if (flipACoin === 0) {
            game.playerOne.isTurnToPlay = true;
            game.playerTwo.isTurnToPlay = false;
        } else {
            game.playerOne.isTurnToPlay = false;
            game.playerTwo.isTurnToPlay = true;
        }
    }
    
}