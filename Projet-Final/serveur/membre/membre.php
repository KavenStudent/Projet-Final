<?php
// Classe Membre
class Membre
{
    private $id;
    private $nom;
    private $prenom;
    private $courriel;
    private $numeroTelephone;
    private $description;
    private $actif;
    private $prive;
    private $imageProfil;
    private $membrePremium;
    private $dateFinAbonnement;
    private $motDePasse;
    private $role;
    private $adminLock;

    public function __construct(
        int $id,
        string $prenom,
        string $nom,
        string $courriel,
        string $numeroTelephone,
        string $description,
        int $actif,
        int $prive,
        string $imageProfil,
        int $membrePremium,
        string $dateFinAbonnement,
        string $motDePasse,
        string $role,
        int $adminLock
    ) {
        $this->id = $id;
        $this->prenom = $prenom;
        $this->nom = $nom;
        $this->courriel = $courriel;
        $this->numeroTelephone = $numeroTelephone;
        $this->description = $description;
        $this->actif = $actif;
        $this->prive = $prive;
        $this->imageProfil = $imageProfil;
        $this->membrePremium = $membrePremium;
        $this->dateFinAbonnement = $dateFinAbonnement;
        $this->motDePasse = $motDePasse;
        $this->role = $role;
        $this->adminLock = $adminLock;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getNom(): string
    {
        return $this->nom;
    }
    public function setNom(string $nom)
    {
        $this->nom = $nom;
    }

    public function getPrenom(): string
    {
        return $this->prenom;
    }
    public function setPrenom(string $prenom)
    {
        $this->prenom = $prenom;
    }

    public function getCourriel(): string
    {
        return $this->courriel;
    }
    public function setCourriel(string $courriel)
    {
        $this->courriel = $courriel;
    }

    public function getNumeroTelephone(): string
    {
        return $this->numeroTelephone;
    }
    public function setNumeroTelephone(string $numeroTelephone)
    {
        $this->numeroTelephone = $numeroTelephone;
    }

    public function getDescription(): string
    {
        return $this->description;
    }
    public function setDescription(string $description)
    {
        $this->description = $description;
    }

    public function getActif(): string
    {
        return $this->actif;
    }
    public function setActif(string $actif)
    {
        $this->actif = $actif;
    }

    public function getPrive(): int
    {
        return $this->prive;
    }
    public function setPrive(int $prive)
    {
        $this->prive = $prive;
    }

    public function getImageProfil(): string
    {
        return $this->imageProfil;
    }
    public function setImageProfil(string $imageProfil)
    {
        $this->imageProfil = $imageProfil;
    }

    public function getMembrePremium(): string
    {
        return $this->membrePremium;
    }

    public function setMembrePremium(string $membrePremium)
    {
        $this->membrePremium = $membrePremium;
    }

    public function getDateFinAbonnement(): string
    {
        return $this->dateFinAbonnement;
    }
    public function setDateFinAbonnement(string $dateFinAbonnement)
    {
        $this->dateFinAbonnement = $dateFinAbonnement;
    }

    public function getMotdePasse(): string
    {
        return $this->motDePasse;
    }
    public function setMotdePasse(string $motDePasse)
    {
        $this->motDePasse = $motDePasse;
    }
    public function getRole()
    {
        return $this->role;
    }
    public function getAdminLock(): int
    {
        return $this->adminLock;
    }
    public function setAdminLock(int $adminLock)
    {
        $this->adminLock = $adminLock;
    }
}
