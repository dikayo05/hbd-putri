const openLetterButton = document.querySelector('#openLetter');
const letterSection = document.querySelector('#letterSection');
const toast = document.querySelector('#toast');
const partyMessage = document.querySelector('#partyMessage');
const partyMusic = document.querySelector('#partyMusic');
const musicToggle = document.querySelector('#musicToggle');
const musicToggleLabel = document.querySelector('#musicToggleLabel');
const musicButton = document.querySelector('#musicButton');
const cakeModal = document.querySelector('#cakeModal');
const cakeStatus = document.querySelector('#cakeStatus');
const candlePop = document.querySelector('#candlePop');
const candleYeay = document.querySelector('#candleYeay');
const balloonSound = document.querySelector('#balloonSound');
const wishSound = document.querySelector('#wishSound');
const wishModal = document.querySelector('#wishModal');
const wishForm = document.querySelector('#wishForm');
const wishInput = document.querySelector('#wishInput');
const candles = document.querySelectorAll('.candle');
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
        balloonSound.currentTime = 0;
        balloonSound.play().catch(() => {});
        balloon.classList.add('is-blown');
        releaseConfetti(14);
        showToast(message);
        setTimeout(() => balloon.classList.remove('is-blown'), 850);
    });
});

function closeCakeModal() {
    cakeModal.hidden = true;
}

document.querySelector('#cakeButton').addEventListener('click', () => {
    candles.forEach((candle) => candle.classList.remove('is-out'));
    cakeStatus.textContent = `${candles.length} api masih menyala`;
    cakeModal.hidden = false;
    document.querySelector('.cake-modal__close').focus();
});

document.querySelectorAll('[data-close-cake]').forEach((closeButton) => {
    closeButton.addEventListener('click', closeCakeModal);
});

candles.forEach((candle) => {
    candle.addEventListener('click', () => {
        if (candle.classList.contains('is-out')) {
            return;
        }

        candle.classList.add('is-out');
        candlePop.currentTime = 0;
        candlePop.play().catch(() => {});
        const remainingCandles = document.querySelectorAll('.candle:not(.is-out)').length;
        cakeStatus.textContent = remainingCandles === 0 ? 'Semua lilin padam. Make a wish! ✦' : `${remainingCandles} api masih menyala`;

        if (remainingCandles === 0) {
            candleYeay.currentTime = 0;
            candleYeay.play().catch(() => {});
            partyMessage.textContent = 'Lilin padam! Sekarang buat permintaan paling rahasia yang kamu punya.';
            releaseConfetti(70);
            showToast('Wish granted-ish! ✨');
        }
    });
});

musicButton.addEventListener('click', () => toggleMusic());
musicToggle.addEventListener('click', () => toggleMusic());
partyMusic.addEventListener('play', () => setMusicState(true));
partyMusic.addEventListener('pause', () => setMusicState(false));

window.addEventListener('load', () => toggleMusic(false));

function closeWishModal() {
    wishModal.hidden = true;
}

document.querySelector('#wishButton').addEventListener('click', () => {
    wishModal.hidden = false;
    wishInput.focus();
});

document.querySelectorAll('[data-close-wish]').forEach((closeButton) => {
    closeButton.addEventListener('click', closeWishModal);
});

wishForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const wish = wishInput.value.trim();

    if (!wish) {
        wishInput.focus();
        return;
    }

    partyMessage.textContent = `Permohonanmu "${wish}" sudah dikirim ke langit ✦`;
    wishSound.currentTime = 0;
    wishSound.play().catch(() => {});
    releaseConfetti(35);
    showToast('Harapan terkirim ke langit ✦');
    wishForm.reset();
    closeWishModal();
});
