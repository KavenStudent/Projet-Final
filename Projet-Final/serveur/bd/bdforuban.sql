-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 03 mars 2022 à 19:43
-- Version du serveur :  5.7.17
-- Version de PHP :  7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `bdforuban`
--
CREATE DATABASE IF NOT EXISTS `bdforuban` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `bdforuban`;

-- --------------------------------------------------------

--
-- Structure de la table `connexion`
--

CREATE TABLE `connexion` (
  `idMembre` int(11) NOT NULL,
  `courriel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `motDePasse` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `actif` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `connexion`
--

INSERT INTO `connexion` (`idMembre`, `courriel`, `motDePasse`, `role`, `actif`) VALUES
(3, 'joanie.birtz@gmail.com', '12345678', 'M', 1),
(4, 'lilou@gmail.com', '123456789', 'M', 1),
(5, 'vim@gmail.com', '123456789', 'M', 1);

-- --------------------------------------------------------

--
-- Structure de la table `historiquepaiement`
--

CREATE TABLE `historiquepaiement` (
  `id` int(11) NOT NULL,
  `cout` float NOT NULL,
  `date` date NOT NULL,
  `idMembre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `membre`
--

CREATE TABLE `membre` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `courriel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `numeroTelephone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prive` int(1) NOT NULL DEFAULT '0',
  `imageProfil` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `membrePremium` int(1) NOT NULL DEFAULT '0',
  `dateFinAbonnement` date DEFAULT NULL,
  `adminLock` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `membre`
--

INSERT INTO `membre` (`id`, `nom`, `prenom`, `courriel`, `numeroTelephone`, `description`, `prive`, `imageProfil`, `membrePremium`, `dateFinAbonnement`, `adminLock`) VALUES
(3, 'Birtz', 'Joanie', 'joanie.birtz@gmail.com', '4506299345', 'Etudiant infomatique', 0, '9052da0252f46f3deb318fca271842930873f5bb.png', 0, NULL, 0),
(4, 'Birtz', 'Joanie', 'lilou@gmail.com', '4384061207', 'test', 0, 'defaultProfil.png', 0, NULL, 0),
(5, 'Nicolas', 'Vim', 'vim@gmail.com', '4384061207', ' trÃ¨s trÃ¨s humble', 1, 'defaultProfil.png', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `membreprojet`
--

CREATE TABLE `membreprojet` (
  `idMembre` int(11) NOT NULL,
  `idProjet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `membreprojet`
--

INSERT INTO `membreprojet` (`idMembre`, `idProjet`) VALUES
(3, 11),
(5, 10);

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

CREATE TABLE `projet` (
  `id` int(11) NOT NULL,
  `idCreateur` int(11) NOT NULL,
  `titre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prive` int(1) NOT NULL DEFAULT '0',
  `autreParticipant` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nbTelechargement` int(11) NOT NULL DEFAULT '0',
  `lienExterne` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nbSignalisation` int(11) NOT NULL DEFAULT '0',
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `adminLock` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `projet`
--

INSERT INTO `projet` (`id`, `idCreateur`, `titre`, `description`, `path`, `prive`, `autreParticipant`, `nbTelechargement`, `lienExterne`, `nbSignalisation`, `thumbnail`, `adminLock`) VALUES
(10, 3, 'Test', 'Yo sa va! .das kjdasljdjaslkdj asldjÃ as dddsasl kdjalsk jddasd jsadkahsdkhaskjdhasdlaskjdlasjdljasslkdjlkasjdljaslkddjlasjkasdjasdskandkjnaskjndkasndkn  kjasdhskjaskjd kjajssdhkjhass kasshdkjj  hasdk  ljadlakjlsajd asljasldjalsk asdjaljdlasjd', '', 0, '', 0, 'https://www.theguardian.com/commentisfree/2015/nov/02/dont-assume-im-an-internet-troll-just-because-you-disagree-with-me', 0, '85643d835606b5a6c57ef9b017a2801357686977.png', 0),
(11, 5, 'test', 'La sauce est nice!', '', 1, 'Sacha', 0, 'https://www.theguardian.com/commentisfree/2015/nov/02/dont-assume-im-an-internet-troll-just-because-you-disagree-with-me', 0, '6509c2d0d9099a834ddbb1dcee84cf6e7e877487.jpg', 0),
(25, 3, 'asd', 'asd', '', 0, '', 0, '', 0, 'defaultThumbnail.png', 0);

-- --------------------------------------------------------

--
-- Structure de la table `projettag`
--

CREATE TABLE `projettag` (
  `idProjet` int(11) NOT NULL,
  `idTag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `projettag`
--

INSERT INTO `projettag` (`idProjet`, `idTag`) VALUES
(11, 5),
(11, 6),
(10, 2),
(10, 3),
(10, 5);

-- --------------------------------------------------------

--
-- Structure de la table `signalisation`
--

CREATE TABLE `signalisation` (
  `id` int(11) NOT NULL,
  `idMembre` int(11) NOT NULL,
  `idProjet` int(11) DEFAULT NULL,
  `description` varchar(1024) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `nomTag` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `tag`
--

INSERT INTO `tag` (`id`, `nomTag`) VALUES
(1, 'Web'),
(2, 'Js'),
(3, 'java'),
(4, 'Test'),
(5, 'Fruit'),
(6, 'Cool'),
(7, 'Lolo'),
(8, 'op'),
(9, 'Fixe'),
(10, 'sa'),
(11, 'asd'),
(12, '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `connexion`
--
ALTER TABLE `connexion`
  ADD KEY `idMembre` (`idMembre`);

--
-- Index pour la table `historiquepaiement`
--
ALTER TABLE `historiquepaiement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMembre` (`idMembre`);

--
-- Index pour la table `membre`
--
ALTER TABLE `membre`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `membreprojet`
--
ALTER TABLE `membreprojet`
  ADD KEY `idMembre` (`idMembre`),
  ADD KEY `idProjet` (`idProjet`);

--
-- Index pour la table `projet`
--
ALTER TABLE `projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCreateur` (`idCreateur`);

--
-- Index pour la table `projettag`
--
ALTER TABLE `projettag`
  ADD KEY `idProjet` (`idProjet`),
  ADD KEY `idTag` (`idTag`);

--
-- Index pour la table `signalisation`
--
ALTER TABLE `signalisation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMembre` (`idMembre`),
  ADD KEY `idProjet` (`idProjet`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `historiquepaiement`
--
ALTER TABLE `historiquepaiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `projet`
--
ALTER TABLE `projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pour la table `signalisation`
--
ALTER TABLE `signalisation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `connexion`
--
ALTER TABLE `connexion`
  ADD CONSTRAINT `fk_idmembre` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `historiquepaiement`
--
ALTER TABLE `historiquepaiement`
  ADD CONSTRAINT `historiquepaiement_ibfk_1` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `membreprojet`
--
ALTER TABLE `membreprojet`
  ADD CONSTRAINT `membreprojet_ibfk_1` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `membreprojet_ibfk_2` FOREIGN KEY (`idProjet`) REFERENCES `projet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_ibfk_2` FOREIGN KEY (`idCreateur`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `projettag`
--
ALTER TABLE `projettag`
  ADD CONSTRAINT `projettag_ibfk_1` FOREIGN KEY (`idProjet`) REFERENCES `projet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projettag_ibfk_2` FOREIGN KEY (`idTag`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `signalisation`
--
ALTER TABLE `signalisation`
  ADD CONSTRAINT `signalisation_ibfk_1` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `signalisation_ibfk_2` FOREIGN KEY (`idProjet`) REFERENCES `projet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
