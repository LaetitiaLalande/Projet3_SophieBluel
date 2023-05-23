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
    // requete DELETE pour supprimer les travaux
    fetch(`${urlApi}works/${id}`, {
        method: 'DELETE',
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                // si reponse ok demande confirmation de suppression 
                const question = confirm("Etes-vous sûr de vouloir supprimer le projet ?")
                if (question === true) {
                    // si client clique sur bouton valider 
                    console.log('Ressource supprimée avec succès');
                } else {
                    // sinon message si client clique sur bouton annuler
                    console.log("Confirmation annulée !");
                }
            } else {
                console.log('Erreur lors de la suppression de la ressource');
            }
        })
        .catch(error => console.log(error));
}


// fonction de Prévisualisation de l'image avant l'upload
const preview = document.querySelector(".preview");
const showImage = document.querySelector(".showImage")

function previewImage(e) {
    // condition si image selectionnée
    if (e.target.files.length > 0) {
        const src = URL.createObjectURL(e.target.files[0]);
        showImage.src = src;
        // affichage du bloc image 
        showImage.style.display = "block";
        // disparition du bloc icone + bouton + texte
        preview.style.display = "none";
    }
}

// Créer un nouvel objet FormData

async function addProject(e) {
    e.preventDefault();

    // recuperation de l'image , catégorie et titre  
    const uploadPhoto = document.getElementById("uploadPhoto");
    const image = uploadPhoto.files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById('category').value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('category', category);
    console.log(formData);

    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
        },
        body: formData
    })
    if (response.ok) {
        console.log("projet ajouté avec succès");
    } else {
        alert("envoi echoué");
    }
}

const formAdd = document.querySelector('.formAdd');
formAdd.addEventListener("submit", addProject)


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

