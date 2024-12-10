$(document).ready(function() {
	// Carrega o menu a partir do arquivo "menu.html" e aplica os eventos após o carregamento
	$("#menu-container").load("menu.html", function() {
		const menuButton = document.getElementById("menu-btn");
		const navLinks = document.getElementById("nav-links");

		if (menuButton && navLinks) {
			// Alterna a visibilidade do menu mobile ao clicar no botão de burger menu
			menuButton.addEventListener("click", () => {
				const expanded = menuButton.getAttribute("aria-expanded") === "true";
				menuButton.setAttribute("aria-expanded", !expanded);
				navLinks.setAttribute("aria-expanded", !expanded);

				// Alterna a classe `open` para transformar o ícone em "X"
				menuButton.querySelector(".menu-btn-icon").classList.toggle("open");
			});

			// Função para verificar a largura da janela e adicionar eventos ao dropdown apenas no mobile
			function enableDropdownOnMobile() {
				const isMobile = window.innerWidth < 768;

				document.querySelectorAll(".nav__item--dropdown > .nav__link").forEach((link) => {
					// Remove qualquer listener anterior e define o comportamento apenas no mobile
					const newLink = link.cloneNode(true);
					link.parentNode.replaceChild(newLink, link);

					if (isMobile) {
						newLink.addEventListener("click", (e) => {
							e.preventDefault();

							// Alterna o estado de expansão do item de dropdown
							const expanded = newLink.getAttribute("aria-expanded") === "true";
							newLink.setAttribute("aria-expanded", !expanded);

							// Alterna a visibilidade do dropdown específico
							const dropdownMenu = newLink.nextElementSibling;
							if (dropdownMenu) {
								dropdownMenu.style.display = expanded ? "none" : "block";
							}

							// Esconde outros dropdowns ao abrir um
							document.querySelectorAll(".nav__item--dropdown > .nav__link").forEach((otherLink) => {
								if (otherLink !== newLink) {
									otherLink.setAttribute("aria-expanded", false);
									if (otherLink.nextElementSibling) {
										otherLink.nextElementSibling.style.display = "none";
									}
								}
							});
						});
					}
				});
			}

			// Inicializa o evento de dropdown e o atualiza em caso de redimensionamento da janela
			enableDropdownOnMobile();
			window.addEventListener("resize", enableDropdownOnMobile);
		} else {
			console.error("Menu button or nav links not found in the DOM after loading menu.html.");
		}
	});
});



document.addEventListener('DOMContentLoaded', () => {
	// Carrega o progresso salvo ao carregar a página
	loadProgress();
	updateGlobalProgress(); // Atualiza o progresso com base no estado salvo
  });
  
  function markCompleted(button) {
	// Alterna a classe e o texto do botão
	if (button.classList.contains('completed')) {
		button.classList.remove('completed');
		button.textContent = 'Concluir';
		 // Toca o som de marcação de conclusão
		 const markSound = document.getElementById('mark-sound');
		 markSound.play();
	} else {
		button.classList.add('completed');
		button.textContent = 'Concluído';
	}
	 // Toca o som de marcação de conclusão
	 const markSound = document.getElementById('mark-sound');
	 markSound.play();
	
  
	// Salva o progresso atual
	saveProgress();
	updateGlobalProgress();
  }
  
  function saveProgress() {
	// Salva o estado de cada botão (completo ou não) no localStorage
	const buttons = document.querySelectorAll('.btn-concluido');
	const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
	localStorage.setItem('progress', JSON.stringify(progressData));
  }
  
  function loadProgress() {
	// Recupera o progresso do localStorage e aplica aos botões
	const progressData = JSON.parse(localStorage.getItem('progress'));
  
	if (progressData) {
		const buttons = document.querySelectorAll('.btn-concluido');
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
  
  function updateGlobalProgress() {
	const completedButtons = document.querySelectorAll('.btn-concluido.completed');
	const totalButtons = document.querySelectorAll('.btn-concluido').length;
  
	// Calcula a porcentagem de progresso
	const percentage = Math.round((completedButtons.length / totalButtons) * 100);
  
	// Atualiza o texto de porcentagem
	const percentageText = document.getElementById('percentage-text');
	percentageText.textContent = `${percentage}%`;
  
	// Atualiza o círculo de progresso
	const circle = document.querySelector('.progress-ring');
	const radius = circle.r.baseVal.value;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percentage / 100) * circumference;
  
	circle.style.strokeDashoffset = offset;
	 // Verifica se o progresso atingiu 100%
	 const circleContainer = document.querySelector('.circle-container');
	 

	 const sound = document.getElementById('completion-sound');
	 if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal(); // Exibe o modal corretamente
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}
  

// Carregar preferências do usuário ao abrir o site
window.onload = function () {
    // Carregar o tema salvo do localStorage ou definir o modo claro como padrão
    const mode = localStorage.getItem('mode') || 'light-mode';
    document.body.classList.add(mode); // Adicionar o tema ao body
    updateThemeIcon(); // Atualizar o ícone do tema com base no modo carregado
};

// Alternar entre modo claro e escuro
function toggleMode() {
    // Alternar entre as classes de modo claro e escuro
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    // Salvar a preferência de tema no localStorage
    const mode = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('mode', mode);

    // Atualizar o ícone do tema
    updateThemeIcon();
}

// Atualizar o ícone do tema
function updateThemeIcon() {
    const themeIcon = document.getElementById('themeIcon');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '🌜'; // Ícone de Lua para o tema escuro
    } else {
        themeIcon.textContent = '🌞'; // Ícone de Sol para o tema claro
    }
}

// Seleciona o botão de alternância de tema
const themeToggleBtn = document.getElementById("theme-toggle");

// Adiciona o evento de clique para alternar o tema
themeToggleBtn.addEventListener("click", toggleMode);

  
  
  function showCelebration() {
    const container = document.getElementById("celebration-container");

    // Adicionar balões
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.backgroundColor = getRandomColor();
        container.appendChild(balloon);
    }

    // Adicionar confetes
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.setProperty("--confetti-color", getRandomColor());
        container.appendChild(confetti);
    }

    // Limpar após 5 segundos
    setTimeout(() => {
        container.innerHTML = "";
    }, 5000);
}

// Gerar cores aleatórias
function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#F4FF33", "#FF33E4"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Chamar ao completar
function showCongratulationsModal() {
    const modal = document.getElementById("congratulations-modal");
    modal.style.display = "flex"; // Torna o modal visível
    document.body.classList.add("modal-open"); // Bloqueia interações fora do modal

    showCelebration(); // Mostra balões e confetes

    const sound = document.getElementById("completion-sound");
    sound.play();
}
  
function closeModal() {
    const modal = document.getElementById("congratulations-modal");
    modal.style.display = "none"; // Esconde o modal
    document.body.classList.remove("modal-open"); // Libera as interações fora do modal
}









