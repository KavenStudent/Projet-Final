<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foruban</title>
    <?php
    require_once('Projet-Final/serveur/pages/references.html');
    ?>
</head>

<body>

    <?php
        require_once('Projet-Final/serveur/pages/header.php');


        require_once('Projet-Final/serveur/pages/recherche.php');


    ?>
    
    <div id='contenu'></div>

    <div id="snackbar"></div>
    <div class="lds-ring hidden"><div></div><div></div><div></div><div></div></div>
    <?php

    require_once('Projet-Final/serveur/pages/footer.html');
    require_once('Projet-Final/serveur/pages/modals.php');
    ?>
</body>

</html>