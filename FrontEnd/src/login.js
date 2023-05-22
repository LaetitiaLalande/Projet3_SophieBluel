const urlApi = "http://localhost:5678/api/";
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const form = document.getElementById("form");

// evenement au click du bouton se connecter
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // requete POST qui permet d'envoyer les données du formulaire
    fetch(`${urlApi}users/login`, {
        method: "POST",
        headers: {
            // format envoyé
            Accept: "application/json",
            // format accepté
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
                // stockage dans la sessionStorage du token d'authentification
                window.sessionStorage.setItem("token", data.token);
            } else {
                // message d'Erreur dans l’identifiant ou le mot de passe
                const alertError = document.createElement('div');
                alertError.textContent = "Erreur dans l’identifiant et/ou le mot de passe";
                alertError.style.color = 'red';
                form.parentElement.insertBefore(alertError, form);
                // disparition du message après 5sec
                setTimeout(() => {
                    alertError.remove();
                }, 5000);
            }
        })
        // gérer les erreurs de la promesse-affiche l'erreur dans la console du navigateur.
        .catch(error => console.log(error));
});


