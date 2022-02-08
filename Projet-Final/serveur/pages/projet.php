<div id='projetMainDiv' class="container">
    <div id='projetLeftDiv' class="container">
        <img src="Projet-Final/serveur/projet/thumbnail/defaultThumbnail.png" class="img-fluid, img-thumbnail"
            alt="...">
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">Télécharger</button>
            <?php
            if (isset($_SESSION['membre']))
                echo '<button class="btn btn-primary" type="button">Modifier le projet</button>';
            ?>
        </div>
    </div>
    <div id='projetRightDiv' class="container">
        <h1>Titre du projet</h1>

        <h5><span id="projetCreateurTitle">Createur: </span><a href="mon profil.page" id="projetCreateurContent"
                name="projetCreateurContent">Createur</a></h5>

        <ul id="projetParticipantDiv" name="projetParticipantDiv" class="list-inline"
            aria-label="Autres participants: ">
            <li class="list-inline-item">Joanie Birtz</li>
            <li class="list-inline-item"><a href="participant.page">Vimhoang Nguyen</a></li>
            <li class="list-inline-item">Patrick Al-Motlak</li>
            <li class="list-inline-item"><a href="participant.page">Sacha Robitaille</a></li>
            <li class="list-inline-item"><a href="participant.page">Kaven Ung</a></li>
        </ul>
        <p id="projetDescription" name="projetDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vestibulum non semper nibh. Integer dolor purus,
            porta ut fermentum sed, gravida eu dui. Duis cursus tempor quam, eu lobortis diam pretium eu. Sed ac
            dignissim justo, non consequat sapien. Quisque ornare ultrices tellus ac suscipit. Aliquam id risus
            tincidunt, lobortis felis nec, efficitur lorem. Nulla facilisi. Duis ac egestas dolor. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
            Vestibulum non semper nibh. Integer dolor purus,
            porta ut fermentum sed, gravida eu dui. Duis cursus tempor quam, eu lobortis diam pretium eu. Sed ac
            dignissim justo, non consequat sapien. Quisque ornare ultrices tellus ac suscipit. Aliquam id risus
            tincidunt, lobortis felis nec, efficitur lorem. Nulla facilisi. Duis ac egestas dolor.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
            Vestibulum non semper nibh. Integer dolor purus,
            porta ut fermentum sed, gravida eu dui. Duis cursus tempor quam, eu lobortis diam pretium eu. Sed ac
            dignissim justo, non consequat sapien. Quisque ornare ultrices tellus ac suscipit. Aliquam id risus
            tincidunt, lobortis felis nec, efficitur lorem. Nulla facilisi. Duis ac egestas dolor.</p>
        <ul id="projetTagsDiv" name="projetTagsDiv" class="list-inline" aria-label="Autres participants: ">
            <li class="list-inline-item"><a href="participant.page">Web</a></li>
            <li class="list-inline-item"><a href="participant.page">Portfolio</a></li>
            <li class="list-inline-item"><a href="participant.page">Recherche d'emploi</a></li>
        </ul>
        <a href="https://Lien externe.com">
            <p class="lead">https://Lien externe.com</p>
        </a>
        <div class="form-check form-switch">

            <?php
            if (isset($_SESSION['admin'])) {
                echo '<input class="form-check-input" type="checkbox" id="adminSwitchHideProject">
                <label class="form-check-label" for="flexSwitchCheckDefault">Cacher le projet de l\'utilisateur</label>';
            }
                
            ?>
        </div>

    </div>
</div>