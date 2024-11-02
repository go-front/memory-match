// script.js

const gameContainer = document.querySelector(".game-container");
const attemptsDisplay = document.getElementById("attempts");

let attempts = 0;
let flippedCards = [];
let matchedCards = 0;

// Массив с парами значений для карточек
const cardValues = ["🍎", "🍌", "🍇", "🍉", "🍍", "🍒", "🍓", "🥝"];
const cards = [...cardValues, ...cardValues]; // удваиваем массив для пар

// Функция для перемешивания карточек
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Создаем карточки на игровом поле
function createCards() {
  shuffle(cards);
  cards.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });
}

// Переворачиваем карточку
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains("flip")) return;

  this.classList.add("flip");
  this.textContent = this.dataset.value;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    attempts++;
    attemptsDisplay.textContent = `Попытки: ${attempts}`;
    checkForMatch();
  }
}

// Проверяем на совпадение
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    matchedCards += 2;
    flippedCards = [];
    if (matchedCards === cards.length) {
      setTimeout(() => alert(`Вы выиграли за ${attempts} попыток!`), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      card1.textContent = "";
      card2.textContent = "";
      flippedCards = [];
    }, 1000);
  }
}

// Запускаем игру
createCards();
