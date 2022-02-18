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
        "nomComplet" => $projet->getNomMembre(), "thumbnail" => $projet->getThumbnail()
    );
    $tabRes['tabParticipants'] = $dao->getAllRegisteredParticipantsForProjet($idProjet);
    $tabRes['tabTags'] = $dao->getAllTagsForProjet($idProjet);
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
    $prive = true;

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
            $tabRes['action'] = 'AjouterProjetReussi';
            $tabRes['idMembre'] = $idMembre;
        }
    }
}

function loadAutreProjet()
{
    global $tabRes;
    global $dao;

    $idProjet = $_POST['idProjet'];

    $projet = $dao->getProjet($idProjet);

    $tabRes['projet'] = array(
        "id" => $projet->getId(), "titre" => $projet->getTitre(), "idCreator" => $projet->getCreateurId(), "autreParticipant" => $projet->getAutresParticipants(),
        "description" => $projet->getDescription(), "lienExterne" => $projet->getLienExterne(),
        "nomComplet" => $projet->getNomMembre(), "thumbnail" => $projet->getThumbnail()
    );
    $tabRes['tabParticipants'] = $dao->getAllRegisteredParticipantsForProjet($idProjet);
    $tabRes['tabTags'] = $dao->getAllTagsForProjet($idProjet);
    $tabRes['action'] = 'autreProjet';
}

echo json_encode($tabRes);
