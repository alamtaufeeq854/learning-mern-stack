BEGIN;
INSERT INTO chai_store(id,chai_name,price,chai_type,available)
VALUES(6,'Milk Tea',50.00,'Classic',TRUE);

UPDATE chai_store
SET price = 36
WHERE price > 35;

COMMIT;

BEGIN;
SAVEPOINT savepoint1;

INSERT INTO chai_store(id,chai_name,price,chai_type,available)
VALUES(7,'Water Tea',10.00,'Normal',TRUE);

ROLLBACK TO savepoint1;

SELECT * FROM chai_store;