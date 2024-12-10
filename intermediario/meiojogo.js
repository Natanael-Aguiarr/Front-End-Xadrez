document.addEventListener('DOMContentLoaded', () => {
    loadProgress12();
    updateGlobalProgress12();
});

function markCompleted12(button) {
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

    saveProgress12();
    updateGlobalProgress12();
}

function saveProgress12() {
    const buttons = document.querySelectorAll('.btn-concluido12'); // Use a nova classe específica da página 12
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress12', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress12() {
    const progressData = JSON.parse(localStorage.getItem('progress12'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido12');
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

function updateGlobalProgress12() {
    const completedButtons = document.querySelectorAll('.btn-concluido12.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido12').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text12'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring12'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container12'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal12(); // Função específica para a página 12
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal12() {
    const modal = document.getElementById('congratulations-modal12'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal12() {
    const modal = document.getElementById('congratulations-modal12'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
