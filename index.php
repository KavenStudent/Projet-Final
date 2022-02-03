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

<body onLoad="initialiser(<?php echo "'" . $msg . "'" ?>);">
    <?php
        require_once('Projet-Final/serveur/pages/header.php');
        require_once('Projet-Final/serveur/pages/toasts.html');
        require_once('Projet-Final/serveur/pages/frontPage.php')
    ?>


    <?php
        require_once('Projet-Final/serveur/pages/modals.php');
    ?>
</body>

</html>