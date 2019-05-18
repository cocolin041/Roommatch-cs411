CREATE TABLE house (
    house_id int NOT NULL AUTO_INCREMENT,
    FirstName varchar(10) NULL,
    LastName varchar(10) NULL,
    Address varchar(255) NOT NULL,
	Type varchar(4) NOT NULL,
    Price int NOT NULL,
	img varchar(255) NULL,
    Availability varchar(2) NOT NULL,
    Pet boolean not null default 0,
    Smoke boolean not null default 0,
    GenderAccept varchar(1) NOT NULL,
    UserName varchar(8) NOT NULL,
    PRIMARY KEY (house_id)
);
SELECT * FROM house;
