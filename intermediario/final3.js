document.addEventListener('DOMContentLoaded', () => {
    loadProgress20();
    updateGlobalProgress20();
});

function markCompleted20(button) {
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

    saveProgress20();
    updateGlobalProgress20();
}

function saveProgress20() {
    const buttons = document.querySelectorAll('.btn-concluido20'); // Use a nova classe específica da página 20
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress20', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress20() {
    const progressData = JSON.parse(localStorage.getItem('progress20'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido20');
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

function updateGlobalProgress20() {
    const completedButtons = document.querySelectorAll('.btn-concluido20.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido20').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text20'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring20'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container20'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal20(); // Função específica para a página 20
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal20() {
    const modal = document.getElementById('congratulations-modal20'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal20() {
    const modal = document.getElementById('congratulations-modal20'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
