document.addEventListener('DOMContentLoaded', () => {
    loadProgress7();
    updateGlobalProgress7();
});

function markCompleted7(button) {
    if (button.classList.contains('completed')) {
        button.classList.remove('completed');
        button.textContent = 'Concluir';
    } else {
        button.classList.add('completed');
        button.textContent = 'Concluído';
    }
    const markSound = document.getElementById('mark-sound');
    markSound.play();

    saveProgress7();
    updateGlobalProgress7();
}

function saveProgress7() {
    const buttons = document.querySelectorAll('.btn-concluido7');
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress7', JSON.stringify(progressData));
}

function loadProgress7() {
    const progressData = JSON.parse(localStorage.getItem('progress7'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido7');
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

function updateGlobalProgress7() {
    const completedButtons = document.querySelectorAll('.btn-concluido7.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido7').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text7');
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring7');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container7');
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal7();
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal7() {
    const modal = document.getElementById('congratulations-modal7');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal7() {
    const modal = document.getElementById('congratulations-modal7');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
