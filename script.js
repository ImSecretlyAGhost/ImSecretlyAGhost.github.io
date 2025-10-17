const keyboardLayout = [
    ['`','1','2','3','4','5','6','7','8','9','0','-','='],
    ['Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ї','\\'],
    ['Ф','І','В','А','П','Р','О','Л','Д','Ж','Є','ENTER'],
    ['Я','Ч','С','М','И','Т','Ь','Б','Ю','.','SHIFT']
];

const ukrainianLetters = [
    'А','Б','В','Г','Ґ','Д','Е','Є','Ж','З','И','І','Ї','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ь','Ю','Я'
];

const keyboardDiv = document.getElementById('keyboard');
const letterSequenceDiv = document.getElementById('letter-sequence');
const typingInput = document.getElementById('typing-input');
const feedbackDiv = document.getElementById('feedback');
const scoreDiv = document.getElementById('score');

let score = 0;
let sequence = [];
let currentIndex = 0;

// Build virtual keyboard
keyboardLayout.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';
    row.forEach(key => {
        const keyDiv = document.createElement('div');
        keyDiv.className = 'key';
        keyDiv.textContent = key;
        rowDiv.appendChild(keyDiv);
    });
    keyboardDiv.appendChild(rowDiv);
});

// Generate random sequence of letters
function generateSequence(length = 5) {
    sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(ukrainianLetters[Math.floor(Math.random() * ukrainianLetters.length)]);
    }
    currentIndex = 0;
    renderSequence();
}

// Render sequence with highlighting
function renderSequence() {
    letterSequenceDiv.innerHTML = '';
    sequence.forEach((letter, idx) => {
        const span = document.createElement('span');
        span.textContent = letter;
        if (idx < currentIndex) span.classList.add('correct');
        letterSequenceDiv.appendChild(span);
    });
}

// Handle typing input
typingInput.addEventListener('input', (e) => {
    const input = e.target.value.toUpperCase();
    const keyDivs = document.querySelectorAll('.key');

    // Reset all key styles
    keyDivs.forEach(k => k.classList.remove('pressed','wrong'));

    // Highlight pressed key on virtual keyboard
    const lastChar = input.slice(-1);
    keyDivs.forEach(k => {
        if(k.textContent.toUpperCase() === lastChar) k.classList.add('pressed');
    });

    // Check correctness
    if (input.length > currentIndex) {
        if(input[input.length - 1] === sequence[currentIndex]) {
            currentIndex++;
            score++;
            scoreDiv.textContent = `Score: ${score}`;
            feedbackDiv.textContent = 'Correct!';
        } else {
            keyDivs.forEach(k => {
                if(k.textContent.toUpperCase() === input[input.length - 1]) k.classList.add('wrong');
            });
            feedbackDiv.textContent = 'Wrong key!';
        }
    }

    renderSequence();

    // When sequence complete, generate a new one
    if (currentIndex >= sequence.length) {
        setTimeout(() => {
            generateSequence(5);
            typingInput.value = '';
            feedbackDiv.textContent = 'Start typing!';
        }, 500);
    }
});

generateSequence();
