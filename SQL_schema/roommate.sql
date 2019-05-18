CREATE TABLE roommate (
    roommate_id int NOT NULL AUTO_INCREMENT,
    FirstName varchar(10) NULL,
    LastName varchar(10) NULL,
    Bathroom boolean default 0,
    PriceUpper int NOT NULL,
    PriceLower int NOT NULL,
    RoomNeed int NOT NULL,
    Pet boolean not null default 0,
    Smoke boolean not null default 0,
    GenderAccept varchar(1) NOT NULL,
    UserName varchar(8) NOT NULL,
    PRIMARY KEY (roommate_id)
);
SELECT * FROM roommate;
