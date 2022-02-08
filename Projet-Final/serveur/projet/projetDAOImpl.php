<?php
class MembreDaoImpl extends Modele implements MembreDao
{
    public function getProjet($id): Projet {
        
    }
    public function getAllProjetsForMembre($idMembre): array {
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
}
?>