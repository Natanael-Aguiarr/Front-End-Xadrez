document.addEventListener('DOMContentLoaded', () => {
    loadProgress15();
    updateGlobalProgress15();
});

function markCompleted15(button) {
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

    saveProgress15();
    updateGlobalProgress15();
}

function saveProgress15() {
    const buttons = document.querySelectorAll('.btn-concluido15'); // Use a nova classe específica da página 15
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress15', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress15() {
    const progressData = JSON.parse(localStorage.getItem('progress15'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido15');
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

function updateGlobalProgress15() {
    const completedButtons = document.querySelectorAll('.btn-concluido15.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido15').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text15'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring15'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container15'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal15(); // Função específica para a página 15
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal15() {
    const modal = document.getElementById('congratulations-modal15'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal15() {
    const modal = document.getElementById('congratulations-modal15'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
