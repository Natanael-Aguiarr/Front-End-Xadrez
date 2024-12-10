document.addEventListener('DOMContentLoaded', () => {
    loadProgress16();
    updateGlobalProgress16();
});

function markCompleted16(button) {
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

    saveProgress16();
    updateGlobalProgress16();
}

function saveProgress16() {
    const buttons = document.querySelectorAll('.btn-concluido16'); // Use a nova classe específica da página 16
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress16', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress16() {
    const progressData = JSON.parse(localStorage.getItem('progress16'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido16');
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

function updateGlobalProgress16() {
    const completedButtons = document.querySelectorAll('.btn-concluido16.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido16').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text16'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring16'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container16'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal16(); // Função específica para a página 16
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal16() {
    const modal = document.getElementById('congratulations-modal16'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal16() {
    const modal = document.getElementById('congratulations-modal16'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
