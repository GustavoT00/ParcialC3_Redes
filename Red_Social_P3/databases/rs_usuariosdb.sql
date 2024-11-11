-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-11-2024 a las 20:39:28
-- Versión del servidor: 8.0.30
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rs_usuariosdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre_completo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `usuario` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `rol` enum('administrador','usuario') COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('conectado','desconectado') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_completo`, `usuario`, `password`, `rol`, `estado`) VALUES
(1, 'admin1', 'admin1', '$2b$10$NuO6HqPCeJqVO0hkZ6Dpju5BgdGdlarW/m8ZZoym8dhvoVk.JgSq6', 'administrador', 'desconectado'),
(2, 'Gustavo_Tovar', 'tovar_gustavo', '$2b$10$vX7x7hdFCv2CJBivrAllFeYweM024y6SVOsu/vwr2TcR84HId4Cne', 'usuario', 'conectado'),
(3, 'Nicolas Barona', 'parrenson', '$2b$10$f2LXUcmBmPtf1N5U/dbom.Rmn8xtt/oRQMg.68qv7BZ7uLXSb4ylu', 'administrador', 'conectado'),
(6, 'Juan Barona', 'jbarona', '$2b$10$6hm4WryYjmMTVUfDDCUFwulzxBEwN.FpFPV8267V5ZtLtaVVDgDUq', 'administrador', 'desconectado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
