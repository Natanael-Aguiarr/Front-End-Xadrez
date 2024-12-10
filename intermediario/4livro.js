document.addEventListener('DOMContentLoaded', () => {
    loadProgress18();
    updateGlobalProgress18();
});

function markCompleted18(button) {
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

    saveProgress18();
    updateGlobalProgress18();
}

function saveProgress18() {
    const buttons = document.querySelectorAll('.btn-concluido18'); // Use a nova classe específica da página 18
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress18', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress18() {
    const progressData = JSON.parse(localStorage.getItem('progress18'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido18');
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

function updateGlobalProgress18() {
    const completedButtons = document.querySelectorAll('.btn-concluido18.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido18').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text18'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring18'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container18'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal18(); // Função específica para a página 18
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal18() {
    const modal = document.getElementById('congratulations-modal18'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal18() {
    const modal = document.getElementById('congratulations-modal18'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
