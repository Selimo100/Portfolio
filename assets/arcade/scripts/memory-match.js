document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const movesDisplay = document.getElementById('moves');
    const pairsDisplay = document.getElementById('pairs');
    const timeDisplay = document.getElementById('time');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let pairs = 0;
    let totalPairs = 6;
    let timer;
    let seconds = 0;
    let difficulty = 'easy';

    function initializeGame() {
        gameBoard.innerHTML = '';
        cards = [];
        moves = 0;
        pairs = 0;
        seconds = 0;
        clearInterval(timer);
        
        movesDisplay.textContent = moves;
        pairsDisplay.textContent = `0/${totalPairs}`;
        timeDisplay.textContent = '00:00';

        let numPairs;
        switch(difficulty) {
            case 'easy':
                numPairs = 6;
                gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
                break;
            case 'medium':
                numPairs = 8;
                gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
                break;
            case 'hard':
                numPairs = 12;
                gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
                break;
            default:
                numPairs = 6;
        }
        totalPairs = numPairs;
        pairsDisplay.textContent = `0/${totalPairs}`;

        const cardEmojis = [...emojis.slice(0, numPairs), ...emojis.slice(0, numPairs)];
        shuffleArray(cardEmojis);

        cardEmojis.forEach((emoji, index) => {
            createCard(emoji, index);
        });

        timer = setInterval(updateTimer, 1000);
    }

    function createCard(emoji, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.emoji = emoji;

        card.innerHTML = `
            <div class="card-face card-front">${emoji}</div>
            <div class="card-face card-back">?</div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        moves++;
        movesDisplay.textContent = moves;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

        if (isMatch) {
            disableCards();
            pairs++;
            pairsDisplay.textContent = `${pairs}/${totalPairs}`;
            
            if (pairs === totalPairs) {
                setTimeout(() => {
                    alert(`Congratulations! You won in ${moves} moves and ${formatTime(seconds)}!`);
                    clearInterval(timer);
                }, 500);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function updateTimer() {
        seconds++;
        timeDisplay.textContent = formatTime(seconds);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            difficulty = btn.dataset.difficulty;
            initializeGame();
        });
    });

    initializeGame();
});
