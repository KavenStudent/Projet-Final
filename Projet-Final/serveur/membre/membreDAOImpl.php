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
            $requete = "SELECT m.id, m.prive, m.prenom, m.nom, m.imageProfil, c.actif, c.role FROM membre m INNER JOIN connexion c ON m.id = c.idMembre WHERE c.role = 'M' ";
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

    public function getAllMembreSuggestion(): array
    {
        try {
            $tab = array();
            $requete = "SELECT m.id, m.prive, m.prenom, m.nom, m.imageProfil, c.actif, c.role FROM membre m INNER JOIN connexion c ON m.id = c.idMembre WHERE m.prive = 0 AND c.role = 'M'";
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

                        $idMembre = $membre->idMembre;
                        $_SESSION['membre'] = $idMembre;

                        $requete = "SELECT * FROM membre WHERE id=?";
                        $this->setRequete($requete);
                        $this->setParams(array($idMembre));
                        $stmt = $this->executer();
                        $ligne = $stmt->fetch(PDO::FETCH_OBJ);
                        $dateFin = $ligne->dateFinAbonnement;

                        if (!is_null($dateFin)) {
                            $tabToday = explode("-", date("Y-m-d"));
                            $tFin = explode("-", $dateFin);

                            $diff = mktime(0, 0, 0, $tFin[1], $tFin[2], $tFin[0]) -
                                mktime(0, 0, 0, $tabToday[1], $tabToday[2], $tabToday[0]);

                            if ($diff <= 0) {
                                $requete = "UPDATE membre SET membrePremium=?, dateFinAbonnement=? WHERE id=?";
                                $this->setRequete($requete);
                                $this->setParams(array(0, null, $idMembre));

                                $to = $ligne->courriel;
                                $dateDebut  = date("Y-m-d", strtotime("-1 month", strtotime($ligne->dateFinAbonnement)));
                                $subject = "Abonnement expir??";
                                $txt = '<html>
                                    <body>
                                        <div class="mailContainer">
                                        <style scoped>
                                            .mailContainer{
                                                display: flex; flex: 1; flex-direction: column;
                                            }
                                        </style>
                                        <p><span style="font-weight: bold">Votre abonnement a expir??!</span></p>' . "\r\n".'
                                        <p><span style="font-weight: bold">Date d\'achat de l\'abonnement: </span></p>' . $dateDebut . "\r\n".'
                                        <p><span style="font-weight: bold">Date de fin d\'abonnement: </span></p>' . $ligne->dateFinAbonnement . "\r\n".'
                                        </div>
                                    </body>
                                </html>';
                                $headers = "From: projeturanus@gmail.com" . "\r\n";
                                $headers .= "Content-type:text/html;charset=UTF-8";

                                mail($to, $subject, $txt, $headers);
                            }
                        }
                    } else if ($membre->role === "A") {
                        $_SESSION['admin'] = $membre->idMembre;
                    }
                } else { // si inactif
                    $msgErreur = "Compte inactif. Contacter un employ??";
                }
            } else { //si le membre n'existe pas dans la bd
                $msgErreur = "Erreur de connexion. V??rifiez vos param??tes de connexion";
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

    public function devenirPremium(int $idMembre): array
    {
        try {
            $tab = array();
            $requete = "UPDATE membre SET membrePremium=?, dateFinAbonnement=? WHERE id=?";
            $today = date("Y-m-d");
            $dateFin  = date("Y-m-d", strtotime("+1 month", strtotime($today)));

            $this->setRequete($requete);
            $this->setParams(array(1, $dateFin, $idMembre));
            $stmt = $this->executer();

            $todayDate = date("Y-m-d");
            $requete = "INSERT INTO historiquepaiement VALUES(0,?,?,?)";
            $this->setRequete($requete);
            $this->setParams(array(4.99, $today, $idMembre));
            $stmt = $this->executer();

            $requete = "SELECT h.id, h.cout, h.date, h.idMembre, m.courriel, m.prenom, m.nom, m.dateFinAbonnement
            FROM historiquepaiement h INNER JOIN membre m ON h.idMembre = m.id ORDER BY h.id DESC LIMIT 1";
            $this->setRequete($requete);
            $this->setParams(array());
            $stmt = $this->executer();

            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $tab[] = $ligne;
            }
            return $tab;
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
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
            $requete = "SELECT membre.id as idMembre, membre.imageProfil, membre.prenom, membre.nom, membre.adminLock, COUNT(signalisation.idMembre) as nb 
            FROM membre LEFT OUTER JOIN signalisation ON membre.id = signalisation.idMembre 
            INNER JOIN connexion ON membre.id = connexion.idMembre where connexion.role = 'M' 
            GROUP BY membre.id ORDER BY COUNT(signalisation.idMembre) DESC";
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
            $ligne = $stmt->fetch(PDO::FETCH_OBJ);

            return $ligne->membrePremium;
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
    public function getFactureMembre(int $idMembre): array
    {
        try {
            $tab = array();
            $requete = "SELECT h.id, h.cout, h.date, h.idMembre, m.courriel, m.prenom, m.nom, m.dateFinAbonnement
            FROM historiquepaiement h INNER JOIN membre m ON h.idMembre = m.id WHERE h.idMembre = ? ORDER BY h.id DESC LIMIT 1 ";
            $this->setRequete($requete);
            $this->setParams(array($idMembre));
            $stmt = $this->executer();

            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $tab[] = $ligne;
            }
            return $tab;
        } catch (Exception $e) {
            echo $e->getMessage();
        } finally {
            unset($requete);
        }
    }
}