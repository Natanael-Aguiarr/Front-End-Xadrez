document.addEventListener('DOMContentLoaded', () => {
    loadProgress11();
    updateGlobalProgress11();
});

function markCompleted11(button) {
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

    saveProgress11();
    updateGlobalProgress11();
}

function saveProgress11() {
    const buttons = document.querySelectorAll('.btn-concluido11'); // Use a nova classe específica da página 11
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress11', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress11() {
    const progressData = JSON.parse(localStorage.getItem('progress11'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido11');
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

function updateGlobalProgress11() {
    const completedButtons = document.querySelectorAll('.btn-concluido11.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido11').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text11'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring11'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container11'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal11(); // Função específica para a página 11
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal11() {
    const modal = document.getElementById('congratulations-modal11'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal11() {
    const modal = document.getElementById('congratulations-modal11'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
