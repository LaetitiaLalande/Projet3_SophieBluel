// recuperation du token d'authentification
const token = window.sessionStorage.getItem("token");

// selection du dom des class "modeEdit"
const modeEdit = document.querySelectorAll('.modeEdit');

function modeEdition() { // fonction si token est true alors affichage du mode admin
    if (token) {
        document.getElementById("loginBtn").innerText = "logout"; // changement du texte pour le bouton login
        document.querySelector(".filters").style.display = "none"; // disparition de la barre de filtre
        // boucle qui parcourt tous les éléments dont la class est "modeEdit" et effectue la bascule de style class "active"
        for (let i = 0; i < modeEdit.length; i++) {
            modeEdit[i].classList.toggle('active');
        }
    }
}
modeEdition();

// efface le token dans la sessionStorage lors du clique sur logout
loginBtn.addEventListener("click", () => {
    window.sessionStorage.removeItem("token");
});


