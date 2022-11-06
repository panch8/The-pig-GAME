'use strict';

// Elements.
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentScore, activePlayer, scores, playing;

//starting conditions.
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score1El.textContent = 0;
  score0El.textContent = 0;
  diceEl.classList.add('hidden');

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // create a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check if 1 rolled
    if (dice !== 1) {
      //add dice value to current score variable
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //change player
    else {
      //change player function
      switchPlayer();
    }
  }
});
//HOLD btn functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    //
    //display gloabal score
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];
    //check winner
    if (scores[`${activePlayer}`] < 100) {
      //change player function
      switchPlayer();
    } else {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
  }
});
btnNew.addEventListener('click', init);
