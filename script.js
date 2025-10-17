// Ukrainian keyboard layout
const keyboardLayout = [
    ['`','1','2','3','4','5','6','7','8','9','0','-','='],
    ['Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ї','\\'],
    ['Ф','І','В','А','П','Р','О','Л','Д','Ж','Є','ENTER'],
    ['Я','Ч','С','М','И','Т','Ь','Б','Ю','.','SHIFT']
];

// Ukrainian letters for practice
const ukrainianLetters = [
    'А','Б','В','Г','Ґ','Д','Е','Є','Ж','З','И','І','Ї','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ь','Ю','Я'
];

const keyboardDiv = document.getElementById('keyboard');
const randomLetterDiv = document.getElementById('random-letter');
const pressedKeyDiv = document.getElementById('pressed-key');

// Generate keyboard
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

// Show random letter
function showRandomLetter() {
    const letter = ukrainianLetters[Math.floor(Math.random() * ukrainianLetters.length)];
    randomLetterDiv.textContent = letter;
}

// Listen to keyboard press
document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    pressedKeyDiv.textContent = `You pressed: ${key}`;

    document.querySelectorAll('.key').forEach(k => k.classList.remove('pressed'));
    document.querySelectorAll('.key').forEach(k => {
        if(k.textContent === key) k.classList.add('pressed');
    });

    showRandomLetter();
});

// Initial letter
showRandomLetter();
