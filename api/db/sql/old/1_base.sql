/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for feedback_local_1
CREATE DATABASE IF NOT EXISTS `feedback_local_1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `feedback_local_1`;

-- Dumping structure for table feedback_local_1.organizations
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table feedback_local_1.organizations: ~0 rows (approximately)
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;

-- Dumping structure for table feedback_local_1.organizations_hubs
CREATE TABLE IF NOT EXISTS `organizations_hubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `public` int(1) NOT NULL DEFAULT '0',
  `title` varchar(150) NOT NULL,
  `description` varchar(500) NOT NULL,
  `whitelabel` int(1) NOT NULL DEFAULT '0',
  `brand_name` varchar(150) NOT NULL,
  `brand_logo_url` varchar(2083) DEFAULT NULL,
  `brand_icon_url` varchar(2083) DEFAULT NULL,
  `brand_background_url` varchar(2083) DEFAULT NULL,
  `brand_colors_primary` varchar(150) DEFAULT NULL,
  `brand_colors_background` varchar(150) DEFAULT NULL,
  `domain_native` varchar(150) NOT NULL,
  `domain_custom` varchar(150) DEFAULT NULL,
  `auth_sso_enable` int(1) NOT NULL DEFAULT '0',
  `auth_sso_url` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `domain_native` (`domain_native`),
  UNIQUE KEY `domain_custom` (`domain_custom`),
  KEY `tenant_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table feedback_local_1.organizations_hubs: ~1 rows (approximately)
/*!40000 ALTER TABLE `organizations_hubs` DISABLE KEYS */;
INSERT INTO `organizations_hubs` (`id`, `organization_id`, `public`, `title`, `description`, `whitelabel`, `brand_name`, `brand_logo_url`, `brand_icon_url`, `brand_background_url`, `brand_colors_primary`, `brand_colors_background`, `domain_native`, `domain_custom`, `auth_sso_enable`, `auth_sso_url`) VALUES
	(1, 1, 1, 'Feedback Hub', 'We want to hear what you have to say. Share your ideas, express your thoughts and help us make Battlefield V better!', 0, 'Battlefield V', 'https://data4.origin.com/content/dam/originx/web/app/games/battlefield/battlefield-v/battlefieldv_standard-edition_gdp_logo_800x400_en_US.png', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c54013f-525a-4ab0-80dd-d0c56b419f1c/dcfoc1z-6cb466e1-88ac-4994-a4ff-eb345423355d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzljNTQwMTNmLTUyNWEtNGFiMC04MGRkLWQwYzU2YjQxOWYxY1wvZGNmb2Mxei02Y2I0NjZlMS04OGFjLTQ5OTQtYTRmZi1lYjM0NTQyMzM1NWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cH2LGpSwiy7p9gsDf-Zj9ICJU_B8D7V6BPNfOoMcoDA', 'http://hdqwalls.com/wallpapers/battlefield-5-py.jpg', '#f56c2d', 'rgb(33, 46, 91)', '127.0.0.1', NULL, 0, NULL);
/*!40000 ALTER TABLE `organizations_hubs` ENABLE KEYS */;

-- Dumping structure for table feedback_local_1.organizations_hubs_boards
CREATE TABLE IF NOT EXISTS `organizations_hubs_boards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hub_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `page_id` (`hub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table feedback_local_1.organizations_hubs_boards: ~3 rows (approximately)
/*!40000 ALTER TABLE `organizations_hubs_boards` DISABLE KEYS */;
INSERT INTO `organizations_hubs_boards` (`id`, `hub_id`, `name`, `title`, `created_at`, `updated_at`) VALUES
	(1, 1, 'feature-requests', 'Feature Requests', '0000-00-00 00:00:00', '2019-11-05 20:17:24'),
	(2, 1, 'improvements', 'Improvements', '0000-00-00 00:00:00', '2019-11-05 20:17:25'),
	(3, 1, 'bug-reports', 'Bug Reports', '0000-00-00 00:00:00', '2019-11-05 20:17:23');
/*!40000 ALTER TABLE `organizations_hubs_boards` ENABLE KEYS */;

-- Dumping structure for table feedback_local_1.organizations_hubs_boards_posts
CREATE TABLE IF NOT EXISTS `organizations_hubs_boards_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hub_id` int(11) NOT NULL,
  `board_id` int(11) NOT NULL,
  `title` varchar(70) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `state` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `page_id` (`hub_id`),
  KEY `board_id` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table feedback_local_1.organizations_hubs_boards_posts_comments
CREATE TABLE IF NOT EXISTS `organizations_hubs_boards_posts_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hub_id` int(11) NOT NULL,
  `board_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `state` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `page_id` (`hub_id`),
  KEY `board_id` (`board_id`),
  KEY `post_id` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping structure for table feedback_local_1.organizations_hubs_boards_posts_votes
CREATE TABLE IF NOT EXISTS `organizations_hubs_boards_posts_votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hub_id` int(11) NOT NULL,
  `board_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `state` bit(1) NOT NULL DEFAULT b'0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tenant_id_page_id_board_id_post_id` (`hub_id`,`board_id`,`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping structure for table feedback_local_1.organizations_hubs_boards_states
CREATE TABLE IF NOT EXISTS `organizations_hubs_boards_states` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hub_id` int(11) NOT NULL,
  `board_id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id_page_id_board_id` (`hub_id`,`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table feedback_local_1.organizations_hubs_boards_states: ~1 rows (approximately)
/*!40000 ALTER TABLE `organizations_hubs_boards_states` DISABLE KEYS */;
INSERT INTO `organizations_hubs_boards_states` (`id`, `hub_id`, `board_id`, `title`) VALUES
	(1, 0, 0, 'New');
/*!40000 ALTER TABLE `organizations_hubs_boards_states` ENABLE KEYS */;

-- Dumping structure for table feedback_local_1.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `avatar_url` varchar(4096) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=391 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table feedback_local_1.users_auth_oauth
CREATE TABLE IF NOT EXISTS `users_auth_oauth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `provider` varchar(256) DEFAULT NULL,
  `access_token` varchar(4096) DEFAULT NULL,
  `refresh_token` varchar(4096) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=385 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table feedback_local_1.users_auth_oauth: ~0 rows (approximately)
/*!40000 ALTER TABLE `users_auth_oauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_auth_oauth` ENABLE KEYS */;

-- Dumping structure for table feedback_local_1.users_auth_password
CREATE TABLE IF NOT EXISTS `users_auth_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `hash` varchar(4096) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=387 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
