-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2015 at 05:24 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `spring_new_icg`
--

-- --------------------------------------------------------

--
-- Table structure for table `resumes`
--

CREATE TABLE IF NOT EXISTS `resumes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `resumeTitle` varchar(100) NOT NULL,
  `resumeType` varchar(100) NOT NULL,
  `resumeFile` text NOT NULL,
  `uploadedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `resumes`
--

INSERT INTO `resumes` (`id`, `userId`, `resumeTitle`, `resumeType`, `resumeFile`, `uploadedAt`) VALUES
(1, 1, 'Software Programmer', 'IT', './media/users/1/resumes/abc.pdf', '2015-02-14 14:41:34');

-- --------------------------------------------------------

--
-- Table structure for table `resume_track_requests`
--

CREATE TABLE IF NOT EXISTS `resume_track_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `from` varchar(50) NOT NULL,
  `to` varchar(50) NOT NULL,
  `agency` varchar(50) NOT NULL,
  `recruiter` varchar(50) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `resume` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `resume_track_requests`
--

INSERT INTO `resume_track_requests` (`id`, `userId`, `from`, `to`, `agency`, `recruiter`, `subject`, `content`, `resume`, `createdAt`) VALUES
(1, 1, 'kashyaprahul94@gmail.com', 'a@b.com', 'kj', 'dsakjh', 'kjhkjhads', 'adsda', './media/users/1/resumes/abc.pdf', '2015-02-15 06:37:07');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `sessionId` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `userId`, `sessionId`, `createdAt`) VALUES
(11, 1, 'b13b860c9667419a8ca225f9b56ffdbb', '2015-02-13 09:30:03'),
(12, 1, 'bbce5510267c442ca55398960f236823', '2015-02-14 14:11:49'),
(18, 1, 'fbac4ac127ed4017b8725e34fff8011a', '2015-02-15 05:55:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `activationKey` varchar(50) NOT NULL,
  `userRole` enum('USER','EMPLOYER','ADMIN') NOT NULL,
  `isActivated` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `firstName`, `lastName`, `password`, `activationKey`, `userRole`, `isActivated`) VALUES
(1, 'kashyaprahul94@gmail.com', 'Rahul', 'Kashyap', '213', '02b6514ff3644930a2367357fef057c3', 'USER', 0),
(3, 'a@b.com', 'a', 'b', '123', '610224ad315d42088bee519b7a97e10e', 'USER', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `resumes`
--
ALTER TABLE `resumes`
  ADD CONSTRAINT `userHasResumes` FOREIGN KEY (`userId`) REFERENCES `resumes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `resume_track_requests`
--
ALTER TABLE `resume_track_requests`
  ADD CONSTRAINT `resume_track_requests_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `userHasSessions` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
