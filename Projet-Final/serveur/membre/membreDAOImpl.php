<?php

use LDAP\Result;

require_once("membre.php");
require_once("membreDAO.php");
require_once("../includes/modele.inc.php");
// require_once("Projet-Final/serveur/includes/modele.inc.php");    // Utiliser ce require pour les tests

class MembreDaoImpl extends Modele implements MembreDao
{

    public function getAllMembre(): array
    {
        try {
            $tab = array();
            $requete = "SELECT m.id, m.prive, m.prenom, m.nom, m.imageProfil, c.actif, c.role FROM membre m INNER JOIN connexion c ON m.id = c.idMembre";
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

    public function enregistrerMembre(Membre $Membre): bool
    {
        try {
            // enregistre dans membre
            $requete = "INSERT INTO membre VALUES(0,?,?,?,?,?,?,?,?,?,?)";
            $this->setRequete($requete);
            $this->setParams(array(
                $Membre->getNom(), $Membre->getPrenom(), $Membre->getCourriel(), $Membre->getNumeroTelephone(),
                $Membre->getDescription(), $Membre->getPrive(), $Membre->getImageProfil(), $Membre->getMembrePremium(), null, $Membre->getAdminLock()
            ));
            $stmt = $this->executer();
            $lastId = $this->getLastId();
            // enregistre dans connexion
            $requete = "INSERT INTO connexion VALUES(?,?,?,?,?)";
            $this->setRequete($requete);
            $this->setParams(array($lastId, $Membre->getCourriel(), $Membre->getMotdePasse(), $Membre->getRole(), $Membre->getActif()));
            $stmt = $this->executer();
            $result = true;
        } catch (Exception $e) {
            // echo $e->getMessage();
            $result = false;
        } finally {
            unset($requete);
            return $result;
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
    public function modifierMembre(Membre $Membre, $dossier): bool
    {
        try {
            $result = true;
            // cherche l'image du film a modifier
            $requete = "SELECT imageProfil, adminLock FROM membre WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array($Membre->getId()));
            $stmt = $this->executer();
            $ligne = $stmt->fetch(PDO::FETCH_OBJ);
            $ancienneImage = $ligne->imageProfil;
            $adminLock = $ligne->adminLock;

            $image = $this->verserFichier($dossier, "imageProfil", $ancienneImage, $Membre->getNom() . $Membre->getPrenom());

            if ($adminLock) {
                $prive = $adminLock;
                $result = false;
            } else {
                $prive = $Membre->getPrive();
            }

            // modifie dans membre
            $requete = "UPDATE membre SET nom=?,prenom=?,courriel=?,numeroTelephone=?,description=?,prive=?,imageProfil=? WHERE id=?";
            $this->setRequete($requete);
            $this->setParams(array(
                $Membre->getNom(), $Membre->getPrenom(), $Membre->getCourriel(), $Membre->getNumeroTelephone(),
                $Membre->getDescription(), $prive, $image, $Membre->getId()
            ));
            $stmt = $this->executer();

            // modifie dans connexion
            $requete = "UPDATE connexion SET courriel=?,motDePasse=?, actif=? WHERE idMembre=?";
            $this->setRequete($requete);
            $this->setParams(array($Membre->getCourriel(), $Membre->getMotdePasse(), $Membre->getActif(), $Membre->getId()));
            $stmt = $this->executer();

            
        } catch (Exception $e) {
            echo $e->getMessage();
            $result = false;
        } finally {
            unset($requete);
            return $result;
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
    public function changerStatutActif(int $statut, int $idMembre): bool
    {
        try {
            //modifie le statut
            $requete = "UPDATE connexion SET statut=? WHERE idMembre=?";
            $this->setRequete($requete);
            $this->setParams(array($statut, $idMembre));
            $stmt = $this->executer();
            $result = true;
        } catch (Exception $e) {
            echo $e->getMessage();
            $result = false;
        } finally {
            unset($requete);
            return $result;
        }
    }
    public function mettreProfilPrive(int $prive, int $idMembre): bool
    {
        return true;
    }

    public function devenirPremium(int $idMembre): bool
    {
        return true;
    }

    public function afficherHistoriqueAbonnement(int $idMembre): array
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
            $requete = "SELECT m.id, m.nom, m.prenom, m.courriel, m.numeroTelephone,
             m.description, c.actif, m.prive, m.imageProfil, m.membrePremium, 
            m.dateFinAbonnement, c.motDePasse, c.role, c.actif, m.adminLock
             FROM membre m INNER JOIN connexion c ON m.id = c.idMembre WHERE m.id = ?";
            $this->setRequete($requete);
            $this->setParams(array($idMembre));
            $stmt = $this->executer();

            if ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                // $unMembre = $ligne;
                if ($ligne->dateFinAbonnement == null) {
                    $laDate = '';
                } else {
                    $laDate = $ligne->dateFinAbonnement;
                }
                if ($ligne->imageProfil == null) {
                    $monImageProfil = 'defaultProfil.png';
                } else {
                    $monImageProfil = $ligne->imageProfil;
                }
                $unMembre = new Membre(
                    $ligne->id,
                    $ligne->prenom,
                    $ligne->nom,
                    $ligne->courriel,
                    $ligne->numeroTelephone,
                    $ligne->description,
                    $ligne->actif,
                    $ligne->prive,
                    $monImageProfil,
                    $ligne->membrePremium,
                    $laDate,
                    $ligne->motDePasse,
                    $ligne->role,
                    $ligne->adminLock
                );
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
        return $unMembre;
    }

    public function getLastMembreId(): int
    {
        $requete = "SELECT id FROM membre ORDER BY id DESC LIMIT 1";
        $this->setRequete($requete);
        $this->setParams(array());
        $stmt = $this->executer();
        $ligne = $stmt->fetch(PDO::FETCH_OBJ);

        return $ligne->id;
    }

    public function getAllSignalisation(): array
    {
        try {
            $tab = array();
            $requete = "SELECT membre.id as idMembre, membre.imageProfil, membre.prenom, membre.nom, COUNT(*) as nb FROM signalisation inner JOIN membre
             ON idMembre = membre.id GROUP BY signalisation.idMembre ORDER BY COUNT(*) DESC";
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

    public function checkAbonnementMembre(int $idMembre): bool
    {
        try {
            $requete = "SELECT membrePremium FROM membre WHERE id = ?";
            $this->setRequete($requete);
            $this->setParams(array($idMembre));
            $stmt = $this->executer();

            return $stmt->fetch(PDO::FETCH_OBJ);
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }

    public function addSignalement(int $idMembre, int $idProjet, string $description): bool
    {
        $resultat = false;
        try {

            if ($idProjet == -1) {
                $requete = "INSERT INTO signalisation (id, idMembre, idProjet ,description) VALUES (0, ?, NULL, ?)";
                $this->setRequete($requete);
                $this->setParams(array($idMembre, $description));
            } else {
                $requete = "INSERT INTO signalisation (id, idMembre, idProjet ,description) VALUES (0, ?, ?, ?)";
                $this->setRequete($requete);
                $this->setParams(array($idMembre, $idProjet, $description));
            }
            $this->executer();
            $resultat = true;
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
            return $resultat;
        }
    }

    public function adminCacherMembre(int $idMembre, int $valeur): bool
    {
        $returnValue = false;
        try {
            $requete = "UPDATE membre SET prive=?, adminLock=? WHERE id = ?";
            $this->setRequete($requete);
            $this->setParams(array($valeur, $valeur, $idMembre));
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