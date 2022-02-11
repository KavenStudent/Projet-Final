-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2022 at 11:49 PM
-- Server version: 5.7.17
-- PHP Version: 7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bdforuban`
--
CREATE DATABASE IF NOT EXISTS `bdforuban` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `bdforuban`;

-- --------------------------------------------------------

--
-- Table structure for table `connexion`
--

CREATE TABLE `connexion` (
  `idMembre` int(11) NOT NULL,
  `courriel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `motDePasse` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `actif` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `connexion`
--

INSERT INTO `connexion` (`idMembre`, `courriel`, `motDePasse`, `role`, `actif`) VALUES
(3, 'joanie.birtz@gmail.com', '12345678', 'M', 1);

-- --------------------------------------------------------

--
-- Table structure for table `historiquepaiement`
--

CREATE TABLE `historiquepaiement` (
  `id` int(11) NOT NULL,
  `cout` float NOT NULL,
  `date` date NOT NULL,
  `idMembre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `membre`
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
-- Dumping data for table `membre`
--

INSERT INTO `membre` (`id`, `nom`, `prenom`, `courriel`, `numeroTelephone`, `description`, `prive`, `imageProfil`, `membrePremium`, `dateFinAbonnement`) VALUES
(3, 'Birtz', 'Joanie', 'joanie.birtz@gmail.com', '', 'Etudiant infomatique', 0, 'ae883cf20302d83668ee603d2d1ee3459d5bc201.png', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `membreprojet`
--

CREATE TABLE `membreprojet` (
  `idMembre` int(11) NOT NULL,
  `idProjet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `membreprojet`
--

INSERT INTO `membreprojet` (`idMembre`, `idProjet`) VALUES
(3, 7);

-- --------------------------------------------------------

--
-- Table structure for table `projet`
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

--
-- Dumping data for table `projet`
--

INSERT INTO `projet` (`id`, `idCreateur`, `titre`, `description`, `path`, `prive`, `autreParticipant`, `nbTelechargement`, `lienExterne`, `nbSignalisation`, `thumbnail`) VALUES
(7, 3, 'kajo', 'very', '', 0, NULL, 0, NULL, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `projettag`
--

CREATE TABLE `projettag` (
  `idProjet` int(11) NOT NULL,
  `idTag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `signalisation`
--

CREATE TABLE `signalisation` (
  `id` int(11) NOT NULL,
  `idMembre` int(11) NOT NULL,
  `idProjet` int(11) NOT NULL,
  `description` varchar(1024) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `nomTag` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `nomTag`) VALUES
(1, 'Web'),
(2, 'Js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connexion`
--
ALTER TABLE `connexion`
  ADD KEY `idMembre` (`idMembre`);

--
-- Indexes for table `historiquepaiement`
--
ALTER TABLE `historiquepaiement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMembre` (`idMembre`);

--
-- Indexes for table `membre`
--
ALTER TABLE `membre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membreprojet`
--
ALTER TABLE `membreprojet`
  ADD KEY `idMembre` (`idMembre`),
  ADD KEY `idProjet` (`idProjet`);

--
-- Indexes for table `projet`
--
ALTER TABLE `projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCreateur` (`idCreateur`);

--
-- Indexes for table `projettag`
--
ALTER TABLE `projettag`
  ADD KEY `idProjet` (`idProjet`),
  ADD KEY `idTag` (`idTag`);

--
-- Indexes for table `signalisation`
--
ALTER TABLE `signalisation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMembre` (`idMembre`),
  ADD KEY `idProjet` (`idProjet`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `historiquepaiement`
--
ALTER TABLE `historiquepaiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `projet`
--
ALTER TABLE `projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `signalisation`
--
ALTER TABLE `signalisation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `connexion`
--
ALTER TABLE `connexion`
  ADD CONSTRAINT `fk_idmembre` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `historiquepaiement`
--
ALTER TABLE `historiquepaiement`
  ADD CONSTRAINT `historiquepaiement_ibfk_1` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `membreprojet`
--
ALTER TABLE `membreprojet`
  ADD CONSTRAINT `membreprojet_ibfk_1` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `membreprojet_ibfk_2` FOREIGN KEY (`idProjet`) REFERENCES `projet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_ibfk_2` FOREIGN KEY (`idCreateur`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projettag`
--
ALTER TABLE `projettag`
  ADD CONSTRAINT `projettag_ibfk_1` FOREIGN KEY (`idProjet`) REFERENCES `projet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projettag_ibfk_2` FOREIGN KEY (`idTag`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `signalisation`
--
ALTER TABLE `signalisation`
  ADD CONSTRAINT `signalisation_ibfk_1` FOREIGN KEY (`idMembre`) REFERENCES `membre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `signalisation_ibfk_2` FOREIGN KEY (`idProjet`) REFERENCES `projet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
