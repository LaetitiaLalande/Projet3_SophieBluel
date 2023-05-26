const urlApi = "http://localhost:5678/api/";

// fonction qui permet d'ajouter des projets 
async function addProject(e) {
    e.preventDefault();

    // recuperation de l'image , catégorie et titre  
    const image = uploadPhoto.files[0]; // .files[0] récupère le premier fichier sélectionné à partir de du bouton HTML 'ulpoad' (déjà déclaré dans fichier .utils/modal.js)
    const title = document.getElementById("title").value;
    const category = document.getElementById('category').value;

    // Créer un nouvel objet FormData
    const formData = new FormData(); //objet FormData qui créé, des données 'clé'-valeur du formulaire, à envoyer avec vers l'url/POST
    formData.append('title', title); //méthode 'append' qui ajoute, 1 clé 'title' et sa valeur , à l'objet FormData.
    formData.append('image', image);
    formData.append('category', category);

    const response = await fetch(`${urlApi}works`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
        },
        body: formData
    })
    if (response.ok) {
        alert("projet ajouté avec succès");
    } else {
        alert("envoi echoué");
    }
}

const formAdd = document.querySelector('.formAdd');

// evenement au clic avce fonction d'ajout de projet 
formAdd.addEventListener("submit", addProject)
