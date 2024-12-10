document.addEventListener('DOMContentLoaded', () => {
    loadProgress6();
    updateGlobalProgress6();
});

function markCompleted6(button) {
    if (button.classList.contains('completed')) {
        button.classList.remove('completed');
        button.textContent = 'Concluir';
    } else {
        button.classList.add('completed');
        button.textContent = 'Concluído';
    }
    const markSound = document.getElementById('mark-sound');
    markSound.play();

    saveProgress6();
    updateGlobalProgress6();
}

function saveProgress6() {
    const buttons = document.querySelectorAll('.btn-concluido6');
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress6', JSON.stringify(progressData));
}

function loadProgress6() {
    const progressData = JSON.parse(localStorage.getItem('progress6'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido6');
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

function updateGlobalProgress6() {
    const completedButtons = document.querySelectorAll('.btn-concluido6.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido6').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text6');
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring6');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container6');
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal6();
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal6() {
    const modal = document.getElementById('congratulations-modal6');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal6() {
    const modal = document.getElementById('congratulations-modal6');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
