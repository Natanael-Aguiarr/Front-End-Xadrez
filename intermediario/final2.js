document.addEventListener('DOMContentLoaded', () => {
    loadProgress19();
    updateGlobalProgress19();
});

function markCompleted19(button) {
    if (button.classList.contains('completed')) {
        button.classList.remove('completed');
        button.textContent = 'Concluir';
    } else {
        button.classList.add('completed');
        button.textContent = 'Concluído';
    }
    // Toca o som de marcação de conclusão
    const markSound = document.getElementById('mark-sound');
    markSound.play();

    saveProgress19();
    updateGlobalProgress19();
}

function saveProgress19() {
    const buttons = document.querySelectorAll('.btn-concluido19'); // Use a nova classe específica da página 19
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress19', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress19() {
    const progressData = JSON.parse(localStorage.getItem('progress19'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido19');
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

function updateGlobalProgress19() {
    const completedButtons = document.querySelectorAll('.btn-concluido19.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido19').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text19'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring19'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container19'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal19(); // Função específica para a página 19
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal19() {
    const modal = document.getElementById('congratulations-modal19'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal19() {
    const modal = document.getElementById('congratulations-modal19'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
