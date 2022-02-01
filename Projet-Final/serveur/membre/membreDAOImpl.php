<?php 
require_once("membre.php");
require_once("MembreDAO.php");

class MembreDaoImp extends Modele implements MembreDao
{

    public function getAllMembre(): array
    {
        try {
            $tab = array();
            $requete = "SELECT m.id, m.nom, m.prenom, m.courriel, m.numeroTelephone, m.description, m.actif, m.prive, m.imageProfil, m.membrePremium, m.dateFinAbonnement, c.role FROM membre m INNER JOIN connexion c ON m.idMembre = c.idMembre";
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
                    $requete = "SELECT m.id, m.nom, m.prenom, m.courriel, m.numeroTelephone, m.description, m.actif, m.prive, m.imageProfil, m.membrePremium, m.dateFinAbonnement, c.role FROM membre m INNER JOIN connexion c ON m.idMembre = c.idMembre WHERE LOWER(nom) LIKE CONCAT('%', ?, '%') OR LOWER(prenom) LIKE CONCAT('%', ?, '%')";
                    break;
                case "tout":
                    $requete = "SELECT m.id, m.nom, m.prenom, m.courriel, m.numeroTelephone, m.description, m.actif, m.prive, m.imageProfil, m.membrePremium, m.dateFinAbonnement, c.role FROM membre m INNER JOIN connexion c ON m.idMembre = c.idMembre WHERE 1=? OR 1=?";
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
            $requete = "INSERT INTO membre VALUES(0,?,?,?,?,?,?,?,?,?,?)";
            $this->setRequete($requete);
            $this->setParams(array($Membre->getNom(), $Membre->getPrenom(), $Membre->getCourriel(), $Membre->getNumeroTelephone(), $Membre->getDescription(), $Membre->getActif(), $Membre->getPrive(), $Membre->getImageProfil(), $Membre->getMembrePremium(), $Membre->getDateFinAbonnement()));
            $stmt = $this->executer();

            // enregistre dans connexion
            $requete = "INSERT INTO connexion VALUES(0,?,?,?)";
            $this->setRequete($requete);
            $this->setParams(array($Membre->getCourriel(), $Membre->getMotdePasse(),'M'));
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
    public function verifierCourrielModifier(string $courriel, int $idMembre): bool
    {
        try {
            $existe = false;
            $requete = "SELECT * FROM membre WHERE courriel=? and id NOT IN ($idMembre)";
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
    public function changerStatutActif(int $actif, int $idMembre)
    {
        try {
            //modifie le statut actif
            $requete = "UPDATE membre SET actif=? WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array($actif, $idMembre));
            $stmt = $this->executer();
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }
    public function mettreProfilPrive(int $prive, int $idMembre)
    {
        try {
            //modifie le statut
            $requete = "UPDATE membre SET prive=? WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array($prive, $idMembre));
            $stmt = $this->executer();
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }

    public function devenirPremium(int $idMembre)
    {
        try {
            $today = strtotime(date("Y-m-d"));
            $finAbonnement = date("Y-m-d", strtotime("+1 month", $today));
            $requete = "UPDATE membre SET membrePremium=?,dateFinAbonnement=? WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array(1, $finAbonnement, $idMembre));
            $stmt = $this->executer();
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }

    // a changer
    public function afficherHistoriqueAbonnement(int $idMembre): array
    {
        try {
            $tab = array();
            $requete = "SELECT * FROM historiquepaiement WHERE idMembre = ? ORDER by date DESC";
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
