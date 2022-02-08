<?php
session_start();
require_once("membre.php");
require_once("membreDAOImpl.php");
//Controller
$tabRes = array();
$action = $_POST['action'];
switch ($action) {
    case "enregistrerMembre": //done
        enregistrerMembre();
        break;
    case "connexion": //done
        connexion();
        break;
    case "deconnexion": //done
        deconnexion();
        break;
    case "getMembre":
        getMembre();
        break;
    case "modifierMembre":
        modifierMembre();
        break;
    case "tableMembres":
        tableMembres();
        break;
    case "activerMembre":
        activerMembre();
        break;
    case "desactiverMembre":
        desactiverMembre();
        break;
    case "tableHistoriqueLocation":
        tableHistoriquesLocation();
        break;
    case "tableLocation":
        tableLocations();
        break;
    case "navigation":
        navigation();
        break;
}

//Enregistre un membre
function enregistrerMembre()
{
    global $tabRes;
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $courriel = $_POST['courriel'];
    $numeroTelephone = $_POST['numeroTelephone'];
    $description = $_POST['description'];
    $actif = 1;
    $prive = 0;
    $imageProfil = "images-profil/defaultProfil.png";
    $membrePremium = 0;
    $dateFinAbonnement = "";
    $password = $_POST['password'];
    $role = "M";

    $unMembre = new Membre(0, $prenom, $nom, $courriel, $numeroTelephone, $description, $actif, $prive, $imageProfil, $membrePremium, $dateFinAbonnement, $password, $role);
    $dao = new MembreDaoImpl();

    // couriel deja utilisé existant
    if ($dao->verifierCourriel($courriel)) {

        $tabRes['action'] = "enregistrerMembre";
        $tabRes['msg'] = "Le courriel $courriel est déjà utilisé. Choisissez un autre courriel.";
    } else {
        //enregistre le membre
        $dao->enregistrerMembre($unMembre);
        $idMembre = $dao->getLastId();
        $_SESSION['membre'] = $idMembre;
        $tabRes['idMembre'] = $idMembre;
    }
}

//Connexion d'un membre
function connexion()
{
    global $tabRes;
    $courriel = $_POST['email'];
    $password = $_POST['password'];

    $tabRes['action'] = "connexion";
    $dao = new MembreDaoImpl();

    //Connecter le membre
    $tabRes['msg'] = $dao->connecter($courriel, $password);
}

//deconnexion d'un membre
function deconnexion()
{
    session_unset();
    session_destroy();
}

// get les info d'un membre
function getMembre()
{
    global $tabRes;
    $id = $_POST['id'];

    $tabRes['action'] = "getMembre";
    $dao = new MembreDaoImpl();

    $tabRes['membre'] = $dao->getMembre($id);
}

function modifierMembre()
{
    global $tabRes;
    $id = $_POST['idMembreEdit'];
    $nom = $_POST['nomEdit'];
    $prenom = $_POST['prenomEdit'];
    $courriel = $_POST['courrielEdit'];
    $numeroTelephone = $_POST['numeroTelephoneEdit'];
    $description = $_POST['descriptionEdit'];
    $actif = 1;
    $prive = 0;
    $imageProfil = "images-profil/defaultProfil.png";
    $membrePremium = 0;
    $dateFinAbonnement = "";
    $password = $_POST['passwordEdit'];
    $role = "M";


    $unMembre = new Membre($id, $prenom, $nom, $courriel, $numeroTelephone, $description, $actif, $prive, $imageProfil, $membrePremium, $dateFinAbonnement, $password, $role);
    $dao = new MembreDaoImpl();

    // couriel deja utilisé existant
    if ($dao->verifierCourrielModifier($courriel, $id)) {

        $tabRes['action'] = "modifierProfil";
        $tabRes['msg'] = "Le courriel $courriel est déjà utilisé. Choisissez un autre courriel.";
    } else {
        //modifie le membre
        $dao->modifierMembre($unMembre, "images-profil");
        $tabRes['msg'] = "Profil à jour";
    }
}

//table de tous les membre
function tableMembres()
{
    global $tabRes;
    $par = $_POST['par'];
    $valeurPar = strtolower(trim($_POST['valeurPar']));

    $tabRes['action'] = "tableMembres";
    $dao = new MembreDaoImpl();
    //retourne tout les membre
    $tabRes['listeMembres'] = $dao->getAllMembreRecherche($par, $valeurPar);
}



echo json_encode($tabRes);