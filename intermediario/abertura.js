document.addEventListener('DOMContentLoaded', () => {
    loadProgress10();
    updateGlobalProgress10();
});

function markCompleted10(button) {
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

    saveProgress10();
    updateGlobalProgress10();
}

function saveProgress10() {
    const buttons = document.querySelectorAll('.btn-concluido10'); // Use a nova classe específica da página 10
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress10', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress10() {
    const progressData = JSON.parse(localStorage.getItem('progress10'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido10');
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

function updateGlobalProgress10() {
    const completedButtons = document.querySelectorAll('.btn-concluido10.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido10').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text10'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring10'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container10'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal10(); // Função específica para a página 10
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal10() {
    const modal = document.getElementById('congratulations-modal10'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal10() {
    const modal = document.getElementById('congratulations-modal10'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
