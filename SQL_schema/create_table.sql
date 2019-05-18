-- DROP TABLE house;
-- CREATE TABLE `house` (
--   `apartment_id` int(10) AUTO_INCREMENT,
--   `Address` varchar(150) DEFAULT NULL,
--   `Price` int(10) DEFAULT NULL,
--   `Type` varchar(4) DEFAULT NULL,
--   `User_id` varchar(10) DEFAULT NULL,
--   PRIMARY KEY (`apartment_id`)
-- );

-- CREATE TABLE user (
--   `user_id` int(10) AUTO_INCREMENT,
--   `userName` varchar(150) DEFAULT NULL,
--   `password` varchar(150) DEFAULT NULL,
--   `post_id` varchar(4) DEFAULT NULL,
--   PRIMARY KEY (`user_id`)
-- );

DROP TABLE post;
CREATE TABLE post (
  `post_id` int(10) AUTO_INCREMENT,
  `user_id` varchar(150) DEFAULT NULL,
  `left` varchar(1000) DEFAULT NULL,
  `right` varchar(1000) DEFAULT NULL,
  `createTime` TIMESTAMP NOT NULL,
  `endTime` TIMESTAMP NOT NULL,
  PRIMARY KEY (`post_id`)
);
DROP TABLE vote;
CREATE TABLE vote (
  `vote_id` int(10) AUTO_INCREMENT,
  `user_id` varchar(150) DEFAULT NULL,
  `post_id` varchar(150) DEFAULT NULL,
  `choice` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`vote_id`)
);











