<?php
session_start();
require_once("projet.php");
require_once("projetDAOImpl.php");
require_once("../membre/membreDAOImpl.php");
//Controller
$tabRes = array();
$tabRes['action'] = null;
$dao = new ProjetDaoImpl();

$action = $_POST['action'];

switch ($action) {
    case "loadProjet":
        loadPageProjetController();
        break;
    case "loadPageAjouterProjet":
        loadPageAjouterProjetController();
        break;
    case "ajouterProjet":
        ajouterProjet();
        break;
    case "loadAutreProjet":
        loadAutreProjet();
        break;
    case "modifierProjet":
        modifierProjet();
        break;
    case "loadJsonRecherhe":
        loadJsonRecherhe();
        break;  
    case "telechargerProjet":
        telechargerProjet();
        break;
    case "supprimerProjet":
        supprimerProjet();
        break;

}

function modifierProjet()
{
    global $tabRes;
    global $dao;

    $idProjet = $_POST['idProjet'];
    $titreProjet = $_POST['titreProjetEdit'];
    $descriptionProjet = $_POST['descriptionProjetEdit'];
    $path = "";
    $prive = $_POST['projetPublicEdit'];

    $nbTelechargements = 0;
    $lienProjet = $_POST['lienProjetEdit'];


    $thumbnail = "defaultThumbnail.png";

    $tagsSTRING = $_POST['tagsEdit'];
    $tags = explode(',', $tagsSTRING);

    $participantsProjet = $_POST['participantsProjetEdit'];

    $tabParticipantAvecId = array();
    $tabParticipantSansId = "";


    $tabParticipants = explode(',', $participantsProjet);
    foreach ($tabParticipants as $part) {
        if (preg_match('~[0-9]+~', $part)) {
            $tabParticipantAvecId[] = trim($part);
        } else {
            $tabParticipantSansId .= $part . ",";
        }
    }

    $stringPart = substr($tabParticipantSansId, 0, strlen($tabParticipantSansId) - 1);

    $projet = new Projet($idProjet, 0, $titreProjet, $descriptionProjet, $path, $prive, $stringPart, $nbTelechargements, $lienProjet, $thumbnail, "");

    if ($tabRes['action'] == null) {
        if ($dao->modifierProjet($projet, $tags, $tabParticipantAvecId)) {
            $tabRes['action'] = 'modifierProjetReussi';
            $tabRes['idMembre'] = $_SESSION['membre'];
        } else {
            $tabRes['test'] = "failed";
        }
    }
}

function loadPageProjetController()
{
    global $tabRes;
    global $dao;

    $page = $_POST['destination'];
    $idProjet = $_POST['idProjet'];

    if ($tabRes['action'] == null)
        $tabRes['action'] = $page;

    $projet = $dao->getProjet($idProjet);
    $tabRes['projet'] = array(
        "id" => $projet->getId(), "titre" => $projet->getTitre(), "idCreator" => $projet->getCreateurId(), "autreParticipant" => $projet->getAutresParticipants(),
        "description" => $projet->getDescription(), "lienExterne" => $projet->getLienExterne(),
        "nomComplet" => $projet->getNomMembre(), "thumbnail" => $projet->getThumbnail(), "prive" => $projet->isPrive(), "path" => $projet->getPath()
    );

    $tabRes['tabParticipantsProjet'] = $dao->getAllRegisteredParticipantsForProjet($idProjet);
    $tabRes['tabTagsProjet'] = $dao->getAllTagsForProjet($idProjet);
    $tabRes['test'] = $projet->isPrive();
    
    $tabRes['tabTags'] = $dao->getAllTags();
    $daoMembre = new MembreDaoImpl();
    $tabRes['tabParticipants'] = $daoMembre->getAllMembre();
}

function  loadPageAjouterProjetController()
{
    global $tabRes;
    global $dao;

    $idMembre = $_POST['idMembre'];

    if ($tabRes['action'] == null)
        $tabRes['action'] = "pageProjetAjouter";

    $tabRes['idMembre'] = $idMembre;
    $tabRes['tabTags'] = $dao->getAllTags();
    $daoMembre = new MembreDaoImpl();
    $tabRes['tabParticipants'] = $daoMembre->getAllMembre();
}

function ajouterProjet()
{
    global $tabRes;
    global $dao;

    $idMembre = $_POST['idMembre'];
    $titreProjet = $_POST['titreProjet'];
    $descriptionProjet = $_POST['descriptionProjet'];
    $path = "";
    $prive = false;

    $nbTelechargements = 0;
    $lienProjet = $_POST['lienProjet'];


    $thumbnail = "defaultThumbnail.png";

    $tagsSTRING = $_POST['tags'];
    $tags = explode(',', $tagsSTRING);

    $participantsProjet = $_POST['participantsProjet'];

    $tabParticipantAvecId = array();
    $tabParticipantSansId = "";


    $tabParticipants = explode(',', $participantsProjet);
    foreach ($tabParticipants as $part) {
        if (preg_match('~[0-9]+~', $part)) {
            $tabParticipantAvecId[] = trim($part);
        } else {
            $tabParticipantSansId .= $part . ",";
        }
    }

    $stringPart = substr($tabParticipantSansId, 0, strlen($tabParticipantSansId) - 1);

    $nomComplet = $dao->getMembreNameById($idMembre);

    $projet = new Projet(0, $idMembre, $titreProjet, $descriptionProjet, $path, $prive, $stringPart, $nbTelechargements, $lienProjet, $thumbnail, $nomComplet);

    if ($tabRes['action'] == null) {
        if ($dao->creerProjet($projet, $tags, $tabParticipantAvecId)) {
            $tabRes['action'] = 'ajouterProjetReussi';
            $tabRes['idMembre'] = $idMembre;
        }
    }
}

function loadAutreProjet()
{
    global $tabRes;
    global $dao;

    $idProjet = $_POST['idProjet'];

    if ($tabRes['action'] == null)
        $tabRes['action'] = 'autreProjet';

    $projet = $dao->getProjet($idProjet);
    $tabRes['projet'] = array(
        "id" => $projet->getId(), "titre" => $projet->getTitre(), "idCreator" => $projet->getCreateurId(), "autreParticipant" => $projet->getAutresParticipants(),
        "description" => $projet->getDescription(), "lienExterne" => $projet->getLienExterne(),
        "nomComplet" => $projet->getNomMembre(), "thumbnail" => $projet->getThumbnail(), "path" => $projet->getPath()
    );
    $tabRes['tabParticipantsProjet'] = $dao->getAllRegisteredParticipantsForProjet($idProjet);
    $tabRes['tabTagsProjet'] = $dao->getAllTagsForProjet($idProjet);
}

function loadJsonRecherhe()
{
    global $tabRes;
    global $dao;
    $daoMembre = new MembreDaoImpl();
    $tabRes['tabMembres'] =  $daoMembre->getAllMembre();
    $tabRes['tabProjets'] = $dao->getAllProjetsForCards();
}

function telechargerProjet(){
    global $tabRes;
    global $dao;

    $idProjet = $_POST['idProjet'];

    $projet = $dao->getProjet($idProjet);

    $dao->telechargerProjet($projet->getId(), $projet->getNbTelechargements());
}

function supprimerProjet() {
    global $tabRes;
    global $dao;

    $idProjet = (int) $_POST['idProjet'];
    $idMembre = (int) $_POST['idMembre'];

    $projet = $dao->supprimerProjet($idProjet);

    if($tabRes['action'] == null) {
        $tabRes['action'] = 'supprimerProjet';
        $tabRes['idMembre'] = $idMembre;
    }
    
}

echo json_encode($tabRes);