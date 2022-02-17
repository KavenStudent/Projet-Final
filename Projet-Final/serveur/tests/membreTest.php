<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

require_once("vendor/autoload.php");
require_once("./Projet-Final/serveur/includes/modele.inc.php");
require_once("./Projet-Final/serveur/membre/membre.php");
require_once("./Projet-Final/serveur/membre/membreDAOImpl.php");

final class MembreTest extends TestCase
{
    // public function testGetAllMembreReturnsNotEmptyList() {
    //     // Arrange

    //     // Act
    //     // Assert
    // }

    public function testEnregistrerMembreReturnsTrueOnValidMembre() {
        // Arrange
        $dao = new MembreDaoImpl();
        $membre = new Membre(0, "nom", 'prenom', 'courriel', 'telephone', 'description', 1, 0, 'pathImage', 0, "date", 'password', 'M');
        // Act
        $actual = $dao->enregistrerMembre($membre);
        // Assert
        $this->assertTrue($actual);
    }
    public function testEnregistrerMembreReturnsFalseOnInvalidMembre() {
        // Arrange
        $dao = new MembreDaoImpl();
        $membreOld = new Membre(-1,"","","1@1","","",0,0,"",0,"","","");
        $dao->enregistrerMembre($membreOld);
        $membreNew = new Membre(-1,"","","1@1","","",0,0,"",0,"","","");
        // Act
        $actual = $dao->enregistrerMembre($membreNew);
        // Assert
        $this->assertFalse($actual);
    }

    // public function testReturnsMembreFromValidId(): void
    // {
    //     $membreDaoImpl = new MembreDaoImpl();
    //     $this->assertInstanceOf(Membre::class, $membreDaoImpl->getMembreById(17));
    // }

    // public function testReturnsNullFromInvalidId(): void
    // {
    //     $membreDaoImpl = new MembreDaoImpl();
    //     $this->assertNull($membreDaoImpl->getMembreById(-1));
    // }
}