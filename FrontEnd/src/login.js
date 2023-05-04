const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

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
                window.location.href = 'index.html';
                // window.localStorage.setItem(data, loginEmail.value, loginPassword.value);
            } else {
                alert("Email et/ou mot de passe incorrect(s)");
            }
        })
        .catch(error => alert(error));
});
