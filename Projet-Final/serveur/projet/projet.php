<?php
class Projet
{
    private $id;
    private $createurId;
    private $titre;
    private $description;
    private $path;
    private $prive;
    private $autresParticipants;
    private $nbTelechargements;
    private $lienExterne;
    private $thumbnail;
    private $nomMembre;

    // ------------------------------------------------------------Constructeur
    public function __construct(
        int $id,
        int $createurId,
        string $titre,
        string $description,
        string $path,
        string $prive,
        string $autresParticipants,
        int $nbTelechargements,
        string $lienExterne,
        string $thumbnail,
        string $nomMembre
    ) {
        $this->id = $id;
        $this->createurId = $createurId;
        $this->titre = $titre;
        $this->description = $description;
        $this->path = $path;
        $this->prive = $prive;
        $this->autresParticipants = $autresParticipants;
        $this->nbTelechargements = $nbTelechargements;
        $this->lienExterne = $lienExterne;
        $this->thumbnail = $thumbnail;
        $this->nomMembre = $nomMembre;
    }

    // ----------------------------------------------------------------Getters
    public function getId() : int
    {
        return $this->id;
    }
    public function getCreateurId(): int
    {
        return $this->createurId;
    }
    public function getTitre(): string
    {
        return $this->titre;
    }
    public function getDescription(): string
    {
        return $this->description;
    }
    public function getPath(): string
    {
        return $this->path;
    }
    public function isPrive(): string
    {
        return $this->prive;
    }
    public function getAutresParticipants(): string
    {
        return $this->autresParticipants;
    }
    public function getNbTelechargements(): int
    {
        return $this->nbTelechargements;
    }
    public function getLienExterne(): string
    {
        return $this->lienExterne;
    }
    public function getThumbnail(): string
    {
        return $this->thumbnail;
    }

    public function getNomMembre(): string
    {
        return $this->nomMembre;
    }

    //----------------------------------------------------------------Setters
    public function setTitre(string $titre)
    {
        $this->titre = $titre;
    }
    public function setDescription(string $description)
    {
        $this->description = $description;
    }
    public function setPath(string $path)
    {
        $this->path = $path;
    }
    public function setPrive(string $prive)
    {
        $this->prive = $prive;
    }
    public function setAutresParticipants(string $autresParticipants)
    {
        $this->autresParticipants = $autresParticipants;
    }
    public function setNbTelechargements(string $nbTelechargements)
    {
        $this->nbTelechargements = $nbTelechargements;
    }
    public function setLienExterne(string $lienExterne)
    {
        $this->lienExterne = $lienExterne;
    }
    public function setThumbnail(string $thumbnail)
    {
        $this->thumbnail = $thumbnail;
    }

    public function setNomMembre(string $nomMembre)
    {
        $this->nomMembre = $nomMembre;
    }
}