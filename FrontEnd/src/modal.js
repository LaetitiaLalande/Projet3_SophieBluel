fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(modalProjects => {

        for (let i = 0; i < modalProjects.length; i++) {

            // creation de la const pour 1 projet
            const project = modalProjects[i];

            // recupération de la class qui accueillera les projets
            const galleryModal = document.querySelector(".galleryModal");

            // creation de la fiche dédiée à un projet
            const projectElement = document.createElement("figure");

            // creation des éléments qui integrera la fiche
            const imageElement = document.createElement("img");
            imageElement.src = project.imageUrl;

            const iconTrash = document.createElement("icon");
            iconTrash.className = "fa-regular fa-trash-can fa-sm";

            const iconArrows = document.createElement("icon");
            iconArrows.className = "fa-solid fa-arrows-up-down-left-right fa-sm";

            const titreElement = document.createElement("figcaption");
            titreElement.innerText = "éditer";

            // rattachement des balises à la class .galleryModal
            galleryModal.appendChild(projectElement);
            projectElement.appendChild(imageElement);
            projectElement.appendChild(iconTrash);
            galleryModal.appendChild(iconArrows);
            projectElement.appendChild(titreElement);
        }

    })


// Déclenchement de la modale

const modalContainer = document.querySelector(".modalContainer");
const btnModalTrigger = document.querySelectorAll(".modalTrigger");

// fonction qui fait apparaitre ou disparaitre la modale
function toggleModal() {
    modalContainer.classList.toggle("active");
}

// evenement au clique qui déclenche la modale
btnModalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModal))



// Suppression de projet
