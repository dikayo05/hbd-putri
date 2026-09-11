const openLetterButton = document.querySelector('#openLetter');
const letterSection = document.querySelector('#letterSection');
const toast = document.querySelector('#toast');
const partyMessage = document.querySelector('#partyMessage');
const partyMusic = document.querySelector('#partyMusic');
const musicToggle = document.querySelector('#musicToggle');
const musicToggleLabel = document.querySelector('#musicToggleLabel');
const musicButton = document.querySelector('#musicButton');
const balloons = document.querySelectorAll('.balloon');
let toastTimer;

function setMusicState(isPlaying) {
    musicToggle.classList.toggle('is-playing', isPlaying);
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicToggleLabel.textContent = isPlaying ? 'Musik: nyala' : 'Musik: mati';
    musicButton.classList.toggle('playing', isPlaying);
}

async function toggleMusic(showMessage = true) {
    if (partyMusic.paused) {
        try {
            await partyMusic.play();
            partyMessage.textContent = '♪ Musik pesta menyala. Goyangkan bahu pelan-pelan. ♪';
            if (showMessage) {
                showToast('Party mode: ON');
            }
        } catch (error) {
            setMusicState(false);
            if (showMessage) {
                showToast('Klik lagi untuk menyalakan musik.');
            }
        }
        return;
    }

    partyMusic.pause();
    partyMessage.textContent = 'Musiknya istirahat sebentar, tapi pestanya tetap jalan.';
    if (showMessage) {
        showToast('Party mode: PAUSE');
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function releaseConfetti(amount = 55) {
    const colors = ['#ff806b', '#ffd365', '#b8e4d3', '#ffb8c9', '#273236'];
    for (let index = 0; index < amount; index += 1) {
        const piece = document.createElement('i');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.background = colors[index % colors.length];
        piece.style.setProperty('--x', `${(Math.random() - 0.5) * 240}px`);
        piece.style.animationDelay = `${Math.random() * 0.35}s`;
        piece.style.transform = `rotate(${Math.random() * 90}deg)`;
        document.body.appendChild(piece);
        piece.addEventListener('animationend', () => piece.remove());
    }
}

openLetterButton.addEventListener('click', () => {
    letterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    releaseConfetti(38);
    showToast('Surat berhasil dibuka. Isinya penuh cinta!');
});

balloons.forEach((balloon) => {
    balloon.addEventListener('click', () => {
        const message = balloon.dataset.balloon;
        balloon.classList.add('is-blown');
        releaseConfetti(14);
        showToast(message);
        setTimeout(() => balloon.classList.remove('is-blown'), 850);
    });
});

document.querySelector('#cakeButton').addEventListener('click', (event) => {
    const cakeCard = event.currentTarget;
    cakeCard.classList.add('is-blown');
    partyMessage.textContent = 'Lilin padam! Sekarang buat permintaan paling rahasia yang kamu punya.';
    releaseConfetti(70);
    showToast('Wish granted-ish! ✨');
    setTimeout(() => cakeCard.classList.remove('is-blown'), 700);
});

musicButton.addEventListener('click', () => toggleMusic());
musicToggle.addEventListener('click', () => toggleMusic());
partyMusic.addEventListener('play', () => setMusicState(true));
partyMusic.addEventListener('pause', () => setMusicState(false));

toggleMusic(false);

document.querySelector('#wishButton').addEventListener('click', () => {
    const wishes = ['Semesta mencatat: tahun ini penuh kejutan manis.', 'Sinyal dari masa depan: kamu makin keren.', 'Harapanmu sedang dikirim dengan prioritas tinggi.'];
    partyMessage.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    releaseConfetti(35);
    showToast('Harapan terkirim ke langit ✦');
});
