<?php 
//Interface MembreDao
interface ProjetDao
{
    //Retourne un projet
    public function getProjet(int $id): Projet;

    //Retourne tous les projets
    public function getAllProjetsForMembre(): array;
}
?>