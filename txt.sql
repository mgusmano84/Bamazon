USE Bamazon;

-- CREATE TABLE products (
-- ItemID VARCHAR(30) NOT NULL,
-- ProductName VARCHAR(30) NOT NULL,
-- DepartmentName VARCHAR(30) NOT NULL,
-- Price INTEGER(1000),
-- StockQuantity INTEGER(100)
-- );
-- 
INSERT INTO products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES ("3002", "Blue Tie", "Clothing", 12, 150);

SELECT * FROM products;

DELETE FROM products WHERE StockQuantity = 200;