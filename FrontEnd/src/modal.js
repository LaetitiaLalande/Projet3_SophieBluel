fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(modalProjects => {

        for (let i = 0; i < modalProjects.length; i++) {

            // creation de la const pour 1 projet
            const category = modalProjects[i];

            // recupération de la class qui accueillera les projets
            const galleryModal = document.querySelector(".galleryModal");

            // creation de la fiche dédiée à un projet
            const categoryElement = document.createElement("figure");

            // creation des éléments qui integrera la fiche
            const imageElement = document.createElement("img");
            imageElement.src = category.imageUrl;
            const titreElement = document.createElement("figcaption");
            titreElement.innerText = "éditer";

            // rattachement des balises a la class .gallery
            galleryModal.appendChild(categoryElement);
            categoryElement.appendChild(imageElement);
            categoryElement.appendChild(titreElement);
        }
    })
