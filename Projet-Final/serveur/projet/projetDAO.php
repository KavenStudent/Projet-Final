<?php 
require_once("projet.php");
require_once("projetDAO.php");
require_once("../includes/modele.inc.php");
//Interface MembreDao
interface ProjetDao
{
    //Retourne un projet
    public function getProjet(int $idProjet): Projet;

    //Retourne tous les projets
    public function getAllProjets(): array;

    //Retourne tous les projets pour un certain membre
    public function getAllProjetsForMembre(int $idMembre): array;

    //Retourne tous les participants d'un projet
    public function getAllRegisteredParticipantsForProjet(int $idProjet): array;

    //Retourne tous les tags d'un projet
    public function getAllTagsForProjet(int $idProjet): array;

    //Cree un nouveau projet
    public function creerProjet(Projet $projet, array $tags, array $participants);

    //Modifie un projet donné
    public function modifierProjet(Projet $projet);

    //Télécharge le fichier d'un projet
    public function telechargerProjet(int $idProjet);
}
?>