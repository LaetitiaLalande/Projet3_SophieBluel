fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((projets) => {

        for (let i = 0; i < projets.length; i++) {

            // creation de la const pour 1 projet
            const projet = projets[i];

            // recupération de la class qui accueillera les projets
            const gallery = document.querySelector(".gallery");

            // creation de la fiche dédiée à un projet
            const projetElement = document.createElement("figure");

            // creation des éléments qui integrera la fiche
            const imageElement = document.createElement("img");
            imageElement.src = projet.imageUrl;
            const titreElement = document.createElement("figcaption");
            titreElement.innerText = projet.title;

            // rattachement des balises a la class .gallery
            gallery.appendChild(projetElement);
            projetElement.appendChild(imageElement);
            projetElement.appendChild(titreElement);
        }
    })


