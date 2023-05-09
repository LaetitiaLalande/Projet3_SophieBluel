const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const form = document.getElementById("form");

// evenement au click du bouton se connecter
form.addEventListener("submit", (e) => {

    // empeche la soumission du formulaire en cas d'erreur
    e.preventDefault();

    // requete POST qui permet d'envoyer les données du formulaire
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: loginEmail.value,
            password: loginPassword.value,
        }),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.userId && data.token) {
                // retour vers la page d'accueil si authentification reussie
                window.location.href = 'index.html';
                // stockage dans le localstorage du token d'authentification
                window.localStorage.setItem("token", data.token);
            } else {
                alert("Erreur dans l’identifiant ou le mot de passe");
            }
        })
        // erreur en cas de promesse rejetée
        .catch(error => alert(error));
});


