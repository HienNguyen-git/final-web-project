-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2022 at 09:07 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

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
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(13, '0908123456', '0908789456', 6000000, 300000, 'sender', 'qweqwewqe', 0, '2022-05-20 16:06:32'),
(14, '0908123456', '0908789456', 7000000, 350000, 'sender', 'qweqwewqe', 0, '2022-05-20 15:57:05'),
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
(26, '0908123456', '0908789456', 6000000, 300000, 'sender', 'qweqwewqe', 0, '2022-05-21 10:09:42');

-- --------------------------------------------------------

--
-- Table structure for table `network_provider`
--

CREATE TABLE `network_provider` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `provider_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `network_provider`
--

INSERT INTO `network_provider` (`id`, `name`, `provider_number`) VALUES
(1, 'Viettel', 11111),
(2, 'Mobifone ', 22222),
(3, 'Vinaphone ', 33333);

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
(127, 'tdtnguyendang@gmail.com', '495657', '2022-05-21 10:14:38');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `last_modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `status`, `last_modified`) VALUES
(1, 'admin', '$2a$12$G0bqH0PVQmBumlSh.8N8PumaxpU0VV95isT/ZtZ.IaMea/kKnJ4Ui', 1, '2022-05-18 12:42:54'),
(2, 'tdtnguyendang@gmail.com', '$2b$10$zVT5FZZlpLxOsDkJmTvmxOK93maWBxlzk/lvzQZ9d4qNxIT.7y28S', 1, '2022-05-18 20:53:25');

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
(1, 'haidang', '0908123456', 'tdtnguyendang@gmail.com', 'Hải Đăng', '2022-05-03', '18 Trần Phú P18 Q18 TPHCM', 'cmnd ', 'cmnd', 10000000),
(2, 'tronghien', '0908789456', 'tdtnguyendang@gmail.com', 'Trọng Hiển', '2022-05-04', '22 Dương Bá Trạc P8 Q8 TPHCM', 'cmnd', 'cmnd', 20000000);

-- --------------------------------------------------------

--
-- Table structure for table `withdraw`
--

CREATE TABLE `withdraw` (
  `id` int(11) NOT NULL,
  `username` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `value` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `fee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `credit_card`
--
ALTER TABLE `credit_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `network_provider`
--
ALTER TABLE `network_provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `withdraw`
--
ALTER TABLE `withdraw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
