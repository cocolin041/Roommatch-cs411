CREATE TABLE user (
  User_id int(10) AUTO_INCREMENT,
  Post varchar(10) NOT NULL,
  FirstName varchar(10) DEFAULT NULL,
  LastName varchar(10) DEFAULT NULL,
  Gender varchar(1) NOT NULL,
  UserName varchar(150) DEFAULT NULL,
  password varchar(150) DEFAULT NULL,
  PRIMARY KEY (User_id)
);
SELECT * FROM user;