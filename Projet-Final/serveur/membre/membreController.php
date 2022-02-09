<?php
session_start();
require_once("membre.php");
require_once("membreDAOImpl.php");
//Controller
$tabRes = array();
$tabRes['action'] = null;
$dao = new MembreDaoImpl();
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
    case "loadMembre":
        loadPageMembre();
        break;

    case "loadPageAccueil":
        loadPageAccueil();
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

    $unMembre = new Membre(0, $nom, $prenom, $courriel, $numeroTelephone, $description, $actif, $prive, $imageProfil, $membrePremium, $dateFinAbonnement, $password, $role);
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
    global $dao;
    $courriel = $_POST['email'];
    $password = $_POST['password'];

    $tabRes['action'] = "connexion";

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


function modifierMembre(){
    global $tabRes;
    global $dao;
    $id = $_POST['idMembre'];
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
    global $dao;
    $par = $_POST['par'];
    $valeurPar = strtolower(trim($_POST['valeurPar']));
    $tabRes['action'] = "tableMembres";
    //retourne tout les membre
    $tabRes['listeMembres'] = $dao->getAllMembreRecherche($par, $valeurPar);
}

// FUNCTIONS LOAD PAGES

function loadPageMembre(){

    global $tabRes;
    global $dao;

    $page= $_POST['page'];
    $idMembre = $_POST['idMembre'];

    if($tabRes['action'] == null){
        $membre = $dao->getMembre($idMembre);
        
        $tabRes['membre'] = array("id"=>$membre->getId(), "nom"=> $membre->getNom(), "prenom"=> $membre->getPrenom(),
        "courriel"=> $membre->getCourriel(), "numeroTelephone"=> $membre->getNumeroTelephone(),
        "description"=> $membre->getDescription(),"actif"=> $membre->getActif(), "prive"=> $membre->getPrive(), "imageProfil"=> $membre->getImageProfil(),
        "membrePremium"=> $membre->getMembrePremium(), "dateFinAbonnement"=> $membre->getDateFinAbonnement(),
        "motDePasse"=> $membre->getMotDePasse(), "role"=> $membre->getRole());
        switch($page){
           case 'pageMembre': 
            // $daoProjet = new projetDAOImpl();
            $tab['listProjet'] = null ;//$daoProjet -> ;break;
            $tabRes['action'] = $page; break;


           case 'pageMembreEdit': $tabRes['action'] = $page;break;
           
        }
        
    }
}

function loadPageAccueil(){

    global $tabRes;

    if($tabRes['action'] == null){
        $tabRes['action'] = 'pageAccueil';
    }
}



echo json_encode($tabRes);