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

    // ------------------------------------------------------------Constructeur
    function __Construct(int $id, int $createurId, string $titre, string $description, string $path, bool $prive, string $autresParticipants, int $nbTelechargements, string $liensExternes) {
        $this->id = $id;
        $this->createurId = $createurId;
        $this->titre = $titre;
        $this->description = $description;
        $this->path = $path;
        $this->prive = $prive;
        $this->autresparticipants = $autresparticipants;
        $this->nbTelechargements = $nbTelechargements;
        $this->lienExterne = $lienExterne;
    }

    // ----------------------------------------------------------------Getters
    function getId() {
        return $this->id;
    }
    function getCreateurId() {
        return $this->createurId;
    }
    function getTitre() {
        return $this->titre;
    }
    function getDescription() {
        return $this->description;
    }
    function getPath() {
        return $this->path;
    }
    function isPrive() {
        return $this->prive;
    }
    function getAutresParticipants() {
        return $this->autresParticipants;
    }
    function getNbTelechargements() {
        return $this->nbTelechargements;
    }
    function getLienExterne() {
        return $this->lienExterne;
    }

    //----------------------------------------------------------------Setters
    function setTitre(string $titre) {
        $this->titre = $titre;
    }
    function setDescription(string $description) {
        $this->description = $description;
    }
    function setPath(string $path) {
        $this->path = $path;
    }
    function setPrive(bool $prive) {
        $this->prive = $prive;
    }
    function setAutresParticipants(string $autresParticipants) {
        $this->autresParticipants = $autresParticipants;
    }
    function setNbTelechargements(string $nbTelechargements) {
        $this->nbTelechargements = $nbTelechargements;
    }
    function setLienExterne(string $lienExterne) {
        $this->lienExterne = $lienExterne;
    }
}
?>