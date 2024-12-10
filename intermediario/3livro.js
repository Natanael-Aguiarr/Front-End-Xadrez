document.addEventListener('DOMContentLoaded', () => {
    loadProgress17();
    updateGlobalProgress17();
});

function markCompleted17(button) {
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

    saveProgress17();
    updateGlobalProgress17();
}

function saveProgress17() {
    const buttons = document.querySelectorAll('.btn-concluido17'); // Use a nova classe específica da página 17
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress17', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress17() {
    const progressData = JSON.parse(localStorage.getItem('progress17'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido17');
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

function updateGlobalProgress17() {
    const completedButtons = document.querySelectorAll('.btn-concluido17.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido17').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text17'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring17'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container17'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal17(); // Função específica para a página 17
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal17() {
    const modal = document.getElementById('congratulations-modal17'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal17() {
    const modal = document.getElementById('congratulations-modal17'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
