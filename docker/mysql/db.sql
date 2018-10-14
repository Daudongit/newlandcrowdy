# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: obin_blank
# Generation Time: 2018-09-12 09:53:04 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table airtime_histories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `airtime_histories`;

CREATE TABLE `airtime_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `quantity` varchar(11) DEFAULT NULL,
  `status` tinyint(11) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone_number` varchar(24) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table bank_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bank_details`;

CREATE TABLE `bank_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `bank_name` varchar(64) DEFAULT '',
  `account_name` varchar(64) DEFAULT '',
  `account_number` varchar(11) DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table banks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `banks`;

CREATE TABLE `banks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `banks` WRITE;
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;

INSERT INTO `banks` (`id`, `name`, `created_at`, `updated_at`)
VALUES
	(1,'Geography',NULL,'2018-08-04 15:00:39'),
	(2,'First bank',NULL,NULL),
	(3,'Oceanic',NULL,NULL),
	(4,'Nice','2018-08-04 15:00:31','2018-08-04 15:00:31');

/*!40000 ALTER TABLE `banks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table deposits
# ------------------------------------------------------------

DROP TABLE IF EXISTS `deposits`;

CREATE TABLE `deposits` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `proof` varchar(128) DEFAULT NULL,
  `status` int(1) DEFAULT '0',
  `reference_no` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table email_templates
# ------------------------------------------------------------

DROP TABLE IF EXISTS `email_templates`;

CREATE TABLE `email_templates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `slug` varchar(256) DEFAULT NULL,
  `value` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `email_templates` WRITE;
/*!40000 ALTER TABLE `email_templates` DISABLE KEYS */;

INSERT INTO `email_templates` (`id`, `title`, `slug`, `value`, `created_at`, `updated_at`, `type`)
VALUES
	(1,'Referral Message','referral_message','Hello there\nNew user details is {{first_name}} {{last_name}} \r\n{{phone_number}} {{email}} {{username}}',NULL,'2018-09-02 12:42:31','sms'),
	(3,'Activation Message','activation_message','We\'re really excited for you to join our community! You\'re just one click away from activating your account.',NULL,NULL,'sms'),
	(4,'Accept Guarantor','accept_guarantor_request','Hi there,\nYou have been requested to be the guarantor for a loan. \nLoan Amount: {{amount}}\nLoan Duration: {{duration}} days\nLoan Interest Rate: {{interest_rate}}\nLoan Application by: {{loan_by}}\nPlease click below to accept the guarantor',NULL,NULL,'sms'),
	(5,'Referral Message','referral_message','Hello there\nNew user details is {{first_name}} {{last_name}} \r\n{{phone_number}} {{email}} {{username}}',NULL,'2018-09-02 12:42:31','email'),
	(6,'Activation Message','activation_message','We\'re really excited for you to join our community! You\'re just one click away from activating your account.',NULL,NULL,'email'),
	(7,'Accept Guarantor','accept_guarantor_request','Hi there,\nYou have been requested to be the guarantor for a loan. \nLoan Amount: {{amount}}\nLoan Duration: {{duration}} days\nLoan Interest Rate: {{interest_rate}}\nLoan Application by: {{loan_by}}\nPlease click below to accept the guarantor',NULL,NULL,'email');

/*!40000 ALTER TABLE `email_templates` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table investment_plans
# ------------------------------------------------------------

DROP TABLE IF EXISTS `investment_plans`;

CREATE TABLE `investment_plans` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `investment_plans` WRITE;
/*!40000 ALTER TABLE `investment_plans` DISABLE KEYS */;

INSERT INTO `investment_plans` (`id`, `name`, `duration`, `rate`, `created_at`, `updated_at`)
VALUES
	(2,'Supper',30,13,'2018-08-04 15:47:22','2018-08-04 15:47:22');

/*!40000 ALTER TABLE `investment_plans` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table investments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `investments`;

CREATE TABLE `investments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `days_count` int(11) DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0',
  `total_days` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `started` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table loan_applications
# ------------------------------------------------------------

DROP TABLE IF EXISTS `loan_applications`;

CREATE TABLE `loan_applications` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `guarantor_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `plan_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `paid` int(11) DEFAULT '0',
  `to_pay` int(11) DEFAULT NULL,
  `started_at` timestamp NULL DEFAULT NULL,
  `accepted` varchar(128) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table loan_plans
# ------------------------------------------------------------

DROP TABLE IF EXISTS `loan_plans`;

CREATE TABLE `loan_plans` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `interest_rate` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `loan_plans` WRITE;
/*!40000 ALTER TABLE `loan_plans` DISABLE KEYS */;

INSERT INTO `loan_plans` (`id`, `interest_rate`, `duration`, `name`, `created_at`, `updated_at`, `status`)
VALUES
	(2,4,10,'Stupid Plan1','2018-08-02 12:39:49','2018-08-02 12:39:49',1),
	(3,3,5,'Dumb Plan','2018-07-29 13:25:40','2018-07-29 13:25:40',1),
	(4,10,30,'User Me','2018-08-05 22:32:46','2018-08-05 22:32:46',1);

/*!40000 ALTER TABLE `loan_plans` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) DEFAULT NULL,
  `receipient_id` int(11) DEFAULT NULL,
  `message` text,
  `status` int(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table references
# ------------------------------------------------------------

DROP TABLE IF EXISTS `references`;

CREATE TABLE `references` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `slug` varchar(256) DEFAULT NULL,
  `value` varchar(256) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `type` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `references` WRITE;
/*!40000 ALTER TABLE `references` DISABLE KEYS */;

INSERT INTO `references` (`id`, `title`, `slug`, `value`, `created_at`, `updated_at`, `last_updated_by`, `type`)
VALUES
	(1,'Min Withdrawal','min_withdrawal','100','2018-08-05 14:49:01','2018-08-05 14:49:01',2,'money'),
	(2,'Max Withdrawal','max_withdrawal','5000','2018-08-05 21:36:04','2018-08-05 21:36:04',2,'money'),
	(3,'Withdrawal Charges','withdrawal_charges','10','2018-08-05 14:49:05','2018-08-05 14:49:05',2,'rate'),
	(4,'Min Investment','min_investment','200','2018-08-05 22:03:35','2018-08-05 22:03:35',2,'money'),
	(5,'Max Investment','max_investment','2000','2018-08-05 22:03:33','2018-08-05 22:03:33',2,'money'),
	(6,'Min Loan','min_loan','300','2018-08-05 14:49:17','2018-08-05 14:49:17',2,'money'),
	(7,'Max Loan','max_loan','3000','2018-08-05 14:49:18','2018-08-05 14:49:18',2,'money'),
	(8,'Max Deposit','max_deposit','1000','2018-08-06 03:37:23','2018-08-06 03:37:23',2,'money'),
	(9,'Min Deposit','min_deposit','100','2018-08-06 03:37:24','2018-08-06 03:37:24',2,'money'),
	(11,'Voucher Code Length','voucher_code_length','12','2018-08-06 03:37:23','2018-08-06 03:37:23',2,NULL),
	(12,'Activation Amount','activation_amount','3000',NULL,NULL,NULL,'money'),
	(13,'Voucher Prefix','voucher_prefix','KBC',NULL,NULL,NULL,NULL),
	(14,'SMS Charge','sms_charge','1',NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `references` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table referrals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `referrals`;

CREATE TABLE `referrals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `referred` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table sliders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sliders`;

CREATE TABLE `sliders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(128) DEFAULT NULL,
  `header` text,
  `paragraph` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table support_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `support_types`;

CREATE TABLE `support_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `support_types` WRITE;
/*!40000 ALTER TABLE `support_types` DISABLE KEYS */;

INSERT INTO `support_types` (`id`, `name`, `created_at`, `updated_at`)
VALUES
	(1,'Inquiry',NULL,'2018-08-04 22:59:48'),
	(3,'Complaint','2018-08-04 22:59:35','2018-08-04 22:59:35');

/*!40000 ALTER TABLE `support_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table supports
# ------------------------------------------------------------

DROP TABLE IF EXISTS `supports`;

CREATE TABLE `supports` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `reply_by` int(11) DEFAULT NULL,
  `message` text,
  `reply` text,
  `status` int(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `type` varchar(64) DEFAULT NULL,
  `token` varchar(128) DEFAULT NULL,
  `is_revoked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table transactions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `message` varchar(128) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `from` varchar(64) DEFAULT NULL,
  `from_id` varchar(128) DEFAULT '0',
  `amount` int(11) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(64) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `last_name` varchar(64) DEFAULT '',
  `first_name` varchar(64) DEFAULT '',
  `role` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT '',
  `wallet` int(11) DEFAULT '0',
  `verified` varchar(128) DEFAULT NULL,
  `referred_by` int(11) DEFAULT '0',
  `username` varchar(64) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '0',
  `activated_at` timestamp NULL DEFAULT NULL,
  `send_sms` tinyint(1) DEFAULT '0',
  `suspended` tinyint(1) DEFAULT '0',
  `passport` varchar(128) DEFAULT NULL,
  `valid_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `last_name`, `first_name`, `role`, `created_at`, `updated_at`, `phone_number`, `wallet`, `verified`, `referred_by`, `username`, `active`, `activated_at`, `send_sms`, `suspended`, `passport`, `valid_id`)
VALUES
	(1,'user@obin.com','$2a$10$4anVBfdTd6Dp.jRphfa.XOT1kDSqvltZUf.M0vjYTq18OLGHZsqrq','Obin','Philip',1,'2018-08-06 19:49:12','2018-09-04 22:51:38','44444',3600,'1',0,'niceguy',1,NULL,0,0,NULL,'/uploads/valid_id/e929927b-d245-4153-b0fb-3f0d20487bce.jpg'),
	(2,'admin@obin.com','$2a$10$4anVBfdTd6Dp.jRphfa.XOT1kDSqvltZUf.M0vjYTq18OLGHZsqrq','Kiss','Admin',0,'2018-08-06 19:49:08','2018-08-06 19:49:08',NULL,56000,'1',0,'lover',1,NULL,0,0,NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table vouchers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vouchers`;

CREATE TABLE `vouchers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `amount` int(11) DEFAULT NULL,
  `printed` int(1) DEFAULT '0',
  `used` int(1) DEFAULT '0',
  `used_by` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `code` varchar(128) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table withdrawals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `withdrawals`;

CREATE TABLE `withdrawals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `charge` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
