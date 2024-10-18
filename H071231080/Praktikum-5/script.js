let botSums = 0;
let mySums = 0;    

let botASCards = 0;
let myASCards = 0;   

let cards;      
let isCanHit = true; 

const startGameButton = document.getElementById("btn-start-game");
const takeCardButton = document.getElementById("btn-take");
const holdCardsButton = document.getElementById("btn-hold");

const mySumsElement = document.getElementsByClassName("my-sums")[0];
const myCardsElement = document.getElementsByClassName("my-cards")[0];
const myMoney = document.getElementById("my-money"); 
const inputMoney = document.getElementsByTagName("input")[0];

const botSumsElement = document.getElementsByClassName("bot-sums")[0];
const botCardsElement = document.getElementsByClassName("bot-cards")[0];

const resultElement = document.getElementById("result");  


window.onload = () => {
    buildUserCards();  
    shuffleCards(); 

    takeCardButton.setAttribute("disabled", true);  
    holdCardsButton.setAttribute("disabled", true); 
};


function buildUserCards() {
    let cardTypes = ["H", "B", "S", "K"];
    let cardValues = [
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J",
    ];  

    cards = [];  
    for (let i = 0; i < cardTypes.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            cards.push(cardValues[j] + "-" + cardTypes[i]); 
        }
    }
}

// Fungsi untuk mengacak kartu
function shuffleCards() {
    for (let i = 0; i < cards.length; i++) {
        let randomNum = Math.floor(Math.random() * cards.length);  
        let temp = cards[i];
        cards[i] = cards[randomNum]; 
        cards[randomNum] = temp;
    }
}

// Fungsi untuk memulai permainan saat tombol "Start Game" diklik
startGameButton.addEventListener("click", function () {
    let money = inputMoney.value;  
    if (money === "" || isNaN(money)) {
        alert("Masukkan Jumlah uang terlebih dahulu"); 
        return;
    }

    if (money < 100) {
        alert("Masukkan Jumlah Minimal 100");
        return;
    }

    if (money > 5000) {
        alert("Jumlah Taruhan maksimal adalah 5000");
        return;
    }
    if (parseInt(myMoney.textContent) <= 0 || myMoney === 0) {
        alert("Uang Anda habis. Anda tidak bisa melanjutkan bermain.");
        return;
    }

    if (startGameButton.textContent === "TRY AGAIN") {
        resetGame();
    }
    takeCardButton.disabled = false;  
    holdCardsButton.disabled = false; 

    startGameButton.textContent = "TRY AGAIN";  
    startGameButton.setAttribute("disabled", true);  

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = cards.pop();  
        cardImg.src = `assets/cards/${card}.png`;  
        mySums += getValueOfCard(card);  
        myASCards += checkASCard(card);  
        mySumsElement.textContent = mySums; 
        myCardsElement.append(cardImg);
    }

});

// Fungsi untuk mengambil kartu saat tombol "Take a Card" diklik
takeCardButton.addEventListener("click", function () {
    if (!isCanHit) return;

    let cardImg = document.createElement("img");
    let card = cards.pop(); 
    cardImg.src = `assets/cards/${card}.png`;  
    mySums += getValueOfCard(card);  
    myASCards += checkASCard(card);  
    mySumsElement.textContent = mySums;  
    myCardsElement.append(cardImg); 

    if (reduceASCardValue(mySums, myASCards) > 21) isCanHit = false;  

    if (mySums > 21) {
        takeCardButton.disabled = true;  
        holdCardsButton.disabled = true; 
        startGameButton.disabled = false; 
        myMoney.textContent -= inputMoney.value;  
        
        setTimeout(() => {
            alert("KALAH YA DEK YA"); 
        }, 300);
    }
});

// Fungsi untuk "Hold" kartu saat tombol "Hold" diklik
holdCardsButton.addEventListener("click", function () {
    setTimeout(() => {
        document.getElementsByClassName("hidden-card")[0].remove();  
    }, 1000);

    const addBotCards = () => {
        setTimeout(() => {
            let cardImg = document.createElement("img");
            let card = cards.pop();  
            cardImg.src = `assets/cards/${card}.png`;  
            botSums += getValueOfCard(card);  
            botASCards += checkASCard(card);  
            botCardsElement.append(cardImg);
            botSumsElement.textContent = botSums


            if (botSums < 18) {
                addBotCards();  
            } else {
                botSums = reduceASCardValue(botSums, botASCards); 
                mySums = reduceASCardValue(mySums, myASCards);  
                isCanHit = false;  
            
                let message = "";
                
                if (mySums > 21 || mySums < botSums && botSums <= 21) {
                    message = "KALAH! KACIAAN!";
                    myMoney.textContent -= inputMoney.value; 
                } else if (botSums > 21 || mySums > botSums) {
                    message = "YEY MENANG!";
                    myMoney.textContent = parseInt(myMoney.textContent) + parseInt(inputMoney.value) * 2; 
                } else {
                    message = "SERI!";
                }
                
                setTimeout(() => {
                    alert(message);  
                }, 300);
            
                // Reset tombol setelah permainan selesai
                startGameButton.disabled = false; 
                takeCardButton.disabled = true; 
                holdCardsButton.disabled = true; 
            }
        }, 1000);
    };
    addBotCards();
});

// Fungsi untuk mendapatkan nilai kartu
function getValueOfCard(card) {
    let data = card.split("-");  
    let value = data[0];  
    if (isNaN(value)) {
        if (value === "A") return 11; 
        return 10;  
    }
    return parseInt(value);  
}

// Fungsi untuk memeriksa apakah kartu As
function checkASCard(card) {
    if (card[0] === "A") return 1;  
    return 0;
}

// Fungsi untuk mengurangi nilai kartu As jika poin lebih dari 21
function reduceASCardValue(sums, ASCount) {
    while (sums > 21 && ASCount > 0) {
        sums -= 10;  
        ASCount -= 1;  
    }
    return sums;
}

// Fungsi untuk me-reset permainan
function resetGame() {
    botSums = 0;
    mySums = 0;
    botASCards = 0;
    myASCards = 0;
    isCanHit = true;

    const allCardsImage = document.querySelectorAll("img");
    allCardsImage.forEach(img => img.remove());  

    buildUserCards();
    shuffleCards(); 

    mySumsElement.textContent = mySums;
    botSumsElement.textContent = botSums;
    resultElement.textContent = ""; 
}