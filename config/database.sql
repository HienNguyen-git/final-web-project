-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2022 at 08:40 AM
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
CREATE DATABASE IF NOT EXISTS `database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `database`;
  
-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `provider_number` int(11) NOT NULL,
  `code` varchar(1000) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id`, `username`, `provider_number`, `code`, `price`, `quantity`, `date`) VALUES
(1, 'user1', 11111, '1111196504', 50000, 1, '2022-05-29 15:48:13'),
(2, '1234', 11111, '1111157263', 50000, 1, '2022-05-31 13:27:24');

-- --------------------------------------------------------

--
-- Table structure for table `credit_card`
--

CREATE TABLE `credit_card` (
  `id` int(11) NOT NULL,
  `card_number` int(11) NOT NULL,
  `expire_date` date NOT NULL,
  `cvv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `credit_card`
--

INSERT INTO `credit_card` (`id`, `card_number`, `expire_date`, `cvv`) VALUES
(1, 111111, '2022-10-10', 411),
(2, 222222, '2022-11-11', 443),
(3, 333333, '2022-12-12', 577);

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

CREATE TABLE `deposit` (
  `id` int(11) NOT NULL,
  `phone_sender` varchar(255) NOT NULL,
  `phone_receiver` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `fee` int(11) NOT NULL,
  `feeperson` varchar(255) NOT NULL,
  `note` varchar(1000) NOT NULL,
  `status` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`id`, `phone_sender`, `phone_receiver`, `value`, `fee`, `feeperson`, `note`, `status`, `date`) VALUES
(12, '0908577254', '0908789456', 200000, 10000, 'sender', 'qweqwewqe', 1, '2022-05-19 15:32:51'),
(13, '0908123456', '0908789456', 6000000, 300000, 'sender', 'qweqwewqe', -1, '2022-05-31 03:20:30'),
(14, '0908123456', '0908789456', 7000000, 350000, 'sender', 'qweqwewqe', 1, '2022-05-25 05:57:00'),
(15, '0908577254', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:13:22'),
(16, '0908577254', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:17:07'),
(17, '0908577254', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:20:56'),
(18, '0908577254', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:22:52'),
(19, '0908577254', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:24:46'),
(20, '0908577254', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:27:31'),
(21, '0908577254', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:30:52'),
(22, '0908123456', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:32:38'),
(23, '0908123456', '0908789456', 1000000, 50000, 'sender', 'qweqwewqe', 1, '2022-05-19 16:42:18'),
(24, '0908123456', '0908789456', 1000000, 50000, 'receiver', 'qweqwewqe', 1, '2022-05-19 16:42:45'),
(25, '0908123456', '0908789456', 1000000, 50000, 'receiver', 'qweqwewqe', 1, '2022-05-19 16:43:34'),
(26, '0908123456', '0908789456', 6000000, 300000, 'sender', 'qweqwewqe', -1, '2022-05-30 02:58:55'),
(27, '0908123456', '0908789456', 6000000, 300000, 'sender', 'qweqwewqeqwe', 1, '2022-05-22 07:17:22'),
(28, '0908123456', '0908789456', 2000000, 100000, 'receiver', 'qweqwewqe', 1, '2022-05-22 07:18:53'),
(29, '0999323933', '0999323933', 50000, 2500, 'sender', 'asd', 2, '2022-05-31 03:57:31'),
(30, '0999323933', '0999323933', 6000000, 300000, 'sender', 'asd', -1, '2022-05-31 05:59:46');

-- --------------------------------------------------------

--
-- Table structure for table `network_provider`
--

CREATE TABLE `network_provider` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `provider_number` int(11) NOT NULL,
  `fee` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `network_provider`
--

INSERT INTO `network_provider` (`id`, `name`, `provider_number`, `fee`) VALUES
(1, 'Viettel', 11111, 0),
(2, 'Mobifone ', 22222, 0),
(3, 'Vinaphone ', 33333, 0);

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otpcode` varchar(255) NOT NULL,
  `expired` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `email`, `otpcode`, `expired`) VALUES
(101, 'tdtnguyendang@gmail.com', '339746', '2022-05-19 14:39:02'),
(102, 'tdtnguyendang@gmail.com', '898524', '2022-05-19 14:48:38'),
(103, 'tdtnguyendang@gmail.com', '923368', '2022-05-19 15:21:08'),
(104, 'tdtnguyendang@gmail.com', '609154', '2022-05-19 15:25:12'),
(105, 'tdtnguyendang@gmail.com', '185591', '2022-05-19 15:26:11'),
(106, 'tdtnguyendang@gmail.com', '567995', '2022-05-19 15:27:22'),
(107, 'tdtnguyendang@gmail.com', '371002', '2022-05-19 15:33:53'),
(108, 'tdtnguyendang@gmail.com', '864656', '2022-05-19 15:34:39'),
(109, 'tdtnguyendang@gmail.com', '825033', '2022-05-19 15:36:29'),
(110, 'tdtnguyendang@gmail.com', '235823', '2022-05-19 16:14:25'),
(111, 'tdtnguyendang@gmail.com', '322274', '2022-05-19 16:18:10'),
(112, 'tdtnguyendang@gmail.com', '953777', '2022-05-19 16:21:58'),
(113, 'tdtnguyendang@gmail.com', '409720', '2022-05-19 16:23:54'),
(114, 'tdtnguyendang@gmail.com', '601033', '2022-05-19 16:25:49'),
(115, 'tdtnguyendang@gmail.com', '788230', '2022-05-19 16:28:34'),
(116, 'tdtnguyendang@gmail.com', '511687', '2022-05-19 16:31:55'),
(117, 'tdtnguyendang@gmail.com', '395937', '2022-05-19 16:33:41'),
(118, 'tdtnguyendang@gmail.com', '743298', '2022-05-19 16:43:21'),
(119, 'tdtnguyendang@gmail.com', '336119', '2022-05-19 16:43:47'),
(120, 'tdtnguyendang@gmail.com', '490158', '2022-05-19 16:44:37'),
(121, 'tdtnguyendang@gmail.com', '237506', '2022-05-21 09:01:49'),
(122, 'tdtnguyendang@gmail.com', '324980', '2022-05-21 10:07:36'),
(123, 'tdtnguyendang@gmail.com', '902324', '2022-05-21 10:09:05'),
(124, 'tdtnguyendang@gmail.com', '734437', '2022-05-21 10:10:47'),
(125, 'tdtnguyendang@gmail.com', '401150', '2022-05-21 10:13:07'),
(126, 'tdtnguyendang@gmail.com', '714476', '2022-05-21 10:13:30'),
(127, 'tdtnguyendang@gmail.com', '495657', '2022-05-21 10:14:38'),
(128, 'tdtnguyendang@gmail.com', '981338', '2022-05-22 07:13:53'),
(129, 'tdtnguyendang@gmail.com', '427846', '2022-05-22 07:15:13'),
(130, 'tdtnguyendang@gmail.com', '642549', '2022-05-22 07:17:18'),
(131, 'tdtnguyendang@gmail.com', '810609', '2022-05-22 07:20:01'),
(132, 'hdrake1302@gmail.com', '880305', '2022-05-30 07:10:35'),
(133, 'hdrake1302@gmail.com', '828120', '2022-05-30 07:13:51'),
(134, 'hdrake1302@gmail.com', '927528', '2022-05-30 08:08:29');

-- --------------------------------------------------------

--
-- Table structure for table `recharge`
--

CREATE TABLE `recharge` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `card_number` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `value` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `recharge`
--

INSERT INTO `recharge` (`id`, `username`, `card_number`, `date`, `value`) VALUES
(1, 'haidang', '111111', '2022-07-05', 10000),
(2, 'haidang', '222222', '2022-05-04', 500000),
(3, '1234', '111111', '2022-04-29', 400000),
(4, '1234', '111111', '2022-04-29', 400000),
(5, '1234', '111111', '2022-04-29', 400000),
(6, '1234', '111111', '2022-04-29', 400000),
(7, '1234', '111111', '2022-04-29', 400000),
(9, 'admin', '111111', '2022-04-30', 400000),
(10, '1234', '111111', '2022-04-30', 2),
(11, '1234', '222222', '2022-04-30', 2),
(12, '1234', '222222', '2022-04-30', 1000000),
(13, '1234', '222222', '2022-04-30', 1000001),
(14, '1234', '222222', '2022-04-30', 1000001),
(15, '1234', '222222', '2022-04-30', 1000001),
(16, '1234', '222222', '2022-04-30', 1000001),
(17, '1234', '222222', '2022-04-30', 1000001),
(18, '1234', '222222', '2022-04-30', 1000001),
(19, '1234', '222222', '2022-04-30', 1000000),
(20, '1234', '333333', '2022-04-30', 1000000),
(21, '1234', '111111', '2022-04-30', 123121),
(22, '1234', '111111', '2022-04-30', 123121),
(23, '1234', '111111', '2022-04-30', 123121),
(24, '1234', '111111', '2022-04-30', 123123),
(25, '3794116032', '111111', '0000-00-00', 100000);

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
(6, '1234', '$2b$10$AmINBMk3u2HlnImAIae9seNJcXm.mVig6wks7LHoAiV49zCWmfMWa', 1, '2022-05-31 12:05:02', 9, 1, '2022-05-30 16:02:54'),
(8, '3794116032', '$2b$10$HtAx30yQDiyr0L8XP8wLSuJVywdPpuHkQdmv.TbIQnq7mWG9pgTni', 1, '2022-05-31 03:44:32', 0, 0, '2022-05-31 03:40:13');

-- --------------------------------------------------------

--
-- Table structure for table `user_detail`
--

CREATE TABLE `user_detail` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `address` varchar(1000) NOT NULL,
  `font_cmnd` varchar(255) NOT NULL,
  `back_cmnd` varchar(255) NOT NULL,
  `total_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_detail`
--

INSERT INTO `user_detail` (`id`, `username`, `phone`, `email`, `name`, `date_of_birth`, `address`, `font_cmnd`, `back_cmnd`, `total_value`) VALUES
(1, 'haidang', '0908123456', 'tdtnguyendang@gmail.com', 'Hải Đăng', '2022-05-03', '18 Trần Phú P18 Q18 TPHCM', 'cmnd ', 'cmnd', -5650000),
(2, 'tronghien', '0908789456', 'tdtnguyendang@gmail.com', 'Trọng Hiển', '2022-05-04', '22 Dương Bá Trạc P8 Q8 TPHCM', 'cmnd', 'cmnd', 34900000),
(3, '1234', '0999323933', 'hdrake1301@gmail.com', 'Đức', '2013-05-01', 'Bình Điền', '1653973502704--dwayne-the-rock-.jpg', '1653973502704--MAS_6984.jpg', 1068123),
(5, '3794116032', '0934333332', 'hdrake1302@gmail.com', 'Hoàng Tấn Đức', '2022-05-17', 'Bình Điền', '1653943210709--dwayne-the-rock-.jpg', '1653943210709--MAS_6984.jpg', 47500);

-- --------------------------------------------------------

--
-- Table structure for table `withdraw`
--

CREATE TABLE `withdraw` (
  `id` int(11) NOT NULL,
  `username` int(11) NOT NULL,
  `card_number` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `value` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `fee` int(11) NOT NULL,
  `note` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `withdraw`
--

INSERT INTO `withdraw` (`id`, `username`, `card_number`, `date`, `value`, `status`, `fee`, `note`) VALUES
(3, 1234, 0, '2022-05-25 14:35:20', 50000, 1, 2500, 'asda'),
(4, 1234, 0, '2022-05-25 14:35:47', 5000000, 2, 250000, 'asda'),
(5, 1234, 0, '2022-05-27 13:20:38', 50000, 1, 2500, '41214'),
(6, 1234, 0, '2022-05-27 13:21:09', 6000000, 2, 300000, '41214'),
(7, 1234, 111111, '2022-05-29 10:22:26', 50000, 1, 2500, 'asdasd'),
(8, 1234, 111111, '2022-05-29 10:23:34', 6000000, -1, 300000, 'asdasd'),
(18, 1234, 111111, '2022-05-30 14:28:08', 5050000, 2, 252500, 'asd'),
(19, 1234, 111111, '2022-05-30 14:30:30', 5050000, -1, 252500, 'asd'),
(20, 2147483647, 111111, '2022-05-31 03:48:12', 50000, -1, 2500, 'rut 50k');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `credit_card`
--
ALTER TABLE `credit_card`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit`
--
ALTER TABLE `deposit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `network_provider`
--
ALTER TABLE `network_provider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recharge`
--
ALTER TABLE `recharge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `withdraw`
--
ALTER TABLE `withdraw`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `credit_card`
--
ALTER TABLE `credit_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `network_provider`
--
ALTER TABLE `network_provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `recharge`
--
ALTER TABLE `recharge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `withdraw`
--
ALTER TABLE `withdraw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
