// recuperation du token
const token = window.sessionStorage.getItem("token");

// creation du mode Edition en cas d'authentification réussi 
const modeEdit = document.querySelectorAll('.modeEdit');

function modeEdition() {
    if (token) {
        document.getElementById("loginBtn").innerText = "logout";
        document.querySelector(".filters").style.display = "none";
        // parcourt tous les éléments modeEdit et effectue le toggle
        for (let i = 0; i < modeEdit.length; i++) {
            modeEdit[i].classList.toggle('active');
        }
    }
}
modeEdition();

// deconnexion de la session lors du clique sur logout
loginBtn.addEventListener("click", () => {
    window.sessionStorage.removeItem("token");
});


