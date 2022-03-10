<?php
session_start();
require_once("membre.php");
require_once("membreDAOImpl.php");
require_once("../projet/projetDAOImpl.php");
//Controller
$tabRes = array();
$tabRes['action'] = null;
$dao = new MembreDaoImpl();
$action = $_POST['action'];
switch ($action) {
    case "enregistrerMembre":
        enregistrerMembre();
        break;
    case "connexion":
        connexion();
        break;
    case "deconnexion":
        deconnexion();
        break;
    case "modifierMembre":
        modifierMembre();
        break;
    case "tableMembres":
        tableMembres();
        break;
    case "loadMembre":
        loadPageMembre();
        break;
    case "loadPageAccueil":
        loadPageAccueil();
        break;
    case "loadPageAdmin":
        loadPageAdmin();
        break;
    case "loadAutrePageMembre":
        loadAutrePageMembre();
        break;
    case "loadPageRecherche":
        loadPageRecherche();
        break;
    case "ajouterSignalisation":
        ajouterSignalisation();
        break;
    case "adminCacherMembre":
        adminCacherMembre();
        break;
    case "devenirPremium":
        devenirPremium();
        break;
}

//Enregistre un membre
function enregistrerMembre()
{
    global $tabRes;
    global $dao;
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $courriel = $_POST['courriel'];
    $numeroTelephone = $_POST['numeroTelephone'];
    $description = $_POST['description'];
    $actif = 1;
    $prive = 0;
    $adminLock = 0;
    $imageProfil = "defaultProfil.png";
    $membrePremium = 0;
    $dateFinAbonnement = "";
    $password = $_POST['password'];
    $role = "M";

    $unMembre = new Membre(0, $prenom, $nom,  $courriel, $numeroTelephone, $description, $actif, $prive, $imageProfil, $membrePremium, $dateFinAbonnement, $password, $role, $adminLock);

    // couriel deja utilisé existant
    if ($dao->verifierCourriel($courriel)) {

        $tabRes['action'] = "enregistrerMembre";
        $tabRes['msg'] = "Le courriel $courriel est déjà utilisé. Choisissez un autre courriel.";
    } else {
        //enregistre le membre
        $dao->enregistrerMembre($unMembre);
        $idMembre = $dao->getLastMembreId();
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


function modifierMembre()
{
    global $tabRes;
    global $dao;
    $id = $_POST['idMembre'];
    $nom = $_POST['nomEdit'];
    $prenom = $_POST['prenomEdit'];
    $courriel = $_POST['courrielEdit'];
    $numeroTelephone = $_POST['numeroTelephoneEdit'];
    $description = $_POST['descriptionEdit'];
    $actif = 1;
    $adminLock = 0;
    $prive = (int) $_POST['profilPublic'];
    // $prive =  $_POST['isPublic'];
    $imageProfil = "";
    $membrePremium = 0;
    $dateFinAbonnement = "";
    $password = $_POST['passwordEdit'];
    $role = "M";

    $tabRes['test'] =  $prive;

    $unMembre = new Membre($id, $prenom, $nom, $courriel, $numeroTelephone, $description, $actif, $prive, $imageProfil, $membrePremium, $dateFinAbonnement, $password, $role, $adminLock);

    // couriel deja utilisé existant
    if ($dao->verifierCourrielModifier($courriel, $id)) {

        $tabRes['action'] = "pageMembreEdit";
        $tabRes['msg'] = "Le courriel $courriel est déjà utilisé. Choisissez un autre courriel.";
    } else {
        //modifie le membre
        if ($dao->modifierMembre($unMembre, "images-profil")) {
            $tabRes['msg'] = "Profil mis à jour";
        } else {
            $tabRes['msg'] = "Une erreur s'est produite. Un administrateur pourrait avour suspendu votre profil. Veuillez contacter le responsable du site.";
        }

        $tabRes['idDuMembre'] = $_SESSION['membre'];
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

function loadPageMembre()
{

    global $tabRes;
    global $dao;

    $page = $_POST['page'];
    $idMembre = $_POST['idMembre'];

    if ($tabRes['action'] == null) {
        $membre = $dao->getMembre($idMembre);

        $tabRes['membre'] = array(
            "id" => $membre->getId(), "nom" => $membre->getNom(), "prenom" => $membre->getPrenom(),
            "courriel" => $membre->getCourriel(), "numeroTelephone" => $membre->getNumeroTelephone(),
            "description" => $membre->getDescription(), "actif" => $membre->getActif(), "prive" => $membre->getPrive(), "imageProfil" => $membre->getImageProfil(),
            "membrePremium" => $membre->getMembrePremium(), "dateFinAbonnement" => $membre->getDateFinAbonnement(),
            "motDePasse" => $membre->getMotDePasse(), "role" => $membre->getRole(), "adminLock" => $membre->getAdminLock()
        );
        switch ($page) {
            case 'pageMembre':
                $daoProjet = new ProjetDaoImpl();
                $tabRes['listProjet'] = $daoProjet->getAllProjetsForMembre($idMembre); //$daoProjet -> ;break;
                $tabRes['action'] = $page;
                break;


            case 'pageMembreEdit':
                $tabRes['action'] = $page;
                break;
        }
    }
}



function loadPageAccueil()
{

    global $tabRes;
    global $dao;

    if ($tabRes['action'] == null) {
        $tabRes['action'] = 'pageAccueil';

        if (isset($_SESSION['membre'])) {
            $id = (int) $_SESSION['membre'];
            $tabRes['id'] = $id;
            $tabRes['isSub'] = $dao->checkAbonnementMembre($id);
            $tabRes['facture'] = $dao->getFactureMembre($id);
        } else if (isset($_SESSION['admin'])) {
            $tabRes['id'] = 'admin';
        }
    }
}

function loadPageAdmin()
{
    global $tabRes;
    global $dao;


    $tabRes['action'] = "pageAdmin";
    //retourne tout les membre
    $tabRes['listeSignalisation'] = $dao->getAllSignalisation();
}

function loadAutrePageMembre()
{
    global $tabRes;
    global $dao;

    $idMembre = $_POST['idMembre'];
    if (isset($_SESSION['membre'])) {
        $idMembreConnecter = $_SESSION['membre'];
    }
    $daoProjet = new ProjetDaoImpl();
    $tabRes['listProjet'] = $daoProjet->getAllProjetsForMembre($idMembre);
    if (isset($_SESSION['membre']) && $idMembre == $idMembreConnecter) {
        $tabRes['action'] = 'pageMembre';
    } else {
        $tabRes['action'] = 'autreMembre';
    }
    $daoProjet = new ProjetDaoImpl();
    $tabRes['listProjet'] = $daoProjet->getAllProjetsForMembre($idMembre);
    $membre = $dao->getMembre($idMembre);
    $tabRes['membre'] = array(
        "id" => $membre->getId(), "nom" => $membre->getNom(), "prenom" => $membre->getPrenom(),
        "courriel" => $membre->getCourriel(), "numeroTelephone" => $membre->getNumeroTelephone(),
        "description" => $membre->getDescription(), "imageProfil" => $membre->getImageProfil(),
        "membrePremium" => $membre->getMembrePremium(), "adminLock" => $membre->getAdminLock(),
        "prive" => $membre->getPrive()
    );
}

function loadPageRecherche()
{
    global $tabRes;
    $tabRes['action'] = 'loadRecherche';
}

function ajouterSignalisation()
{
    global $tabRes;
    global $dao;
    $idMembre = $_POST['idMembre'];
    $description = $_POST['description'];

    if (isset($_POST['projetRadio'])) {
        $idProjet = $_POST['projetRadio'];
    } else {
        $idProjet = -1;
    }

    $dao->addSignalement($idMembre, $idProjet, $description);
    $tabRes['action'] = 'ajouterSignalisation';
}

function adminCacherMembre()
{
    global $tabRes;
    global $dao;

    $idMembre = $_POST['idMembre'];
    $valeur = $_POST['valeur'];

    $dao->adminCacherMembre($idMembre, $valeur);

    if ($tabRes['action'] == null)
        $tabRes['action'] = 'autreMembre';

    $daoProjet = new ProjetDaoImpl();
    $tabRes['listProjet'] = $daoProjet->getAllProjetsForMembre($idMembre);
    $membre = $dao->getMembre($idMembre);
    $tabRes['membre'] = array(
        "id" => $membre->getId(), "nom" => $membre->getNom(), "prenom" => $membre->getPrenom(),
        "courriel" => $membre->getCourriel(), "numeroTelephone" => $membre->getNumeroTelephone(),
        "description" => $membre->getDescription(), "imageProfil" => $membre->getImageProfil(),
        "membrePremium" => $membre->getMembrePremium(), "adminLock" => $membre->getAdminLock(),
        "prive" => $membre->getPrive()
    );
    $tabRes['msg'] = 'Changement effectué';
}

function devenirPremium()
{
    global $tabRes;
    global $dao;

    $idMembre = $_POST['idMembre'];

    $facture = $dao->devenirPremium($idMembre);

    $membre = $dao->getMembre($idMembre);
    $tabRes['membre'] = array(
        "id" => $membre->getId(), "nom" => $membre->getNom(), "prenom" => $membre->getPrenom(),
        "courriel" => $membre->getCourriel(), "numeroTelephone" => $membre->getNumeroTelephone(),
        "description" => $membre->getDescription(), "actif" => $membre->getActif(), "prive" => $membre->getPrive(), "imageProfil" => $membre->getImageProfil(),
        "membrePremium" => $membre->getMembrePremium(), "dateFinAbonnement" => $membre->getDateFinAbonnement(),
        "motDePasse" => $membre->getMotDePasse(), "role" => $membre->getRole(), "adminLock" => $membre->getAdminLock()
    );
    $tabRes['action'] = "pageMembre";
    $daoProjet = new ProjetDaoImpl();
    $tabRes['listProjet'] = $daoProjet->getAllProjetsForMembre($idMembre);

    $tabRes['msg'] = "Paiement effectué";

    $to = $facture['courriel'];
    $subject = "Paiement";
    $txt = "Vous êtes abonné!";
    $headers = "From: projeturanus@gmail.com";

    mail($to,$subject,$txt,$headers);
}

echo json_encode($tabRes);
