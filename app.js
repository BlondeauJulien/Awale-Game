const game = new Game(); //test

document.getElementById('start').addEventListener('click', startGame);

/******************** Start Game Setup ******************/

function startGame() {
	game.playerOne.score = 0;
	game.playerTwo.score = 0;

	fillSeedContainer();
	initializeScores();
	pickStartingPlayer();

	game.gameStarted = true;
	document.getElementById('start').innerText = 'Start New Game'
}

function fillSeedContainer() {
	let seedContainers = document.querySelectorAll('.seed-container');
	for (let i = 0; i < seedContainers.length; i++) {
		seedContainers[i].innerText = '4';
	}

}

function initializeScores() {
	let scores = document.querySelectorAll('.score');
	for (let i = 0; i < scores.length; i++) {
		scores[i].innerText = 0;
	}
}

function pickStartingPlayer() {
	let flipACoin = Math.floor(Math.random() * 2);

	if (flipACoin === 0) {
		turnChangePlayer('p1');
	} else {
		turnChangePlayer('p2');
	}
}

/******************* Gameplay  ******************************/

let seedContainers = document.querySelectorAll('.seed-container');

for (let i = 0; i < seedContainers.length; i++) {
	seedContainers[i].addEventListener('click', play);
	seedContainers[i].addEventListener('mouseover', playPreview);
	seedContainers[i].addEventListener('mouseleave', suppressPlayPreview)
}

function play(e) {
	let lastElementFilled = playedContainer(e);

	if (e.target.classList.contains('seed-container-p1') && game.playerOne.isTurnToPlay === true) {

		playedContainer(e, 'click');

		updateScore(lastElementFilled, 'seed-container-p1');

		turnChangePlayer('p2');

		checkVictory();
	} else if (e.target.classList.contains('seed-container-p2') && game.playerTwo.isTurnToPlay === true) {
		playedContainer(e, 'click');

		updateScore(lastElementFilled, 'seed-container-p2');

		turnChangePlayer('p1');

		checkVictory();
	}
}

function playedContainer(e, typeEvent) {
	let clickedContainerValue = parseFloat(e.target.innerText);
	let clickedPositionOnBoard = parseFloat(e.target.id.replace('seedCount', ''));
	let lastElementFilled;

	for (let i = clickedContainerValue; i > 0; i--) {
		if (document.getElementById(`seedCount${clickedPositionOnBoard}`) === document.getElementById('seedCount12')) {
			clickedPositionOnBoard = 1;
			if(typeEvent === 'click') {
				document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText = parseFloat(document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText) + 1;
				e.target.innerText -= 1;
			}
			lastElementFilled = document.getElementById(`seedCount${clickedPositionOnBoard}`);
		} else {
			if(typeEvent === 'click') {
				document.getElementById(`seedCount${++clickedPositionOnBoard}`).innerText = parseFloat(document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText) + 1;
				e.target.innerText -= 1;
			} else {
				clickedPositionOnBoard++
			}
			lastElementFilled = document.getElementById(`seedCount${clickedPositionOnBoard}`);
		}
	}
	lastElementFilled.style.background = '#fff'

	return lastElementFilled;
}

function updateScore(lastElement, className) {
	if (className === 'seed-container-p1' && lastElement.classList.contains('seed-container-p2')) {
		let positionOnBoard = lastElement.id.replace('seedCount', '');

		while (
			lastElement.classList.contains('seed-container-p2') &&
			(lastElement.innerText == 2 || lastElement.innerText == 3)
		) {
			game.playerOne.score += parseFloat(lastElement.innerText);
			lastElement.innerText = 0;
			document.querySelector('.score-player-one').innerText = game.playerOne.score;
			lastElement = document.getElementById(`seedCount${--positionOnBoard}`);
		}
	} else if (className === 'seed-container-p2' && lastElement.classList.contains('seed-container-p1')) {
		let positionOnBoard = lastElement.id.replace('seedCount', '');

		while (
			lastElement.classList.contains('seed-container-p1') &&
			(lastElement.innerText == 2 || lastElement.innerText == 3)
		) {
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
		game.playerOne.isTurnToPlay = true;
		game.playerTwo.isTurnToPlay = false;
		document.querySelector('.container-player1').style.background = '#e62d2d';
		document.querySelector('.container-player2').style.background = '#fff';
		isPlayerCampEmpty('p2', 'p1');

	} else {
		game.playerOne.isTurnToPlay = false;
		game.playerTwo.isTurnToPlay = true;
		document.querySelector('.container-player2').style.background = '#313cda';
		document.querySelector('.container-player1').style.background = '#fff';
		isPlayerCampEmpty('p1', 'p2');
	}
}


// ++++++ Preview Event +++++++++

function playPreview(e) {
	if(game.gameStarted) {
		let lastElement = playedContainer(e, 'hover');
		if (e.target.classList.contains('seed-container-p1') && game.playerOne.isTurnToPlay === true) {
			lastElement.style.background = '#9cfff8';
		} else if (e.target.classList.contains('seed-container-p2') && game.playerTwo.isTurnToPlay === true) {
			lastElement.style.background = '#9cfff8';
		}
	}
}

function suppressPlayPreview() {
	for (let i = 0; i < seedContainers.length; i++) {
		seedContainers[i].style.background = '#fff'
	}
}

// ******************  Check End Game *********************//

function checkVictory() {
	if (game.playerOne.score > 24) {
		alert('Player 1 WINS!!!');
	} else if (game.playerTwo.score > 24) {
		alert('Player 2 WINS!!!');
	} else if ( (game.playerOne.score && game.playerTwo.score) === 24) {
		console.log(`It's a tie`);
	}
}

function isPlayerCampEmpty(player, opponent) {
	let playerCamp = document.querySelectorAll(`.seed-container-${player}`);
	let opponentCamp = document.querySelectorAll(`.seed-container-${opponent}`);

	let totalSeeds = 0;

	for (let i = 0; i < playerCamp.length; i++) {
		totalSeeds += parseFloat(playerCamp[i].innerText);
		if (totalSeeds > 0) break;
	}

	if (totalSeeds === 0) {
		let canFeed = false;

		if (opponent === 'p2') {
			opponentCamp = Array.from(opponentCamp);
			opponentCamp.reverse();
		}

		for (let i = 0; i < opponentCamp.length; i++) {
			if (opponentCamp[i].innerText > i) {
				canFeed = true;
				break;
			}
        }
        
        if(!canFeed) {

                opponentCamp.forEach(base => {

					if(opponent === 'p1') {
						game.playerOne.score += parseFloat(base.innerText);
						base.innerText = 0;
						document.querySelector('.score-player-one').innerText = game.playerOne.score;
					} else {
						game.playerTwo.score += parseFloat(base.innerText);
						base.innerText = 0;
						document.querySelector('.score-player-two').innerText = game.playerTwo.score;
					}
				})
				
			alert(`Can't feed opponent, game end`)
            checkVictory();
        }
	}
}
