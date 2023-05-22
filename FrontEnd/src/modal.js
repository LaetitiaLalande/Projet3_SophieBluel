// recuperation du JWT
const token = window.sessionStorage.getItem("token");
const urlApi = "http://localhost:5678/api/";

// appel à l'api et genere la galerie Modale grâce à la fonction genererModalGallery
fetch(`${urlApi}works`)
    .then(response => response.json())
    .then(data => genererModalGallery(data))

// fonction qui génère la galerie modale
function genererModalGallery(modalProjects) {
    for (let i = 0; i < modalProjects.length; i++) {

        // creation de la const pour 1 projet
        const project = modalProjects[i];

        // recupération de la class qui accueillera les projets
        const galleryModal = document.querySelector(".galleryModal");

        // creation de la fiche dédiée à un projet
        const projectElement = document.createElement("figure");
        projectElement.setAttribute('id', project.id)

        // creation des éléments qui integrera la fiche
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        // creation de l'icone poubelle/suppression
        const iconTrash = document.createElement("icon");
        iconTrash.classList.add("fa-regular", "fa-trash-can", "fa-sm");

        // affectation de l'id à chaque icone poubelle
        iconTrash.setAttribute('id', project.id)

        // suppression des travaux au clic de l'icone
        iconTrash.addEventListener("click", deleteProject)

        // creation de la fleche de déplacement (inactive)
        const iconArrows = document.createElement("icon");
        iconArrows.classList.add("fa-solid", "fa-arrows-up-down-left-right", "fa-sm");

        const titreElement = document.createElement("figcaption");
        titreElement.innerText = "éditer";

        // rattachement des balises à la class .galleryModal et à l'element projet
        galleryModal.appendChild(projectElement);
        projectElement.appendChild(imageElement);
        projectElement.appendChild(iconTrash);
        galleryModal.appendChild(iconArrows);
        projectElement.appendChild(titreElement);
    }
}

// suppression des travaux 

function deleteProject(e) {
    e.preventDefault();
    // // recherche l'id sur lequel le clic a été effectué
    const id = e.target.id;
    fetch(`${urlApi}works/${id}`, {
        method: 'DELETE',
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                const question = confirm("Etes-vous sûr de vouloir supprimer le projet ?")
                if (question === true) {
                    console.log('Ressource supprimée avec succès');
                } else {
                    console.log("Confirmation annulée !");
                }
            } else {
                console.log('Erreur lors de la suppression de la ressource');
            }
        })
        .catch(error => console.log(error));
}



// ajout de projet avec requete POST

// fonction de Prévisualisation de l'image avant l'upload
const showImage = document.getElementById("showImage");
const preview = document.querySelector(".preview");

function previewImage(event) {
    // si image selectionnée
    if (event.target.files.length > 0) {
        const src = URL.createObjectURL(event.target.files[0]);
        showImage.src = src;
        // affichage du bloc image 
        showImage.style.display = "block";
        // disparition du bloc icone + bouton + texte
        preview.style.display = "none";
    }
}

// Créer un nouvel objet FormData
const formData = new FormData();
const form = document.getElementById('formAjout');

function addProject(e) {
    e.preventDefault();
    fetch(`${urlApi}works`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': formData,
        },
        body: JSON.stringify(
            image = "string",
            title = "string",
            category = "string",
        )
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch(error => console.log(error));
}


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
    // filePreview.style.display = "none";
    // preview.style.display = "flex";
})

