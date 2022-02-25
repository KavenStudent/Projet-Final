<?php
require_once("projet.php");
require_once("projetDAO.php");
require_once("../includes/modele.inc.php");


class ProjetDaoImpl extends Modele implements ProjetDao
{
    public function getLastProjetId(): int
    {
        $requete = "SELECT id FROM projet ORDER BY id DESC LIMIT 1";
        $this->setRequete($requete);
        $this->setParams(array());
        $stmt = $this->executer();
        $ligne = $stmt->fetch(PDO::FETCH_OBJ);

        return $ligne->id;
    }
    public function getProjet(int $idProjet): Projet
    {
        try {

            $requete = "SELECT p.id   as idProjet , p.description as descriptionProjet, p.idCreateur, p.titre, p.path , p.prive, 
            p.autreParticipant, p.nbTelechargement, p.lienExterne, p.thumbnail, m.nom , m.prenom
            FROM projet p INNER JOIN membre m ON m.id = p.idCreateur WHERE p.id = ?";

            $this->setRequete($requete);
            $this->setParams(array($idProjet));
            $stmt = $this->executer();
            if ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                if ($ligne->autreParticipant == null) {
                    $mesParticipants = " ";
                } else {
                    $mesParticipants = $ligne->autreParticipant;
                }
                $nom = ($ligne->nom);
                $prenom = ($ligne->prenom);
                $nomComplet = $prenom . " " . $nom;
                $projet = new Projet(
                    $ligne->idProjet,
                    $ligne->idCreateur,
                    $ligne->titre,
                    $ligne->descriptionProjet,
                    $ligne->path,
                    $ligne->prive,
                    $mesParticipants,
                    $ligne->nbTelechargement,
                    $ligne->lienExterne,
                    $ligne->thumbnail,
                    $nomComplet
                );
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $projet;
    }
    public function getAllProjets(): array
    {
        try {
            $requete = "SELECT id, titre, description, thumbnail FROM projet WHERE idCreateur = ?";
            $this->setRequete($requete);
            $this->setParams(array());
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
    public function getAllProjetsForMembre(int $idMembre): array
    {
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
    public function getAllRegisteredParticipantsForProjet(int $idProjet): array
    {
        try {
            $tab = array();
            $requete = "SELECT mp.idMembre, me.nom, me.prenom, me.prive FROM membreprojet mp INNER JOIN membre me ON mp.idMembre = me.id WHERE mp.idProjet = ?;";
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
    public function getAllTagsForProjet(int $idProjet): array
    {
        try {
            $tab = array();
            $requete = "SELECT pt.idTag , t.nomTag FROM projettag pt INNER JOIN tag t ON t.id = pt.idTag WHERE pt.idProjet = ?";
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
    
    public function creerProjet(Projet $projet, array $tags, array $participants): bool
    {
        try {

            $thumbnail = $this->verserFichier("thumbnail", "imageVignette", "defaultThumbnail.png", $projet->getTitre() . $projet->getCreateurId());
            $path = $this->verserFichier("fichiersProjet", "inputFichier", "", $projet->getTitre() . $projet->getCreateurId() . "fichier");

            //  Ajoute le projet
            $requete = "INSERT INTO projet (id,idCreateur,titre,description,path,prive,autreParticipant,lienExterne,thumbnail) VALUES(0,?,?,?,?,?,?,?,?)";
            $this->setRequete($requete);
            $this->setParams(array(
                $projet->getCreateurId(), $projet->getTitre(), $projet->getDescription(), $path, $projet->isPrive(),
                $projet->getAutresParticipants(), $projet->getLienExterne(), $thumbnail
            ));
            $stmt = $this->executer();


            //  Ajouter les participants au projet
            $requete = "INSERT INTO membreprojet (idMembre, idProjet) VALUES (?, ?)";
            $idProjet = $this->getLastProjetId();

            foreach ($participants as $part) {

                //  Ajouter les participants a la table membreprojet
                $tabPart = explode(' ', $part); // Le string de participant contient nom, prenom et l'id du membre separer par un espace

                $idMembre = (int) ($tabPart[2]);

                $this->setRequete($requete);
                $this->setParams(array(
                    $idMembre,
                    $idProjet
                ));

                $this->executer();
            }

            //  Ajouter les tags au projet
            foreach ($tags as $tag) {
                //  Inserer le tag dans la liste de tag s'il n'existe pas deja
                $requete = "INSERT INTO tag SELECT * FROM (SELECT 0 as id, ? as nomTag) as new_value
                WHERE NOT EXISTS (
                    SELECT nomTag FROM tag WHERE nomTag = ?
                );";
                $this->setRequete($requete);
                $this->setParams(array($tag, $tag));
                $stmt = $this->executer();

                //  Ajouter les tags a la table projettag
                $requete = "INSERT INTO projettag VALUES (?, (SELECT id FROM tag WHERE nomTag = ?))";
                $this->setRequete($requete);
                $this->setParams(array($idProjet, $tag));
                $stmt = $this->executer();
            }
            $returnValue = true;
        } catch (Exception $e) {
            echo $e->getMessage();
            $returnValue = false;
        } finally {
            unset($requete);
            return $returnValue;
        }
    }
    public function modifierProjet(Projet $projet, array $tags, array $tabParticipantAvecId): bool
    {
        $returnValue = false;
        try {
            // cherche l'image du projet a modifier
            $requete = "SELECT thumbnail, path FROM projet WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array($projet->getId()));
            $stmt = $this->executer();
            $ligne = $stmt->fetch(PDO::FETCH_OBJ);
            $ancienneImage = $ligne->thumbnail;
            $ancienPath = $ligne->path;


            $image = $this->verserFichier("thumbnail", "thumbnail", $ancienneImage, $projet->getTitre() . $projet->getCreateurId());
            $path = $this->verserFichier("fichiersProjet", "inputFichierEdit", $ancienPath, $projet->getTitre() . $projet->getCreateurId() . "fichier");


            // modifie dans projet
            $requete = "UPDATE projet SET titre=?,description=?,path=?,prive=?,autreParticipant=?,lienExterne=?,thumbnail=? WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array(
                $projet->getTitre(), $projet->getDescription(), $path, $projet->isPrive(),
                $projet->getAutresParticipants(), $projet->getLienExterne(), $image, $projet->getId()
            ));
            $stmt = $this->executer();
            $returnValue = true;
        } catch (Exception $e) {
            $returnValue = false;
            echo $e->getMessage();
        } finally {
            unset($requete);
            return $returnValue;
        }
    }
    public function telechargerProjet(int $idProjet, int $nbTelechargement): bool
    {
        $returnValue = false;
        try {
            $newNbTelechargement = $nbTelechargement + 1;
            $requete = "UPDATE projet SET nbTelechargement=? WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array(
                $newNbTelechargement, $idProjet
            ));
            $stmt = $this->executer();
            $returnValue = $stmt->fetch(PDO::FETCH_OBJ);
        } catch (Exception $e) {
            $returnValue = false;
            echo $e->getMessage();
        } finally {
            unset($requete);
            return $returnValue;
        }
    }

    public function getAllProjetsForCards(): array
    {
        try {
            $tab = array();
            $requete = "SELECT p.id as idProjet, p.titre, p.nbTelechargement, GROUP_CONCAT(t.nomTag) as tags, m.nom as nom, m.prenom as prenom, m.id  as idMembre FROM projet p INNER JOIN projettag pt ON p.id = pt.idProjet INNER JOIN tag t ON t.id = pt.idTag INNER JOIN membre m ON p.idCreateur = m.id GROUP BY p.id";
            $this->setRequete($requete);
            $this->setParams(array());
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

    public function getAllTags(): array
    {
        try {
            $tab = array();
            $requete = "SELECT * FROM tag ";
            $this->setRequete($requete);
            $this->setParams(array());
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


    public function getMembreNameById(int $idMembre): string
    {
        $nomComplet = "";
        try {
            $requete = "SELECT nom, prenom FROM membre WHERE id = ?";
            $this->setRequete($requete);
            $this->setParams(array($idMembre));
            $stmt = $this->executer();
            if ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $nom = $ligne->nom;
                $prenom = $ligne->prenom;
            }
            $nomComplet = $prenom . " " . $nom;
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($stmt);
            return $nomComplet;
        }
    }

    public function supprimerProjet(int $idProjet): bool {
        $returnValue = false;
        try {
            $requete = "DELETE FROM projet WHERE id = ?;";
            $this->setRequete($requete);
            $this->setParams(array($idProjet));
            $stmt = $this->executer();
            $returnValue = true;
        } catch (Exception $e) {
            $returnValue = false;
            echo $e->getMessage();
        } finally {
            unset($requete);
            return $returnValue;
        }
    }
}