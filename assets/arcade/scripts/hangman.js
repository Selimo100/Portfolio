document.addEventListener('DOMContentLoaded', () => {
    const wordDisplay = document.getElementById('word-display');
    const gameMessage = document.getElementById('game-message');
    const wrongGuessesDisplay = document.getElementById('wrong-guesses');
    const categoryDisplay = document.getElementById('category');
    const winsDisplay = document.getElementById('wins');
    const newGameBtn = document.getElementById('new-game-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const keys = document.querySelectorAll('.key');
    const hangmanParts = document.querySelectorAll('.hangman-part');

    const wordCategories = {
        animals: ['elephant', 'giraffe', 'penguin', 'dolphin', 'kangaroo', 'zebra', 'tiger', 'panda', 'koala', 'cheetah', 'monkey', 'rabbit'],
        fruits: ['banana', 'strawberry', 'pineapple', 'watermelon', 'orange', 'grape', 'kiwi', 'mango', 'blueberry', 'peach', 'cherry', 'apple'],
        countries: [
            'canada', 'brazil', 'australia', 'japan', 'france', 'germany', 'mexico', 'egypt', 'india', 'sweden', 'spain', 'italy',
            'argentina', 'south africa', 'china', 'russia', 'united states', 'united kingdom', 'norway', 'finland', 'denmark', 'portugal',
            'greece', 'turkey', 'south korea', 'new zealand', 'chile', 'colombia', 'peru', 'thailand', 'vietnam', 'indonesia', 'philippines',
            'saudi arabia', 'iran', 'iraq', 'pakistan', 'bangladesh', 'netherlands', 'belgium', 'switzerland', 'austria', 'poland',
            'czech republic', 'hungary', 'ukraine', 'romania', 'nigeria', 'kenya', 'argentina', 'venezuela', 'morocco'
        ]
    };

    let currentWord = '';
    let guessedLetters = [];
    let wrongGuesses = 0;
    let maxWrongGuesses = 6;
    let wins = localStorage.getItem('hangmanWins') || 0;
    let gameOver = false;
    let currentCategory = 'animals';

    winsDisplay.textContent = wins;

    function initGame() {
        guessedLetters = [];
        wrongGuesses = 0;
        gameOver = false;

        wrongGuessesDisplay.textContent = `0/${maxWrongGuesses}`;
        gameMessage.textContent = 'Start guessing!';
        gameMessage.classList.remove('win-animation');

        hangmanParts.forEach(part => {
            part.classList.remove('show');
        });

        keys.forEach(key => {
            key.disabled = false;
            key.classList.remove('correct', 'wrong');
        });

        const words = wordCategories[currentCategory];
        currentWord = words[Math.floor(Math.random() * words.length)];

        categoryDisplay.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

        createWordDisplay();
    }

    function createWordDisplay() {
        wordDisplay.innerHTML = '';

        for (let letter of currentWord) {
            const letterBox = document.createElement('div');
            letterBox.className = 'letter-box';

            if (!letter.match(/[a-z]/i)) {
                letterBox.textContent = letter;
            }

            wordDisplay.appendChild(letterBox);
        }
    }

    function updateWordDisplay() {
        const letterBoxes = wordDisplay.querySelectorAll('.letter-box');

        currentWord.split('').forEach((letter, index) => {
            if (guessedLetters.includes(letter) || !letter.match(/[a-z]/i)) {
                letterBoxes[index].textContent = letter;
            }
        });
    }

    function guessLetter(letter) {
        if (gameOver || guessedLetters.includes(letter)) return;

        guessedLetters.push(letter);

        if (currentWord.includes(letter)) {
            const key = Array.from(keys).find(k => k.textContent.toLowerCase() === letter);
            if (key) {
                key.classList.add('correct');
                key.disabled = true;
            }

            gameMessage.textContent = 'Good guess!';
            updateWordDisplay();

            checkWin();
        } else {
            wrongGuesses++;
            wrongGuessesDisplay.textContent = `${wrongGuesses}/${maxWrongGuesses}`;

            const key = Array.from(keys).find(k => k.textContent.toLowerCase() === letter);
            if (key) {
                key.classList.add('wrong');
                key.disabled = true;
            }

            if (wrongGuesses <= hangmanParts.length) {
                hangmanParts[wrongGuesses - 1].classList.add('show');
            }

            gameMessage.textContent = 'Wrong guess!';

            if (wrongGuesses >= maxWrongGuesses) {
                gameOver = true;
                gameMessage.textContent = `Game over! The word was "${currentWord}".`;

                keys.forEach(key => {
                    key.disabled = true;
                });
            }
        }
    }

    function checkWin() {
        const wordLetters = currentWord.split('').filter(letter => letter.match(/[a-z]/i));
        const correctGuesses = wordLetters.filter(letter => guessedLetters.includes(letter));

        if (correctGuesses.length === wordLetters.length) {
            gameOver = true;
            wins++;
            winsDisplay.textContent = wins;
            localStorage.setItem('hangmanWins', wins);

            gameMessage.textContent = 'Congratulations! You won!';
            gameMessage.classList.add('win-animation');

            keys.forEach(key => {
                key.disabled = true;
            });
        }
    }

    newGameBtn.addEventListener('click', initGame);

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const letter = key.textContent.toLowerCase();
            guessLetter(letter);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (gameOver) return;

        const letter = e.key.toLowerCase();
        if (letter.match(/^[a-z]$/) && !guessedLetters.includes(letter)) {
            guessLetter(letter);
        }
    });

    categoryBtns.forEach(button => {
        button.addEventListener('click', () => {
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentCategory = button.dataset.category;

            initGame();
        });
    });

    initGame();
});
