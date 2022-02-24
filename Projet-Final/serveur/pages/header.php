<?php
session_start();
?>
<nav class="navbar navbar-expand-lg navbar-light navbar-custom">
    <div class="container-fluid">


        <!-- <a class="navbar-brand text-color" href="index.php"><img src=''>Logo</a> -->
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"> -->

        <img class="logoNav" src='Projet-Final/client/public/images/logoFinale.png' onclick="loadPageAccueil();">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">

            <span class="navbar-toggler-icon"></span>
        </button>


        <div class="collapse navbar-collapse itemsMobileVersion" id="navbarNavAltMarkup">

            <?php
            if (isset($_SESSION['membre'])) {

                echo '<button type="button" ' . 'onclick="loadMembre(`pageMembre`,' . $_SESSION['membre'] . '); clearInputSearch();"' . ' class="btn btn-light buttonNav">Mon Profil</button>
                <input type="hidden" id="typePage" value="' . $_SESSION['membre'] . '">  
                <div id="divAuthentification">
                <button type="button" class="btn btn-light buttonNav" onclick="deconnexion()">Déconnecter</button>
                </div>';
            }

            if (isset($_SESSION['admin'])) {

                echo '<button type="button" onclick="loadPageAdmin(); clearInputSearch();" class="btn btn-light buttonNav">Liste de signalisation</button>
                <input type="hidden" id="typePage" value="admin">  
                <div id="divAuthentification">
                <button type="button" class="btn btn-light buttonNav" onclick="deconnexion()">Déconnecter</button>
                </div>';
            }

            if (!isset($_SESSION['membre']) && !isset($_SESSION['admin'])) {
                echo ' <div id="divAuthentification"> 
                <input type="hidden" id="typePage" value="visiteur">           
                <button type="button" class="btn btn-light buttonNav" data-bs-toggle="modal" data-bs-target="#modalInscription">Inscription</button>
                <button type="button" class="btn btn-light buttonNav" data-bs-toggle="modal" data-bs-target="#modalConnexion">Connexion</button>
                </div> ';
            }
            ?>
        </div>


</nav>


<header class="titreDuSite"><span class="premiereLettre">F</span>oruban</header>

<form id='searchBarForm'>
    <input id='searchBar' type='text' placeholder="Search...">
</form>