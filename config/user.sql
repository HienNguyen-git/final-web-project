-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2022 at 10:43 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT -1,
  `last_modified` datetime NOT NULL DEFAULT current_timestamp(),
  `login_attempts` int(11) NOT NULL DEFAULT 0,
  `abnormal` int(11) NOT NULL,
  `login_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `status`, `last_modified`, `login_attempts`, `abnormal`, `login_date`) VALUES
(1, 'admin', '$2a$12$G0bqH0PVQmBumlSh.8N8PumaxpU0VV95isT/ZtZ.IaMea/kKnJ4Ui', 1, '2022-05-18 12:42:54', 4, 0, '2022-05-30 13:43:21'),
(2, 'tdtnguyendang@gmail.com', '$2b$10$28Ozj6sPswGEBlF46E/Iv.gwpyJXmwT7Y1JmMiUB5nDTLKiuhY00e', 1, '2022-05-18 20:53:25', 0, 0, '2022-05-28 16:46:29'),
(3, 'user1', '123456', 0, '2022-05-22 14:31:00', 2, 0, '2022-05-30 13:03:25'),
(4, 'user2', '123456', 2, '2022-05-22 14:31:00', 0, 0, '2022-05-28 16:46:29'),
(5, 'user3', '123456', 3, '2022-05-22 14:31:00', 0, 0, '2022-05-28 16:46:29'),
(6, '1234', '$2b$10$AmINBMk3u2HlnImAIae9seNJcXm.mVig6wks7LHoAiV49zCWmfMWa', 0, '2022-05-30 15:09:41', 9, 1, '2022-05-30 16:02:54'),
(8, '3794116032', '$2b$10$HtAx30yQDiyr0L8XP8wLSuJVywdPpuHkQdmv.TbIQnq7mWG9pgTni', 0, '2022-05-31 03:40:13', 0, 0, '2022-05-31 03:40:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
