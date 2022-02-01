<?php 
require_once("membre.php");
require_once("MembreDAO.php");

class MembreDaoImp extends Modele implements MembreDao
{

    public function getAllMembre(): array
    {
        try {
            $tab = array();
            $requete = "SELECT m.idMembre, m.prenom, m.nom, m.courriel, m.sexe, m.dateDeNaissance, c.statut, c.role FROM membres m INNER JOIN connexion c ON m.idMembre = c.idMembre";
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
    public function getAllMembreRecherche(string $par, string $valeurPar): array
    {
        try {
            $tab = array();

            switch (trim($par)) {
                case "membre":
                    $requete = "SELECT m.idMembre, m.prenom, m.nom, m.courriel, m.sexe, m.dateDeNaissance, c.statut, c.role FROM membres m INNER JOIN connexion c ON m.idMembre = c.idMembre WHERE LOWER(nom) LIKE CONCAT('%', ?, '%') OR LOWER(prenom) LIKE CONCAT('%', ?, '%')";
                    break;
                case "tout":
                    $requete = "SELECT m.idMembre, m.prenom, m.nom, m.courriel, m.sexe, m.dateDeNaissance, c.statut, c.role FROM membres m INNER JOIN connexion c ON m.idMembre = c.idMembre WHERE 1=? OR 1=?";
                    $valeurPar = 1;
                    break;
            }
            $this->setRequete($requete);
            $this->setParams(array(trim($valeurPar), trim($valeurPar)));
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
    public function enregistrerMembre(Membre $Membre)
    {
        try {
            // enregistre dans membre
            $requete = "INSERT INTO membre VALUES(0,?,?,?,?,?,?,?,?,?,?,?)";
            $this->setRequete($requete);
            $this->setParams(array($Membre->getNom(), $Membre->getPrenom(), $Membre->getCourriel(), $Membre->getNumeroTelephone(), $Membre->getDescription(), $Membre->getActif(), $Membre->getPrive(), $Membre->getImageProfil(), $Membre->getMembrePremium(), $Membre->getDateFinAbonnement(), $Membre->getRole()));
            $stmt = $this->executer();

            // enregistre dans connexion
            $requete = "INSERT INTO connexion VALUES(0,?,?)";
            $this->setRequete($requete);
            $this->setParams(array($Membre->getCourriel(), $Membre->getMotdePasse()));
            $stmt = $this->executer();
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }
    public function verifierCourriel(string $courriel): bool
    {
        try {
            $existe = false;
            $requete = "SELECT * FROM membre WHERE courriel=?";
            $this->setRequete($requete);
            $this->setParams(array($courriel));
            $stmt = $this->executer();
            if ($stmt->fetch(PDO::FETCH_OBJ)) {
                $existe = true;
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $existe;
    }
    public function verifiCourrielModifier(string $courriel, int $idMembre): bool
    {
        try {
            $existe = false;
            $requete = "SELECT * FROM membre WHERE courriel=? and idMembre NOT IN ($idMembre)";
            $this->setRequete($requete);
            $this->setParams(array($courriel));
            $stmt = $this->executer();
            if ($stmt->fetch(PDO::FETCH_OBJ)) {
                $existe = true;
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $existe;
    }
    public function modifierMembre(Membre $Membre)
    {
        try {
            // modifie dans membre
            $requete = "UPDATE membres SET prenom=?,nom=?,courriel=?,sexe=?,dateDeNaissance=? WHERE idMembre=?";
            $this->setRequete($requete);
            $this->setParams(array($Membre->getPrenom(), $Membre->getNom(), $Membre->getCourriel(), $Membre->getSexe(), $Membre->getDateDeNaisssance(), $Membre->getIdMembre()));
            $stmt = $this->executer();

            // modifie dans connexion
            $requete = "UPDATE connexion SET courriel=?,motDePasse=? WHERE idMembre=?";
            $this->setRequete($requete);
            $this->setParams(array($Membre->getCourriel(), $Membre->getMotdePasse(), $Membre->getIdMembre()));
            $stmt = $this->executer();
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }
    public function connecter(string $courriel, string $motDePasse): string
    {
        try {
            $msgErreur = "";
            $requete = "SELECT * FROM connexion WHERE courriel=? AND motDePasse=?";
            $this->setRequete($requete);
            $this->setParams(array($courriel, $motDePasse));
            $stmt = $this->executer();

            if ($membre = $stmt->fetch(PDO::FETCH_OBJ)) {
                // si le statut est actif
                if ($membre->actif == 1) {

                    //si c'est un membre
                    if ($membre->role === "M") {
                        $_SESSION['membre'] = $membre->idMembre;
                    } else if ($membre->role === "A") {
                        $_SESSION['admin'] = $membre->idMembre;
                    }
                } else { // si inactif
                    $msgErreur = "Compte inactif. Contacter un employé";
                }
            } else { //si le membre n'existe pas dans la bd
                $msgErreur = "Erreur de connexion. Vérifiez vos paramètes de connexion";
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $msgErreur;
    }
    public function changerStatutMembre(int $statut, int $idMembre)
    {
        try {
            //modifie le statut
            $requete = "UPDATE connexion SET statut=? WHERE idMembre=?";
            $this->setRequete($requete);
            $this->setParams(array($statut, $idMembre));
            $stmt = $this->executer();
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }

    public function afficherHistoriqueMembre(int $idMembre): array
    {
        try {
            $tab = array();
            $requete = "SELECT h.idMembre, f.idFilm, f.titre, h.dateAchat, f.image FROM historiquelocation h INNER JOIN films f ON h.idFilm = f.idFilm WHERE h.idMembre = ? ORDER by h.dateAchat DESC";
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
    public function getMembre(int $idMembre): Membre
    {
        try {
            $requete = $requete = "SELECT m.idMembre, m.nom, m.prenom, m.courriel, m.numeroTelephone, m.description, m.actif, m.prive, m.imageProfil, m.membrePremium, m.dateFinAbonnement, c.motDePasse, m.role, FROM membres m INNER JOIN connexion c ON m.idMembre = c.idMembre WHERE m.idMembre = ?";
            $this->setRequete($requete);
            $this->setParams(array($idMembre));
            $stmt = $this->executer();

            if ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $unMembre = new Membre($ligne->idMembre, $ligne->nom, $ligne->prenom, $ligne->courriel, $ligne->numeroTelephone, $ligne->description, $ligne->actif, $ligne->prive, $ligne->imageProfil, $ligne->membrePremium, $ligne->dateFinAbonnement, $ligne->motDePasse, $ligne->role);
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $unMembre;
    }
}

?>