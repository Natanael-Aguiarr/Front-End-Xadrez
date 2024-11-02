$(document).ready(function () {
  // Carrega o menu a partir do arquivo "menu.html" e aplica os eventos após o carregamento
  $("#menu-container").load("menu.html", function () {
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

      // Alterna os dropdowns no mobile
      document
        .querySelectorAll(".nav__item--dropdown > .nav__link")
        .forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();

            // Alterna o estado de expansão do item de dropdown
            const expanded = link.getAttribute("aria-expanded") === "true";
            link.setAttribute("aria-expanded", !expanded);

            // Alterna a visibilidade do dropdown específico
            const dropdownMenu = link.nextElementSibling;
            if (dropdownMenu) {
              dropdownMenu.style.display = expanded ? "none" : "block";
            }

            // Esconde outros dropdowns ao abrir um
            document
              .querySelectorAll(".nav__item--dropdown > .nav__link")
              .forEach((otherLink) => {
                if (otherLink !== link) {
                  otherLink.setAttribute("aria-expanded", false);
                  if (otherLink.nextElementSibling) {
                    otherLink.nextElementSibling.style.display = "none";
                  }
                }
              });
          });
        });
    } else {
      console.error(
        "Menu button or nav links not found in the DOM after loading menu.html."
      );
    }
  });
});
