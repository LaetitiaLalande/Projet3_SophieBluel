fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((projects) => {

        for (let i = 0; i < projects.length; i++) {

            // creation de la const pour 1 projet
            const project = projects[i];

            // recupération de la class qui accueillera les projets
            const gallery = document.querySelector(".gallery");

            // creation de la fiche dédiée à un projet
            const projectElement = document.createElement("figure");

            // creation des éléments qui integrera la fiche
            const imageElement = document.createElement("img");
            imageElement.src = project.imageUrl;
            const titreElement = document.createElement("figcaption");
            titreElement.innerText = project.title;

            // rattachement des balises a la class .gallery
            gallery.appendChild(projectElement);
            projectElement.appendChild(imageElement);
            projectElement.appendChild(titreElement);

        }
    })

