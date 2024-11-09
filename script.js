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
	} else {
		button.classList.add('completed');
		button.textContent = 'Concluído';
	}
  
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
  }
  
