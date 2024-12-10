document.addEventListener('DOMContentLoaded', () => {
    loadProgress3();
    updateGlobalProgress3();
});

function markCompleted3(button) {
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

    saveProgress3();
    updateGlobalProgress3();
}

function saveProgress3() {
    const buttons = document.querySelectorAll('.btn-concluido3'); // Use a nova classe específica da página 2
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress3', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress3() {
    const progressData = JSON.parse(localStorage.getItem('progress3'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido3');
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

function updateGlobalProgress3() {
    const completedButtons = document.querySelectorAll('.btn-concluido3.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido3').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text3'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring3'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container3'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal3(); // Função específica para a página 2
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal3() {
    const modal = document.getElementById('congratulations-modal3'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal3() {
    const modal = document.getElementById('congratulations-modal3'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
