INSERT INTO chai_store (id,chai_name,price,chai_type,available)
VALUES (6,'Ginger Chai',15,'Herbal',FALSE);

UPDATE chai_store
SET price = 45.00
WHERE chai_name = 'Ginger Chai';

DELETE FROM chai_store
WHERE chai_type = 'Cold';

SELECT id AS "S.NO.", price AS "Cost"
FROM chai_store
WHERE price > 30;

SELECT * FROM chai_store;