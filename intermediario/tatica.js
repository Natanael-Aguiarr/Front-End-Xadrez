document.addEventListener('DOMContentLoaded', () => {
    loadProgress9();
    updateGlobalProgress9();
});

function markCompleted9(button) {
    if (button.classList.contains('completed')) {
        button.classList.remove('completed');
        button.textContent = 'Concluir';
    } else {
        button.classList.add('completed');
        button.textContent = 'Concluído';
    }
    const markSound = document.getElementById('mark-sound');
    markSound.play();

    saveProgress9();
    updateGlobalProgress9();
}

function saveProgress9() {
    const buttons = document.querySelectorAll('.btn-concluido9');
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress9', JSON.stringify(progressData));
}

function loadProgress9() {
    const progressData = JSON.parse(localStorage.getItem('progress9'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido9');
        buttons.forEach((button, index) => {
            if (progressData[index]) {
                button.classList.add('completed');
                button.textContent = 'Concluído';
            } else {
                button.classList.remove('completed');
                button.textContent = 'Concluir';
            }
        });
    }
}

function updateGlobalProgress9() {
    const completedButtons = document.querySelectorAll('.btn-concluido9.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido9').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text9');
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring9');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container9');
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal9();
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal9() {
    const modal = document.getElementById('congratulations-modal9');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal9() {
    const modal = document.getElementById('congratulations-modal9');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
