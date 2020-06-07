-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 17. Mai 2020 um 17:04
-- Server-Version: 10.3.22-MariaDB-0+deb10u1
-- PHP-Version: 7.3.11-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Datenbank: `accountoverview`
--
CREATE DATABASE IF NOT EXISTS `accountoverview` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `accountoverview`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales` (
  `salesId` bigint(20) NOT NULL,
  `dateOfValue` date NOT NULL COMMENT 'Buchungstag',
  `creditValueDate` date NOT NULL COMMENT 'Wertstellungstag',
  `purpose` varchar(255) NOT NULL COMMENT 'Verwendungszweck',
  `value` decimal(10,2) NOT NULL COMMENT 'Umsatz',
  `currency` varchar(16) NOT NULL COMMENT 'Währung',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`salesId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `sales`
--
ALTER TABLE `sales`
  MODIFY `salesId` bigint(20) NOT NULL AUTO_INCREMENT;