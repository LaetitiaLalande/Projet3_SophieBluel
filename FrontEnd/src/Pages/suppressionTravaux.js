// recuperation du token d'authentification
const token = window.sessionStorage.getItem("token");

// fonction asynchrone de suppression des travaux 
export async function deleteProject(e) { // exportation de la fonction vers le fichier utils/modal.js pour etre affectée au clic de "iconTrash"
    e.preventDefault();
    const id = e.target.id;// recherche l'id sur lequel le clic a été effectué

    // requete DELETE pour supprimer les travaux
    const response = await fetch(`${urlApi}works/${id}`, {
        method: 'DELETE',
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`
        }
    })
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
}