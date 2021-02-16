-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 16 fév. 2021 à 16:42
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `database_development`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `articles_ibfk_1` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `userId`, `title`, `content`, `image`, `createdAt`, `updatedAt`) VALUES
(7, 24, 'ça marche', 'je suis heureux', NULL, '2021-02-13 08:59:16', '2021-02-13 08:59:16'),
(8, 24, 'mon nouvel article', 'c\'est de mla balle!', NULL, '2021-02-16 14:18:16', '2021-02-16 14:18:16'),
(9, 24, 'Mon nouveau message', 'Je voulais dire que c\'était bien ce site', NULL, '2021-02-16 14:57:51', '2021-02-16 14:57:51'),
(10, 24, 'Encore un nouvel article pour le fun', 'Parce que j\'adore raconter ma vie', NULL, '2021-02-16 15:01:43', '2021-02-16 15:01:43'),
(11, 24, 'bienvenue sur mon article', 'content d\'être là', NULL, '2021-02-16 15:07:11', '2021-02-16 15:07:11'),
(16, 25, 'Règles du réseau', 'Merci de rester respectueux et courtois dans vos échanges. Tous messages malveillants et/ou malintentionné sera supprimé. Bonne navigation sur le site! :)', NULL, '2021-02-16 15:41:03', '2021-02-16 15:41:03'),
(17, 25, 'nouvel avertissement', 'Attention je suis le grand méchant admin', NULL, '2021-02-16 15:48:27', '2021-02-16 15:48:27'),
(18, 25, 'Et un dernier pour la route', 'Attention à vos écrits mes ptits loups.', NULL, '2021-02-16 15:49:32', '2021-02-16 15:49:32'),
(19, 24, 'Oui monsieur l\'admin', 'Il a pas l\'air commode cette admin... On dirait une armoire à glace... Armoire, commode... ok je sors.', NULL, '2021-02-16 15:53:45', '2021-02-16 15:53:45'),
(20, 24, 'Ne me bannissez pas pour une mauvaise blague', 'Je saius que mon humour laisse à désirer mais j\'ose espérer qu\'il fait rire quelqu\'un d\'autre que ma grand mère.', NULL, '2021-02-16 15:58:21', '2021-02-16 15:58:21'),
(21, 24, 'je tente des trucs', 'et je galère bien quand même', NULL, '2021-02-16 16:10:26', '2021-02-16 16:10:26'),
(22, 24, 'et je reteste autant qu\'il faut', 'Mais faut que ça fonctionne à un moment donné.', NULL, '2021-02-16 16:11:44', '2021-02-16 16:11:44'),
(23, 24, 'sdnhgsdf', 'df,jgufdgdgfbjfbjbjdbfbgbbrb  hudrfhg kbkud fgdkvb ', NULL, '2021-02-16 16:33:23', '2021-02-16 16:33:23'),
(24, 24, 'popopopopo', 'poopoopop opopo popopo popop opopo popopopop opopopo pop', NULL, '2021-02-16 16:35:24', '2021-02-16 16:35:24');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_ibfk_1` (`articleId`),
  KEY `comments_ibfk_2` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210202120140-create-user.js'),
('20210202120417-create-article.js'),
('20210202120526-create-comment.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `image`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(24, 'axel1@test.com', '$2b$05$f.hV/OGrLNXQV.JIGW3yIeCN8e2EhZWoKlS1c6LnuplmsRSfhj8iG', 'Axoul', NULL, 0, '2021-02-11 13:24:27', '2021-02-11 13:24:27'),
(25, 'iamtheadmin@groupomania.com', '$2b$05$dxKgkNqJWSQeDJP.21ptWOwkMIYokRwV10p1y66yODtkd3sGESTH.', 'Admin', NULL, 1, '2021-02-13 19:54:17', '2021-02-13 19:54:17');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
