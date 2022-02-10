<?php
session_start();
require_once("projet.php");
require_once("projetDAOImpl.php");
//Controller
$tabRes = array();
$action = $_POST['action'];
$destination = $_POST['destination'];
$dao = new projetDAOImpl();

switch ($action) {
    case "loadProjet":
        loadPageProjet($destination);
        break;
}

function loadPageProjet($page) {
    global $tabRes;
    global $dao;

    $idProjet = $_POST['idProjet'];
    if($tabRes['action'] = null)
        $tabRes['action'] = $page;

    $tabRes['projet'] = $dao->getProjet($idProjet);
}

echo json_encode($tabRes);
?>