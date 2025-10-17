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
const randomLetterDiv = document.getElementById('random-letter');
const feedbackDiv = document.getElementById('feedback');
const scoreDiv = document.getElementById('score');

let score = 0;
let currentLetter = 'А';

// Generate keyboard
keyboardLayout.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';
    row.forEach(key => {
        const keyDiv = document.createElement('div');
        keyDiv.className = 'key';
        keyDiv.textContent = key;
        // Click support
        keyDiv.addEventListener('click', () => handleKeyPress(key));
        rowDiv.appendChild(keyDiv);
    });
    keyboardDiv.appendChild(rowDiv);
});

function showRandomLetter() {
    currentLetter = ukrainianLetters[Math.floor(Math.random() * ukrainianLetters.length)];
    randomLetterDiv.textContent = currentLetter;
}

// Handle key press logic
function handleKeyPress(key) {
    document.querySelectorAll('.key').forEach(k => k.classList.remove('correct', 'wrong'));

    if (key.toUpperCase() === currentLetter) {
        feedbackDiv.textContent = 'Correct!';
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        document.querySelectorAll('.key').forEach(k => {
            if(k.textContent.toUpperCase() === currentLetter) k.classList.add('correct');
        });
        setTimeout(showRandomLetter, 400);
    } else {
        feedbackDiv.textContent = 'Try again!';
        document.querySelectorAll('.key').forEach(k => {
            if(k.textContent.toUpperCase() === key.toUpperCase()) k.classList.add('wrong');
        });
    }
}

// Keyboard event
document.addEventListener('keydown', (e) => handleKeyPress(e.key));

showRandomLetter();
