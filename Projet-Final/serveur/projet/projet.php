<?php
class Projet {
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

    // ------------------------------------------------------------Constructeur
    public function __construct(int $id, int $createurId, string $titre, string $description,
     string $path, int $prive, string $autresParticipants, int $nbTelechargements, string $lienExterne, string $thumbnail) {
        $this->id = $id;
        $this->createurId = $createurId;
        $this->titre = $titre;
        $this->description = $description;
        $this->path = $path;
        $this->prive = $prive;
        $this->autresparticipants = $autresParticipants;
        $this->nbTelechargements = $nbTelechargements;
        $this->lienExterne = $lienExterne;
        $this->thumbnail = $thumbnail;
    }

    // ----------------------------------------------------------------Getters
    public function getId() {
        return $this->id;
    }
    public function getCreateurId() {
        return $this->createurId;
    }
    public function getTitre() {
        return $this->titre;
    }
    public function getDescription() {
        return $this->description;
    }
    public function getPath() {
        return $this->path;
    }
    public function isPrive() {
        return $this->prive;
    }
    public function getAutresParticipants() {
        return $this->autresParticipants;
    }
    public function getNbTelechargements() {
        return $this->nbTelechargements;
    }
    public function getLienExterne() {
        return $this->lienExterne;
    }
    public function getThumbnail() {
        return $this->thumbnail;
    }
  
    //----------------------------------------------------------------Setters
    public function setTitre(string $titre) {
        $this->titre = $titre;
    }
    public function setDescription(string $description) {
        $this->description = $description;
    }
    public function setPath(string $path) {
        $this->path = $path;
    }
    public function setPrive(bool $prive) {
        $this->prive = $prive;
    }
    public function setAutresParticipants(string $autresParticipants) {
        $this->autresParticipants = $autresParticipants;
    }
    public function setNbTelechargements(string $nbTelechargements) {
        $this->nbTelechargements = $nbTelechargements;
    }
    public function setLienExterne(string $lienExterne) {
        $this->lienExterne = $lienExterne;
    }
    public function setThumbnail(string $thumbnail) {
        $this->thumbnail = $thumbnail;
    }
}

?>