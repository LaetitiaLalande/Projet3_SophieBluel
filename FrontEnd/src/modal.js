// genere la galerie Modale
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


// Déclenchement de la modale 1

const modalContainer = document.querySelector(".modalContainer");
const btnModalTrigger = document.querySelectorAll(".modalTrigger");

// fonction qui fait apparaitre/disparaitre la modale
function toggleModal() {
    modalContainer.classList.toggle("active");
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex";
}

// evenement au clique qui déclenche la modale
btnModalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModal))

// Creation de la modale 2

const modalGalleryContent = document.querySelector(".modalGalleryContent");
const modalAddPhoto = document.querySelector(".modalAddPhoto");
const btnPhotoAdd = document.querySelector(".btnPhotoAdd");

btnPhotoAdd.addEventListener("click", () => {
    modalAddPhoto.style.display="flex";
    modalGalleryContent.style.display="none"
})


// const modalContent


// suppression des travaux


// creer un evenement au click qui supprime les travaux qd on clik en reprenant la ftcion deleteProject


// const id = document.querySelector(".btnPhotoAdd");

// // creer une constY avcec project a supprimer avce parseInt target

// function deleteProject(e) {
//     fetch(`http://localhost:5678/api/works/${y}`, {
//         method: 'DELETE',
//         headers: {
//             Authorization: `Bearer ${token}`, // Ajoutez l'en-tête d'autorisation si nécessaire
//             'Content-Type': 'application/json' // Ajoutez l'en-tête de type de contenu si nécessaire
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Erreur lors de la suppression de la ressource'); // Gère les erreurs de la réponse
//             }
//             console.log('Ressource supprimée avec succès');
//         })
//         .catch(error => console.log(error));
// }


// ajout de projet


// fetch('http://localhost:5678/api/works', {
//     // methode utilisée
//     method: 'POST',
//     headers: {
//         Authorization: 'Bearer ${localStorage.getItem("token")}',
//         Accept: 'application/json',
//     },
//     // ce qui va etre créer en json
//     body: JSON.stringify({
//         imageUrl: "strxbvg.png",
//         title: "vcbng",
//         categoryId: "ssving",
//     }),
// })
//     // conversion au format json
//     .then((response) => response.json())
//     .then((data) => console.log(data))
