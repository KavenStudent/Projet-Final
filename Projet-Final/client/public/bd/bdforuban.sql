-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  ven. 11 fév. 2022 à 22:43
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
(1, '1@1', '1', 'M', 1),
(2, '1@2', '1', 'M', 1),
(3, 'joanie.birtz@gmail.com', '12345678', 'M', 1);

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
  `dateFinAbonnement` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `membre`
--

INSERT INTO `membre` (`id`, `nom`, `prenom`, `courriel`, `numeroTelephone`, `description`, `prive`, `imageProfil`, `membrePremium`, `dateFinAbonnement`) VALUES
(1, 'a', 'a', '1@1', '1', '1', 0, 'fffe0a0843607c7269705a2d1760e03a64a0a5dd.png', 0, NULL),
(2, 'a', 'a', '1@2', '1', '1', 0, 'images-profil/defaultProfil.png', 0, NULL),
(3, 'Birtz', 'Joanie', 'joanie.birtz@gmail.com', '', 'Etudiant infomatique', 0, 'ae883cf20302d83668ee603d2d1ee3459d5bc201.png', 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `membreprojet`
--

CREATE TABLE `membreprojet` (
  `idMembre` int(11) NOT NULL,
  `idProjet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `projettag`
--

CREATE TABLE `projettag` (
  `idProjet` int(11) NOT NULL,
  `idTag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `signalisation`
--

CREATE TABLE `signalisation` (
  `id` int(11) NOT NULL,
  `idMembre` int(11) NOT NULL,
  `idProjet` int(11) NOT NULL,
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
(2, 'Js');

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `projet`
--
ALTER TABLE `projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `signalisation`
--
ALTER TABLE `signalisation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  ADD CONSTRAINT `membreprojet_ibfk_1` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_ibfk_1` FOREIGN KEY (`id`) REFERENCES `membreprojet` (`idProjet`) ON DELETE CASCADE ON UPDATE CASCADE;

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
