<?php
session_start();
?>
<nav class="navbar navbar-expand-lg navbar-light navbar-custom">
    <div class="container-fluid">

        <a class="navbar-brand text-color" href="index.php"><img src=''>Logo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">

            <a class="navbar-brand text-color" href="index.php"><img class="logoNav" src='Projet-Final/client/public/images/logoFinale.png'></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">

                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse itemsMobileVersion" id="navbarNavAltMarkup">

                <?php
                if (isset($_SESSION['membre'])) {
                    echo '<button type="button" class="btn btn-light buttonNav">Mon Profil</button>
                <div id="divAuthentification">
                <button type="button" class="btn btn-light buttonNav" onclick="deconnexion()">Déconnecter</button>
                </div>';
                }

                if (!isset($_SESSION['membre']) && !isset($_SESSION['admin'])) {
                    echo ' <div id="divAuthentification">            
                <button type="button" class="btn btn-light buttonNav" data-bs-toggle="modal" data-bs-target="#modalInscription">Inscription</button>
                <button type="button" class="btn btn-light buttonNav" data-bs-toggle="modal" data-bs-target="#modalConnexion">Connexion</button>
                </div> ';
                }
                ?>

            </div>
    </div>
</nav>


<header class="titreDuSite"><span class="premiereLettre">F</span>oruban</header>

<form id='searchBarForm'>
    <input id='searchBar' type='text' placeholder="Search...">
</form>