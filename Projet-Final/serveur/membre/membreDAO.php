<?php 
//Interface MembreDao
interface MembreDao
{
    //Retourne tout les membres
    public function getAllMembre(): array;

    //Retourne tout les membres avec de recherhce
    public function getAllMembreRecherche(string $par, string $valeurPar): array;

    //Enregistre un membre
    public function enregistrerMembre(Membre $Membre);

    //Verifie son courriel s'il existe deja dans la bd
    public function verifierCourriel(string $courriel): bool;

    //Verifie son courriel s'il existe deja dans la bd excluant lui meme
    public function verifierCourrielModifier(string $courriel, int $idMembre): bool;

    //Modifie un membre
    public function modifierMembre(Membre $Membre);

    //Connecter un membre et renvoie dans sa page
    public function connecter(string $courriel, string $motDePasse): string;

    //Change le statut actif  d'un membre
    // public function changerStatutActif(int $actif, int $idMembre);

    // //change le profil a prive
    // public function mettreProfilPrive(int $prive, int $idMembre);

    // // Paie l'abonnement du membre pour devenir premium
    // public function devenirPremium(int $idMembre);

    // //Affiche l'historique d'abonnement
    // public function afficherHistoriqueAbonnement(int $idMembre): array;

    //Affiche un membre
    public function getMembre(int $idMembre): Membre;
}
?>