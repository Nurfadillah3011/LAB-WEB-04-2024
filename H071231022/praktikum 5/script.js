class Card {
    constructor(face, value) {
        this.face = face;
        this.value = value;
    }
}

let deck, playerHand, dealerHand, bankroll = 5000, bet = 0;
let dealerCardsEl = document.getElementById('dealer-cards');
let playerCardsEl = document.getElementById('player-cards');
let betInput = document.getElementById('bet-input');
let bankrollEl = document.getElementById('bankroll');
let betAmountEl = document.getElementById('bet-amount');
let gameOverScreen = document.getElementById('game-over');
let dealSound = document.getElementById('deal-sound');
let shuffleSound = document.getElementById('shuffle-sound');

document.getElementById('place-bet').addEventListener('click', placeBet);
document.getElementById('deal').addEventListener('click', dealCards);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stay').addEventListener('click', stay);
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('restart').addEventListener('click', resetGame);

function generateDeck() {
    deck = [];
    let suits = ['♠', '♣', '♥', '♦'];
    let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    suits.forEach(suit => {
        faces.forEach(face => {
            let value = parseInt(face);
            if (isNaN(value)) {
                value = face === 'A' ? 11 : 10;
            }
            deck.push(new Card(`${face}${suit}`, value));
        });
    });
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    shuffleSound.play();
}

function placeBet() {
    let betAmount = parseInt(betInput.value);
    if (betAmount >= 100 && betAmount <= bankroll) {
        bet = betAmount;
        bankroll -= bet;
        betAmountEl.innerText = bet;
        bankrollEl.innerText = bankroll;
        document.getElementById('deal').disabled = false;
    } else {
        alert('Invalid bet amount!');
    }
}

function dealCards() {
    generateDeck();
    shuffleDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    renderCards();
    dealSound.play();
    document.getElementById('hit').disabled = false;
    document.getElementById('stay').disabled = false;
    document.getElementById('deal').disabled = true;
}

function hit() {
    playerHand.push(deck.pop());
    if (calculateHand(playerHand) > 21) {
        endGame('Dealer Wins! You Bust!');
    }
    renderCards();
}

function stay() {
    while (calculateHand(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    let playerScore = calculateHand(playerHand);
    let dealerScore = calculateHand(dealerHand);

    if (dealerScore > 21 || playerScore > dealerScore) {
        bankroll += bet * 2;
        endGame('Player Wins!');
    } else if (dealerScore > playerScore) {
        endGame('Dealer Wins!');
    } else {
        bankroll += bet;
        endGame('Push! It\'s a tie!');
    }
}

function calculateHand(hand) {
    let total = 0;
    let aces = 0;
    hand.forEach(card => {
        total += card.value;
        if (card.face.includes('A')) aces++;
    });
    while (total > 21 && aces) {
        total -= 10;
        aces--;
    }
    return total;
}

function renderCards() {
    dealerCardsEl.innerHTML = dealer
}