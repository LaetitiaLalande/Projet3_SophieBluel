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
            iconTrash.classList.add("fa-regular", "fa-trash-can", "fa-sm");
            
            const iconArrows = document.createElement("icon");
            iconArrows.classList.add("fa-solid", "fa-arrows-up-down-left-right", "fa-sm");

            const titreElement = document.createElement("figcaption");
            titreElement.innerText = "éditer";

            // rattachement des balises à la class .galleryModal
            galleryModal.appendChild(projectElement);
            projectElement.appendChild(imageElement);
            projectElement.appendChild(iconTrash);
            galleryModal.appendChild(iconArrows);
            projectElement.appendChild(titreElement);


            // suppression des travaux avec requete DELETE
            iconTrash.addEventListener("click", deleteProject)
            const id=project.id;
                        
            function deleteProject() {
    
                fetch(`http://localhost:5678/api/works/${id}`, {
                    method: 'DELETE',
                    headers: {
                        accept: "*/*",
                        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
                    }
                })
                    .then(response => {
                        if (response.ok) {
                        console.log('Ressource supprimée avec succès');
                    } else {
                        console.log('Erreur lors de la suppression de la ressource');
                    }
                    })
                    .catch(error => console.log(error));
            }
        }
    })


// Déclenchement de la modale 1

const modalContainer = document.querySelector(".modalContainer");
const btnModalTrigger = document.querySelectorAll(".modalTrigger");

// fonction qui fait apparaitre/disparaitre la modale
function toggleModalContainer() {
    modalContainer.classList.toggle("active");
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex"
}

// evenement au clique qui déclenche la modale
btnModalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModalContainer))


// Evenement au clique de la modale 2

const modalGalleryContent = document.querySelector(".modalGalleryContent");
const modalAddPhoto = document.querySelector(".modalAddPhoto");
const btnPhotoAdd = document.querySelector(".btnPhotoAdd");
const btnBackGallery = document.querySelector(".btnBackGallery");

btnPhotoAdd.addEventListener("click", () => {
    modalAddPhoto.style.display = "flex";
    modalGalleryContent.style.display = "none";
})

btnBackGallery.addEventListener("click", () => {
    modalAddPhoto.style.display = "none";
    modalGalleryContent.style.display = "flex";
})



// ajout de projet avec requete POST


// Créer un nouvel objet FormData
// const formData = new FormData();


// fetch('http://localhost:5678/api/works', {
//     // methode utilisée
//     method: 'POST',
//     headers: {
//         Authorization: `Bearer ${token}`,
//         accept: 'application/json',
        
//     },
//     // ce qui va etre créer en json
//     body: formData
// })
//     // conversion au format json
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch(error => console.log(error));
