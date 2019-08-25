const game = new Game(); //test

document.getElementById('start').addEventListener('click', startGame);

/******************** Start Game Setup ******************/

function startGame() {
	loadEventListener()

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
	
	game.playerOne.score = 0;
	game.playerTwo.score = 0;
}

function pickStartingPlayer() {
	let flipACoin = Math.floor(Math.random() * 2);

	if (flipACoin === 0) {
		turnChangePlayer('p1');
	} else {
		turnChangePlayer('p2');
	}
}

function loadEventListener() {
	let seedContainers = document.querySelectorAll('.seed-container');
	for (let i = 0; i < seedContainers.length; i++) {
		seedContainers[i].addEventListener('click', play);
		seedContainers[i].addEventListener('mouseover', playPreview);
		seedContainers[i].addEventListener('mouseleave', suppressPlayPreview)
	}
}

/******************* Gameplay  ******************************/

function play(e) {
	let lastElementFilled = playedContainer(e);

	if(e.target.innerText > 0) {
		if (e.target.classList.contains('seed-container-p1') && game.playerOne.isTurnToPlay === true) {

			playedContainer(e, 'click');
	
			turnChangePlayer('p2');
	
			updateScore(lastElementFilled, 'seed-container-p1', 'click');
	
			checkVictory();
		} else if (e.target.classList.contains('seed-container-p2') && game.playerTwo.isTurnToPlay === true) {
			playedContainer(e, 'click');
	
			turnChangePlayer('p1');
	
			updateScore(lastElementFilled, 'seed-container-p2', 'click');
	
			checkVictory();
		}
	}
}

function playedContainer(e, eventName) {
	let clickedContainerValue = parseFloat(e.target.innerText);
	let clickedPositionOnBoard = parseFloat(e.target.id.replace('seedCount', ''));
	let lastElementFilled;

	for (let i = clickedContainerValue; i > 0; i--) {
		if (document.getElementById(`seedCount${clickedPositionOnBoard}`) === document.getElementById('seedCount12')) {
			clickedPositionOnBoard = 1;
			if(eventName === 'click') {
				document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText = parseFloat(document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText) + 1;
				e.target.innerText -= 1;
			}
			lastElementFilled = document.getElementById(`seedCount${clickedPositionOnBoard}`);
		} else {
			if(eventName === 'click') {
				document.getElementById(`seedCount${++clickedPositionOnBoard}`).innerText = parseFloat(document.getElementById(`seedCount${clickedPositionOnBoard}`).innerText) + 1;
				e.target.innerText -= 1;
			} else {
				clickedPositionOnBoard++
			}
			lastElementFilled = document.getElementById(`seedCount${clickedPositionOnBoard}`);
		}
	}
	if(lastElementFilled) lastElementFilled.style.background = '#fff';

	return lastElementFilled;
}

function updateScore(lastElement, className, eventName) {
	let seeds = [2,3]; 
	if (eventName === 'hover') seeds = [1,2]

	if (className === 'seed-container-p1' && lastElement.classList.contains('seed-container-p2')) {
		let positionOnBoard = lastElement.id.replace('seedCount', '');

		while (lastElement.classList.contains('seed-container-p2') &&
			(lastElement.innerText == seeds[0] || lastElement.innerText == seeds[1])) {

			if(eventName === 'hover') {
				lastElement.style.color = '#12ad07'
			} else {
				game.playerOne.score += parseFloat(lastElement.innerText);
				lastElement.innerText = 0;
				document.querySelector('.score-player-one').innerText = game.playerOne.score;
				lastElement.style.color = '#000';
			}

			lastElement = document.getElementById(`seedCount${--positionOnBoard}`);
		}
		if(eventName === 'click') isPlayerCampEmpty('p1', 'p2');

	} else if (className === 'seed-container-p2' && lastElement.classList.contains('seed-container-p1')) {
		let positionOnBoard = lastElement.id.replace('seedCount', '');

		while (lastElement.classList.contains('seed-container-p1') &&
			(lastElement.innerText == seeds[0] || lastElement.innerText == seeds[1])) {
				
			if(eventName === 'hover') {
				lastElement.style.color = '#12ad07'
			} else {
				game.playerTwo.score += parseFloat(lastElement.innerText);
				lastElement.innerText = 0;
				document.querySelector('.score-player-two').innerText = game.playerTwo.score;
				lastElement.style.color = '#000';
			}

			lastElement = document.getElementById(`seedCount${--positionOnBoard}`);

			if (lastElement === null) break;
		}

		if(eventName === 'click') isPlayerCampEmpty('p2', 'p1');
	}
}

function turnChangePlayer(player) {
	if (player === 'p1') {
		game.playerOne.isTurnToPlay = true;
		game.playerTwo.isTurnToPlay = false;
		document.querySelector('.container-player1').style.background = '#e62d2d';
		document.querySelector('.container-player2').style.background = '#fff';

	} else {
		game.playerOne.isTurnToPlay = false;
		game.playerTwo.isTurnToPlay = true;
		document.querySelector('.container-player2').style.background = '#313cda';
		document.querySelector('.container-player1').style.background = '#fff';
	}
}

// ++++++ Preview Event +++++++++

function playPreview(e) {
	let lastElement = playedContainer(e, 'hover');
	if(game.gameStarted && lastElement !== undefined) {

		if (e.target.classList.contains('seed-container-p1') && game.playerOne.isTurnToPlay === true) {
			lastElement.style.background = '#9cfff8';
			updateScore(lastElement, 'seed-container-p1', 'hover');
		} else if (e.target.classList.contains('seed-container-p2') && game.playerTwo.isTurnToPlay === true) {
			lastElement.style.background = '#9cfff8';
			updateScore(lastElement, 'seed-container-p2', 'hover');
		}
	}
}

function suppressPlayPreview() {
	let seedContainers = document.querySelectorAll('.seed-container');
	for (let i = 0; i < seedContainers.length; i++) {
		seedContainers[i].style.background = '#fff';
		seedContainers[i].style.color = 'black';
	}
}

// ******************  Check End Game *********************//

function checkVictory() {
	if (game.playerOne.score > 24) {
		endEventListener()
		alert('Player 1 WINS!!!');
	} else if (game.playerTwo.score > 24) {
		endEventListener()
		alert('Player 2 WINS!!!');
	} else if (game.playerOne.score === 24 && game.playerTwo.score === 24) {
		endEventListener()
		alert(`It's a tie`);
	}
}

function endEventListener() {
	let seedContainers = document.querySelectorAll('.seed-container');
	for (let i = 0; i < seedContainers.length; i++) {
		seedContainers[i].removeEventListener('click', play);
		seedContainers[i].removeEventListener('mouseover', playPreview);
		seedContainers[i].removeEventListener('mouseleave', suppressPlayPreview)
	}

	document.querySelector('.container-player1').style.background = '#fff';
	document.querySelector('.container-player2').style.background = '#fff';
}

function isPlayerCampEmpty(player, opponent) {
	let playerCamp = document.querySelectorAll(`.seed-container-${player}`);
	let opponentCamp = document.querySelectorAll(`.seed-container-${opponent}`);

	let totalSeedsPlayer = 0;
	let totalSeedsOpponent = 0;

	for (let i = 0; i < playerCamp.length; i++) {
		totalSeedsPlayer += parseFloat(playerCamp[i].innerText);
		if (totalSeedsPlayer > 0) {
			loadEventListener();
			break;
		} 
	}

	for(let i = 0; i < opponentCamp.length; i++) {
		totalSeedsOpponent += parseFloat(opponentCamp[i].innerText);
	}

	if(totalSeedsOpponent === 0) {
		playerCamp.forEach(base => {

			if(opponent === 'p1') {
				game.playerTwo.score += parseFloat(base.innerText);
				base.innerText = 0;
				document.querySelector('.score-player-two').innerText = game.playerTwo.score;
			} else {
				game.playerOne.score += parseFloat(base.innerText);
				base.innerText = 0;
				document.querySelector('.score-player-one').innerText = game.playerOne.score;
			}
		});
		checkVictory();
		alert(`opponent starved, game end`)
		return
	}

	if (totalSeedsPlayer === 0) {
		let canFeed = false;

		if (opponent === 'p2') {
			opponentCamp = Array.from(opponentCamp);
			opponentCamp.reverse();
		}

		for (let i = 0; i < opponentCamp.length; i++) {
			if (opponentCamp[i].innerText > i) {
				canFeed = true;
				opponentCamp[i].addEventListener('click', play);
				opponentCamp[i].addEventListener('mouseover', playPreview);
				opponentCamp[i].addEventListener('mouseleave', suppressPlayPreview);
			} else {
				opponentCamp[i].removeEventListener('click', play);
				opponentCamp[i].removeEventListener('mouseover', playPreview);
				opponentCamp[i].removeEventListener('mouseleave', suppressPlayPreview)
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
			});			
			alert(`Can't feed opponent, game end`)
            checkVictory();
        }
	}
}