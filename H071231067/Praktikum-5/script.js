let deck = [];
let playerHand = [];
let dealerHand = [];
let playerMoney = 5000;
let playerBet = 0;

// buat deck
function createDeck() {
    let suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
}

// acak kartu dari deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Atur nilai kartu bergambar(nilai as nanti diatur lagi)
function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    }
    if (card.value === 'A') {
        return 11;
    }
    return parseInt(card.value);
}

// Hitung nilai kartu ditangan dan cek as jika 1 atau 11
function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0;

    for (let card of hand) {
        value += getCardValue(card);
        if (card.value === 'A') aceCount++;
    }

    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }

    return value;
}

// untuk bagikan kartu ke bot dan player
function dealInitialCards() {
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];

    updateGameDisplay();

    // Cek jika player atau dealer mencapai 21
    checkForBlackjack();
}

// tarik kartu dari deck yang sudah diacak
function drawCard() {
    return deck.pop();
}

// Cek jika player atau dealer mendapatkan blackjack
function checkForBlackjack() {
    let playerTotal = calculateHandValue(playerHand);
    let dealerTotal = calculateHandValue(dealerHand);

    if (playerTotal === 21) {
        endGame("You got 21! You win!", true);
    } else if (dealerTotal === 21) {
        endGame("Dealer got 21! You lose.");
    }
}

// Update tampilan html
function updateGameDisplay(gameOver = false) {
    // Display player's cards
    document.getElementById("playerGameCards").innerHTML = getCardHTML(playerHand);

    // Display bot's cards and update total sum
    document.getElementById("botGameCards").innerHTML = getCardHTML(dealerHand, !gameOver);

    // Update player's sum
    document.getElementById("mySums").value = calculateHandValue(playerHand);

    // Bot sum: Hanya tampilkan kartu pertama jika game belum selesai, tampilkan semua jika game selesai
    if (gameOver) {
        // Jika permainan selesai, tampilkan seluruh nilai kartu bot
        document.getElementById("botSums").value = calculateHandValue(dealerHand);
    } else {
        // Jika permainan belum selesai, hanya tampilkan nilai kartu pertama (yang tidak dihidden)
        document.getElementById("botSums").value = getCardValue(dealerHand[1]);  // Nilai kartu pertama dealer
    }
}

// Untuk mencocokkan nilai kartu dengan asset gambar yang akan di tampilkan di html
function getCardHTML(hand, hideDealerCard = false) {
    let cardsHTML = '';

    // Mapping nilai angka ke nama kartu spesial
    const cardNames = {
        'A': 'ace',
        'J': 'jack',
        'Q': 'queen',
        'K': 'king'
    };

    for (let i = 0; i < hand.length; i++) {
        let card = hand[i];

        // Periksa apakah kartu ini memiliki nilai khusus (Ace, Jack, Queen, King)
        let cardValue = cardNames[card.value] ? cardNames[card.value] : card.value;

        // Buat nama file gambar berdasarkan nilai dan suit
        let cardFileName = `${cardValue}_of_${card.suit.toLowerCase()}.png`;

        if (i === 0 && hideDealerCard) {
            cardsHTML += `<img src="src/backcard1.jpg" alt="Back" class="card-img">`;
        } else {
            cardsHTML += `<img src="src/cards/${cardFileName}" class="card-img">`;
        }
    }

    return cardsHTML;
}

function checkForBust(hand) {
    return calculateHandValue(hand) > 21;
}

// Tombol takecard
document.getElementById("takeCardBtn").addEventListener("click", function () {
    playerHand.push(drawCard());
    updateGameDisplay();

    // Delay alert
    setTimeout(() => {
        let playerTotal = calculateHandValue(playerHand);

        if (playerTotal > 21) {
            endGame("Player Bust! You lose.");
        } else if (playerTotal === 21) {
            endGame("You got 21! You win!", true);
        }
    }, 1000);
});

// Tombol hold
document.getElementById("holdCardBtn").addEventListener("click", function () {
    dealerTurn();
});

function dealerTurn() {

    function drawDealerCard() {
        if (calculateHandValue(dealerHand) < 17) {
            dealerHand.push(drawCard());
            updateGameDisplay(true);

            // Tambahkan jeda 0.5 detik sebelum dealer menarik kartu lagi
            setTimeout(drawDealerCard, 500);
        } else {
            // Setelah dealer selesai menarik kartu, tunggu sebentar sebelum menunjukkan hasil
            setTimeout(() => {
                if (checkForBust(dealerHand)) {
                    endGame("Dealer Bust! You win.", true);
                } else {
                    determineWinner();
                }
            }, 500);
        }
    }

    drawDealerCard();
}

function determineWinner() {
    let playerTotal = calculateHandValue(playerHand);
    let dealerTotal = calculateHandValue(dealerHand);

    if (playerTotal > dealerTotal) {
        endGame("You win!", true);
    } else if (playerTotal < dealerTotal) {
        endGame("You lose.");
    } else {
        playerMoney += playerBet; // kembalikan uang player jika tie
        endGame("It's a tie!");
    }
}

// End the game
function endGame(message, playerWins = false) {
    alert(message);
    document.getElementById("takeCardBtn").disabled = true;
    document.getElementById("holdCardBtn").disabled = true;

    if (playerWins) {
        playerMoney += playerBet * 2;
    }

    document.getElementById("myMoney").textContent = `$${playerMoney}`;

    updateGameDisplay(true);

    checkPlayerMoney();

    document.getElementById("startGameBtn").disabled = false;
}

// Fungsi untuk memeriksa apakah uang player habis
function checkPlayerMoney() {
    if (playerMoney <= 0) {
        showGameOverModal();
    }
}

// Menampilkan modal jika uang player sudah habis
function showGameOverModal() {
    let modal = document.getElementById("gameOverModal");
    modal.style.display = "block";

    document.getElementById("resetGameBtn").addEventListener("click", function () {
        location.reload();
    });
}

// Initialize game
document.getElementById("startGameBtn").addEventListener("click", function () {
    const betAmount = parseInt(document.getElementById("betInput").value);

    // Validate bet input
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    if (betAmount > playerMoney) {
        alert("You don't have enough money to place this bet.");
        return;
    }

    if (betAmount < 100) {
        alert("Minimal bet adalah $100.");
        return; // Stop fungsi, jangan mulai game jika kurang dari 100
    }

    playerBet = betAmount;
    playerMoney -= playerBet;

    document.getElementById("myMoney").textContent = `$${playerMoney}`;

    document.getElementById("takeCardBtn").disabled = false;
    document.getElementById("holdCardBtn").disabled = false;

    // Bersihkan gambar kartu sisa di tampilan html
    document.getElementById("playerGameCards").innerHTML = '';
    document.getElementById("botGameCards").innerHTML = '';

    document.getElementById("startGameBtn").disabled = true;

    // acak kartu lalu bagikan ulang
    createDeck();
    shuffleDeck();
    dealInitialCards();
});
