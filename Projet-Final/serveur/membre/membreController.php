<?php 
require_once("membre.php");
require_once("membreDAOImpl.php");
//Controller
$action = $_POST['action'];
switch ($action) {
    case "enregistrerMembre":
        enregistrerMembre();
        break;
    case "modifierProfil":
        modifierProfil();
        break;
    case "connexion":
        connexion();
        break;
    case "deconnexion":
        deconnexion();
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
    case "profil":
        profil();
        break;
    case "tableLocation":
        tableLocations();
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
    $imageProfil = "defaultProfil.png";
    $membrePremium = 0;
    $dateFinAbonnement = "";
    $password = $_POST['password'];
    $role = "M";
  
    $unMembre = new Membre(0, $prenom, $nom, $courriel, $numeroTelephone, $description, $actif, $prive, $imageProfil, $membrePremium, $dateFinAbonnement, $password, $role);
    $dao = new MembreDaoImpl();
    print_r($unMembre);
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

echo json_encode($tabRes);
