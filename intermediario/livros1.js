document.addEventListener('DOMContentLoaded', () => {
    loadProgress14();
    updateGlobalProgress14();
});

function markCompleted14(button) {
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

    saveProgress14();
    updateGlobalProgress14();
}

function saveProgress14() {
    const buttons = document.querySelectorAll('.btn-concluido14'); // Use a nova classe específica da página 14
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress14', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress14() {
    const progressData = JSON.parse(localStorage.getItem('progress14'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido14');
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

function updateGlobalProgress14() {
    const completedButtons = document.querySelectorAll('.btn-concluido14.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido14').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text14'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring14'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container14'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal14(); // Função específica para a página 14
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal14() {
    const modal = document.getElementById('congratulations-modal14'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal14() {
    const modal = document.getElementById('congratulations-modal14'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
