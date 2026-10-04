CREATE TABLE customer (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_name VARCHAR(100),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

INSERT INTO customer (customer_id, customer_name)
VALUES
(1, 'Alice'),
(2, 'Bob'),
(3, 'Charlie'),
(4, 'David');

INSERT INTO orders (order_id, customer_id, order_name)
VALUES
(101, 1, 'T-Shirt'),
(102, 1, 'Jeans'),
(103, 2, 'Shoes'),
(104, NULL, 'Watch'),
(105, 4, 'Laptop');

SELECT * FROM customer;
SELECT * FROM orders;