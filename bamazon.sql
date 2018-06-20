-- Drops the favorite_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect favorite_db --
USE bamazon_db;

-- Creates the table "favorite_foods" within favorite_db --
CREATE TABLE bamazon_inv (
  -- Makes a string column called "food" which cannot contain null --
id int NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL (8,2) default 0,
stock_quantity INT default 0,
PRIMARY KEY(id)

);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Toothbrush", "Health", 4.99, 100);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Soccer Balls", "Sports", 21.99, 8);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Macbook", "Technology", 1000.00, 5);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("iPod Mini", "Technology", 204.99, 20);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Deodorant", "Health", 3.50, 150);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Putter", "Sports", 500.00, 2);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Eggs", "Food", 2.00, 100);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Ribeye Steak", "Food", 22.00, 1);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Shampoo", "Health", 6.00, 100);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Cleats", "Sports", 65.00, 10);

INSERT INTO bamazon_inv (product_name, department_name, price,stock_quantity)
VALUES ("Headphones", "Technology", 30.99, 25);