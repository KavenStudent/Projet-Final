<?php
require_once("connexion.inc.php");
class Modele
{
	private $requete;
	private $params;
	private $connexion;
	private $lastId;

	function __construct($requete = null, $params = null)
	{
		$this->requete = $requete;
		$this->params = $params;
	}

	public function getRequete(): string
	{
		return $this->requete;
	}

	public function getParams(): array
	{
		return $this->params;
	}

	public function setRequete(string $requete)
	{
		$this->requete = $requete;
	}

	public function setParams(array $params)
	{
		$this->params = $params;
	}

	function obtenirConnexion()
	{
		$maConnexion = new Connexion("localhost", "root", "", "bdforuban");
		$maConnexion->connecter();
		return $maConnexion->getConnexion();
	}

	function executer()
	{
		$this->connexion = $this->obtenirConnexion();
		$stmt = $this->connexion->prepare($this->requete);
		$stmt->execute($this->params);
		$this->lastId = $this->connexion->lastInsertId();
		$this->deconnecter();
		return $stmt;
	}

	function deconnecter()
	{
		return $this->connexion;
	}

	function enleverFichier($dossier, $image)
	{

		if (trim($dossier) == "images-profil") {
			$folder = "membre";
		} else {
			$folder = "projet";
		}

		if ($image !== "defaultProfil.png" && $image !== "defaultThumbnail.png") {
			$rmImg = "./$dossier/" . $image;
			$tabFichiers = glob("./$dossier/*");

			// parcourir les fichier
			foreach ($tabFichiers as $fichier) {
				if (is_file($fichier) && $fichier == trim($rmImg)) {
					// enlever le fichier
					unlink($fichier);
					break;
				}
			}
		}
	}

	function verserFichier($dossier, $inputNom, $fichierDefaut, $chaine)
	{
		$cheminDossier = "./$dossier/";
		$nomImage = sha1($chaine . time());
		$image = $fichierDefaut;

		if ($_FILES[$inputNom]['tmp_name'] !== "") {
			//Upload de la photo
			$tmp = $_FILES[$inputNom]['tmp_name'];
			$fichier = $_FILES[$inputNom]['name'];
			$extension = strrchr($fichier, '.');
			@move_uploaded_file($tmp, $cheminDossier . $nomImage . $extension);
			// Enlever le fichier temporaire charge
			@unlink($tmp); //effacer le fichier temporaire
			//Enlever l'ancienne pochette dans le cas de modifier
			$this->enleverFichier($dossier, $image);
			$image = $nomImage . $extension;
		}

		return $image;
	}
	// 8mb 20mb
	function verserProjet($dossier, $inputNom, $fichierDefaut, $chaine, $membrePremium)
	{
		$cheminDossier = "./$dossier/";
		$nomImage = sha1($chaine . time());
		$image = $fichierDefaut;

		if ($_FILES[$inputNom]['tmp_name'] !== "") {

			//Upload de la photo
			$tmp = $_FILES[$inputNom]['tmp_name'];
			if (!$membrePremium && filesize($tmp) > 8 * pow(1024, 2)) {
				$image = "";
			} else if ($membrePremium && filesize($tmp) > 20 * pow(1024, 2)) {
				$image = "";
			} else {
				$fichier = $_FILES[$inputNom]['name'];
				$extension = strrchr($fichier, '.');
				@move_uploaded_file($tmp, $cheminDossier . $nomImage . $extension);
				// Enlever le fichier temporaire charge
				@unlink($tmp); //effacer le fichier temporaire
				//Enlever l'ancienne pochette dans le cas de modifier
				$this->enleverFichier($dossier, $image);
				$image = $nomImage . $extension;
			}
		}

		return $image;
	}

	function getLastId()
	{
		return $this->lastId;
	}
}
