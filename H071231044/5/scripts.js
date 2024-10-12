let playerHand = [];
let dealerHand = [];
let deck = [];
let balance = 0;
let currentBet = 0;

while (balance === 0) {
    let input1 = prompt("Masukkan nominal Balance : ");
    if (!isNaN(input1) && Number.isInteger(parseFloat(input1))) {
        balance = input1;
        document.getElementById('balance').textContent = balance;
        break
    } else {
        alert("Inputan Bukan angka");
    }
}

// Nilai kartu
const cardValues = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "J": 10, "Q": 10, "K": 10, "A": [1, 11]
};

// Membuat deck kartu
function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    deck = shuffle(deck);
}

// Fungsi untuk mengacak kartu
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Fungsi mengambil kartu
function drawCard() {
    return deck.pop();
}

// Menghitung total nilai kartu
function calculateTotal(hand) {
    let total = 0;
    let hasAce = false;
    for (let card of hand) {
        let value = cardValues[card.rank];
        if (card.rank === "A") {
            hasAce = true;
            total += 11;
        } else {
            total += value;
        }
    }

    // Jika total lebih dari 21 dan ada kartu As, ubah nilainya jadi 1
    if (hasAce && total > 21) {
        total -= 10;
    }

    return total;
}

function displayCards(hand, elementId, revealAll = false) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';  // Kosongkan kontainer terlebih dahulu

    // Jika hanya ada satu kartu, pusatkan kartu di tengah
    if (hand.length === 1) {
        container.style.justifyContent = 'center';
    } else {
        // Jika lebih dari satu kartu, geser ke kiri
        container.style.justifyContent = 'flex-start';
    }

    hand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        if (hand === dealerHand && !revealAll) {
            // Jika kartu dealer dan belum di-reveal, hanya tampilkan satu kartu tertutup (gambar belakang)
            if (index === 0) {
                const cardBackImage = document.createElement('img');
                cardBackImage.src = 'Assets/cards/BACK.png';
                cardBackImage.alt = 'Card Back';
                cardBackImage.classList.add('card-img');
                cardDiv.appendChild(cardBackImage);
            }
        } else {
            // Tampilkan kartu asli
            const cardImage = document.createElement('img');
            const cardFileName = `${card.rank}_of_${card.suit}.png`;
            cardImage.src = `Assets/cards/${cardFileName}`;
            cardImage.alt = `${card.rank} of ${card.suit}`;
            cardImage.classList.add('card-img');
            cardDiv.appendChild(cardImage);
        }

        // Tambahkan kartu ke kontainer
        container.appendChild(cardDiv);

        // Animasi fade-in
        setTimeout(() => {
            cardDiv.classList.add('show');
        }, 100 * index);  // Delay untuk efek bertahap
    });
}


// Menghandle aksi "Hit"
document.getElementById('hit-btn').addEventListener('click', () => {
    playerHand.push(drawCard()); // Tambahkan kartu ke tangan player
    displayCards(playerHand, 'player-cards'); // Tampilkan ulang kartu player
    document.getElementById('player-total').textContent = `${calculateTotal(playerHand)}`;

    // Cek apakah total kartu player melebihi 21 (bust)
    if (calculateTotal(playerHand) > 21) {
        balance -= currentBet
        endGame('Bust! You lose.');
    }
});

// Fungsi untuk menampilkan kartu dealer secara bertahap
function revealDealerCards() {
    let dealerTotal = calculateTotal(dealerHand);
    let index = 1; // Mulai dari kartu kedua karena kartu pertama adalah kartu yang dibalik

    // Fungsi rekursif untuk menampilkan kartu dealer satu per satu
    function revealNextCard() {
        if (index < dealerHand.length) {
            displayCards(dealerHand.slice(0, index + 1), 'dealer-cards', true);  // Tampilkan kartu dealer hingga kartu ke-index
            dealerTotal = calculateTotal(dealerHand.slice(0, index + 1));
            document.getElementById('dealer-total').textContent = `${dealerTotal}`;  // Perbarui total dealer

            index++;
            setTimeout(revealNextCard, 1000);  // Lanjutkan menampilkan kartu berikutnya dengan delay 1 detik
        } else {
            // Jika sudah selesai menampilkan semua kartu, lakukan pengecekan pemenang
            setTimeout(() => {
                checkWinner();
            }, 1000); // Beri delay 1 detik sebelum memeriksa siapa pemenangnya
        }
    }

    // Tampilkan kartu pertama (yang tertutup) terlebih dahulu
    setTimeout(() => {
        displayCards(dealerHand.slice(0, 1), 'dealer-cards', true); // Tampilkan kartu pertama dealer yang tertutup (dibalik)
        document.getElementById('dealer-total').textContent = `Total: ${calculateTotal(dealerHand.slice(0, 1))}`;  // Perbarui total dealer dengan kartu pertama
        setTimeout(revealNextCard, 1000); // Setelah 1 detik, lanjutkan dengan kartu berikutnya
    }, 1000);  // Beri delay 1 detik sebelum membuka kartu pertama yang tertutup
}

// Menghandle aksi "Stay"
document.getElementById('stay-btn').addEventListener('click', () => {
    let dealerTotal = calculateTotal(dealerHand);

    // Dealer harus menarik kartu hingga totalnya mencapai minimal 17
    while (dealerTotal < 17) {
        dealerHand.push(drawCard());
        dealerTotal = calculateTotal(dealerHand);
    }

    // Setelah dealer selesai, tampilkan kartu dealer satu per satu
    revealDealerCards();
});

// Fungsi lain (displayCards, calculateTotal, dsb.) tetap sama


// Menghandle aksi Taruhan
document.getElementById('bet-btn').addEventListener('click', () => {
    const betInput = document.getElementById('bet-amount');
    currentBet = parseInt(betInput.value);

    if (currentBet >= 100 && currentBet <= balance) {
        startGame();

        const betBtn = document.getElementById('bet-btn');
        betBtn.classList.add('no-hover'); 

        const betInput = document.getElementById('bet-amount');
        betInput.value = '';

    } else {
        alert('Invalid bet amount.');
    }
});

// Memulai game baru
function startGame() {
    document.getElementById('current-bet').textContent = `${currentBet}`;
    createDeck();  // Buat deck baru
    playerHand = [drawCard(), drawCard()];  // Player mendapat dua kartu
    dealerHand = [drawCard(), drawCard()];  // Dealer mendapat dua kartu

    displayCards(playerHand, 'player-cards');  // Tampilkan kartu player
    displayCards(dealerHand, 'dealer-cards');  // Hanya tampilkan satu kartu tertutup dealer (gambar belakang)
    
    document.getElementById('player-total').textContent = `${calculateTotal(playerHand)}`;
    document.getElementById('dealer-total').textContent = `???`;

    // Aktifkan tombol Hit dan Stay
    document.getElementById('bet-btn').disabled = true;
    document.getElementById('bet-amount').disabled = true;
    document.getElementById('hit-btn').disabled = false;
    document.getElementById('stay-btn').disabled = false;
}

// Cek pemenang
function checkWinner() {
    const playerTotal = calculateTotal(playerHand);
    const dealerTotal = calculateTotal(dealerHand);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
        balance += currentBet * 2;
        endGame('You win!');
    } else if (dealerTotal > playerTotal) {
        balance -= currentBet;
        endGame('Dealer wins.');
    } else {
        endGame('Push! It\'s a tie.');
    }
}

// Mengakhiri game dan menampilkan pesan
function endGame(message) {
    // Tampilkan semua kartu dealer terlebih dahulu
    // Update saldo
    document.getElementById('balance').textContent = balance;

    // Nonaktifkan tombol Hit dan Stay setelah game selesai
    document.getElementById('current-bet').textContent = `${0}`;
    document.getElementById('bet-btn').disabled = false;
    document.getElementById('bet-amount').disabled = false;
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stay-btn').disabled = true;

    const betBtn = document.getElementById('bet-btn');
    betBtn.classList.remove('no-hover');

    // Tampilkan pesan hasil game setelah sedikit delay
    setTimeout(() => {
        alert(message);
    }, 500); // Delay 0.5 detik untuk menunggu animasi kartu
}
