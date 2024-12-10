document.addEventListener('DOMContentLoaded', () => {
    loadProgress8();
    updateGlobalProgress8();
});

function markCompleted8(button) {
    if (button.classList.contains('completed')) {
        button.classList.remove('completed');
        button.textContent = 'Concluir';
    } else {
        button.classList.add('completed');
        button.textContent = 'Concluído';
    }
    const markSound = document.getElementById('mark-sound');
    markSound.play();

    saveProgress8();
    updateGlobalProgress8();
}

function saveProgress8() {
    const buttons = document.querySelectorAll('.btn-concluido8');
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress8', JSON.stringify(progressData));
}

function loadProgress8() {
    const progressData = JSON.parse(localStorage.getItem('progress8'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido8');
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

function updateGlobalProgress8() {
    const completedButtons = document.querySelectorAll('.btn-concluido8.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido8').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text8');
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring8');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container8');
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal8();
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal8() {
    const modal = document.getElementById('congratulations-modal8');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal8() {
    const modal = document.getElementById('congratulations-modal8');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
