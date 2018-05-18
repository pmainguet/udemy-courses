/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Startup

var scores, roundScore, activePlayer, winningLimit, gamePlaying;

function startUp() {
    winningLimit = 20;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = 1;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function switchPlayer() {
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.getElementsByClassName('player-' + activePlayer + '-panel')[0].classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementsByClassName('player-' + activePlayer + '-panel')[0].classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function displayWinner() {
    document.getElementsByClassName('player-' + activePlayer + '-panel')[0].classList.toggle('winner');
    alert(activePlayer + ' a gagné!');
    gamePlaying = 0;
}

document.addEventListener('DOMContentLoaded', startUp, false);

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        //generate random nbr
        var dice = Math.floor(Math.random() * 6) + 1;

        //display nbr
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //update RoundScore if NOT 1
        if (dice != 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            switchPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#current-' + activePlayer).textContent = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= winningLimit) {
            displayWinner();
        } else {
            if (roundScore != 0) {
                switchPlayer();
            }
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', startUp);