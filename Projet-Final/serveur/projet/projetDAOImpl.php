<?php
require_once("projet.php");
require_once("projetDAO.php");
require_once("../includes/modele.inc.php");


class ProjetDaoImpl extends Modele implements ProjetDao
{ 
    public function getProjet(int $idProjet): Projet {
        try {
            
            $requete = "SELECT * FROM projet WHERE id = ?";
            $this->setRequete($requete);
            $this->setParams(array($idProjet));
            $stmt = $this->executer();
            if ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                if($ligne->autreParticipant == null){
                    $mesParticipants = " ";
                }else{
                    $mesParticipants = $ligne->autreParticipant;
                }
                $projet = new Projet($ligne->id, $ligne->idCreateur, $ligne->titre, $ligne->description, $ligne->path, $ligne->prive, $mesParticipants, $ligne->nbTelechargement, $ligne->lienExterne, $ligne->thumbnail);
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $projet;
    }
    public function getAllProjets(): array {
        try {
            $tab = array();
            $requete = "SELECT id, titre, description, thumbnail FROM projet WHERE idCreateur = ?";
            $this->setRequete($requete);
            $this->setParams(array($idMembre));
            $stmt = $this->executer();
            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $tab[] = $ligne;
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $tab;
    }
    public function getAllProjetsForMembre(int $idMembre): array {
        try {
            $tab = array();
            $requete = "SELECT id, titre, description, thumbnail FROM projet WHERE idCreateur = ?";
            $this->setRequete($requete);
            $this->setParams(array($idMembre));
            $stmt = $this->executer();
            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $tab[] = $ligne;
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $tab;
    }
    public function getAllRegisteredParticipantsForProjet(int $idProjet): array {
        try {
            $tab = array();
            $requete = "SELECT idMembre FROM membreprojet WHERE idProjet = ?";
            $this->setRequete($requete);
            $this->setParams(array($idMembre));
            $stmt = $this->executer();
            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $tab[] = $ligne;
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $tab;
    }
    public function getAllTagsForProjet(int $idProjet): array {
        try {
            $tab = array();
            $requete = "SELECT (SELECT * FROM tag WHERE id = idTag) FROM projettag WHERE idProjet = ?";
            $this->setRequete($requete);
            $this->setParams(array($idProjet));
            $stmt = $this->executer();
            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $tab[] = $ligne;
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $tab;
    }
    public function creerProjet(Projet $projet, array $tags, array $participants) {
        try {
            //  Ajoute le projet
            $requete = "INSERT INTO projet VALUES(0,?,?,?,?,?,?,?,?)";
            $this->setRequete($requete);
            $this->setParams(array(
                $projet->getTitre(), $projet->getDescription(), $projet->getPath(), $projet->getprive(),
                $projet->getAutresParticipants(), $projet->getLienExterne(), $image, $projet->getId()
            ));
            $stmt = $this->executer();
            
            //  Ajouter les tags au projet
            foreach($tags as $tag) {
                //  Inserer le tag dans la liste de tag s'il n'existe pas deja
                $requete = "INSERT INTO tag SELECT * FROM (SELECT 0 as id, ? as nomTag) as new_value
                WHERE NOT EXISTS (
                    SELECT nomTag FROM tag WHERE nomTag = ?
                );";
                $this->setRequete($requete);
                $this->setParams(array($tag, $tag));
                $stmt = $this->executer();

                //  Ajouter les tags a la table projettag
                $requete = "INSERT INTO projettag VALUES (?, (SELECT idTag FROM tag WHERE nomTag = ?))";
                $this->setRequete($requete);
                $this->setParams(array($projet->getId(), $tag));
                $stmt = $this->executer();
            }

            //  TO DO: Terminer l'ajout des participants
            //  Ajouter les participants au projet
            foreach($participants as $part) {
                //  Ajouter les participants a la table membreprojet
                $part.split(' ');   // Le string de participant contient nom, prenom et l'id du membre separer par un espace
                $requete = "INSERT INTO membreprojet VALUES (?, ?)";
                $this->setRequete($requete);
                $this->setParams(array($part[2], $projet->getId()));
                $stmt = $this->executer();
            }
            
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }
    public function modifierProjet(Projet $projet) {
        try {
            // cherche l'image du projet a modifier
            $requete = "SELECT thumbnail FROM projet WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array($projet->getId()));
            $stmt = $this->executer();
            $ligne = $stmt->fetch(PDO::FETCH_OBJ);
            $ancienneImage = $ligne->thumbnail;

            $image = $this->verserFichier($dossier, "defaultThumbnail", $ancienneImage, $projet->getTitre());

            // modifie dans projet
            $requete = "UPDATE projet SET titre=?,description=?,path=?,prive=?,auteParticipant=?,lienExterne=?,thumbnail=? WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array(
                $projet->getTitre(), $projet->getDescription(), $projet->getPath(), $projet->getprive(),
                $projet->getAutresParticipants(), $projet->getLienExterne(), $image, $projet->getId()
            ));
            $stmt = $this->executer();
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }
    public function telechargerProjet(int $idProjet) {
        
    }
}
?>