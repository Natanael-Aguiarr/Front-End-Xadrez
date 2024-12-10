document.addEventListener('DOMContentLoaded', () => {
    loadProgress2();
    updateGlobalProgress2();
});

function markCompleted2(button) {
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

    saveProgress2();
    updateGlobalProgress2();
}

function saveProgress2() {
    const buttons = document.querySelectorAll('.btn-concluido2'); // Use a nova classe específica da página 2
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress2', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress2() {
    const progressData = JSON.parse(localStorage.getItem('progress2'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido2');
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

function updateGlobalProgress2() {
    const completedButtons = document.querySelectorAll('.btn-concluido2.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido2').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text2'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring2'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container2'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal2(); // Função específica para a página 2
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal2() {
    const modal = document.getElementById('congratulations-modal2'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal2() {
    const modal = document.getElementById('congratulations-modal2'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
