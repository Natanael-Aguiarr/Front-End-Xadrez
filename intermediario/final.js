document.addEventListener('DOMContentLoaded', () => {
    loadProgress13();
    updateGlobalProgress13();
});

function markCompleted13(button) {
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

    saveProgress13();
    updateGlobalProgress13();
}

function saveProgress13() {
    const buttons = document.querySelectorAll('.btn-concluido13'); // Use a nova classe específica da página 13
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress13', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress13() {
    const progressData = JSON.parse(localStorage.getItem('progress13'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido13');
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

function updateGlobalProgress13() {
    const completedButtons = document.querySelectorAll('.btn-concluido13.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido13').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text13'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring13'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container13'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal13(); // Função específica para a página 13
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal13() {
    const modal = document.getElementById('congratulations-modal13'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal13() {
    const modal = document.getElementById('congratulations-modal13'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
