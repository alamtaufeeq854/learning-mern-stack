-- INNER JOIN
SELECT c.customer_name, o.order_name
FROM customer c
INNER JOIN orders o
ON c.customer_id = o.customer_id;

-- LEFT JOIN
SELECT c.customer_name, o.order_name
FROM customer c
LEFT JOIN orders o
ON c.customer_id = o.customer_id;

-- RIGHT JOIN
SELECT c.customer_name, o.order_name
FROM customer c
RIGHT JOIN orders o
ON c.customer_id = o.customer_id;

-- FULL OUTER JOIN
SELECT c.customer_name, o.order_name
FROM customer c
FULL OUTER JOIN orders o
ON c.customer_id = o.customer_id;

-- CROSS JOIN
SELECT c.customer_name, o.order_name
FROM customer c
CROSS JOIN orders o;

-- Subquery
SELECT customer_name
FROM customer
WHERE customer_id IN (
    SELECT customer_id
    FROM orders
    WHERE order_name = 'T-Shirt'
);