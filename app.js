const paletteContainer = document.getElementById('palette');
const generateBtn = document.getElementById('generate-btn');
const formatBtn = document.getElementById('format-btn');
const toast = document.getElementById('toast');

let colors = [
    {hex: '#1A1A1A', locked: false},
    {hex: '#2A2A2A', locked: false},
    {hex: '#3A3A3A', locked: false},
    {hex: '#4A4A4A', locked: false},
    {hex: '#5A5A5A', locked: false}
];

let isRGB = false;

const savedPalette = localStorage.getItem('myPalettePro');
if (savedPalette) {
    colors = JSON.parse(savedPalette);
}

function generateRandomHex() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function isColorLight(hex){
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    const brightness = (r*299+g*587+b*114)/1000;
    return brightness > 128;
}

function generatePalette(){
    colors = colors.map(colorObj => {
        if (colorObj.locked){
            return colorObj; 
        }
        return {hex: generateRandomHex(), locked: false};
    });
    saveAndRender();
}

function saveAndRender(){
    localStorage.setItem('myPalettePro', JSON.stringify(colors)); 
    renderPalette();
}

function renderPalette(){
    paletteContainer.innerHTML = '';

    colors.forEach((colorObj, index) => {
        const column = document.createElement('div');
        column.className = 'color-column';
        column.style.backgroundColor = colorObj.hex;


        const lockBtn = document.createElement('button');
        lockBtn.className = 'lock-btn' + (colorObj.locked ? ' locked':'');
        lockBtn.innerHTML = colorObj.locked ? '🔒' : '🔓';

        lockBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            colors[index].locked = !colors[index].locked;
            saveAndRender();
        });


        const text = document.createElement('span');
        text.className = 'color-text';
        text.textContent = isRGB ? hexToRgb(colorObj.hex) : colorObj.hex;

        text.style.color = isColorLight(colorObj.hex) ? '#121212' : '#ffffff';

        column.addEventListener('click', () => {
            navigator.clipboard.writeText(text.textContent).then(() => {
                showToast();
            });
        });

        column.appendChild(lockBtn);
        column.appendChild(text);
        paletteContainer.appendChild(column);
    });
}

function showToast(){
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}

generateBtn.addEventListener('click', generatePalette);

formatBtn.addEventListener('click', () => {
    isRGB = !isRGB;
    formatBtn.textContent = isRGB ? 'Switch to HEX' : 'Switch to RGB';
    renderPalette();
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        generatePalette();
    }
});

renderPalette();