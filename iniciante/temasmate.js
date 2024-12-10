document.addEventListener('DOMContentLoaded', () => {
    loadProgress5();
    updateGlobalProgress5();
});

function markCompleted5(button) {
    if (button.classList.contains('completed')) {
        button.classList.remove('completed');
        button.textContent = 'Concluir';
    } else {
        button.classList.add('completed');
        button.textContent = 'Concluído';
    }
    const markSound = document.getElementById('mark-sound');
    markSound.play();

    saveProgress5();
    updateGlobalProgress5();
}

function saveProgress5() {
    const buttons = document.querySelectorAll('.btn-concluido5');
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress5', JSON.stringify(progressData));
}

function loadProgress5() {
    const progressData = JSON.parse(localStorage.getItem('progress5'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido5');
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

function updateGlobalProgress5() {
    const completedButtons = document.querySelectorAll('.btn-concluido5.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido5').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text5');
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring5');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container5');
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal5();
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal5() {
    const modal = document.getElementById('congratulations-modal5');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal5() {
    const modal = document.getElementById('congratulations-modal5');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
