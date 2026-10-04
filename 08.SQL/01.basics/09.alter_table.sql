ALTER TABLE chai_store
ADD stock INT DEFAULT 0;

ALTER TABLE chai_store
ALTER COLUMN price TYPE DECIMAL(12,2);

ALTER TABLE chai_store
DROP COLUMN stock;

DROP TABLE chai_store;

TRUNCATE TABLE chai_store;

ALTER TABLE chai_store
RENAME TO Tea_Store;
SELECT * FROM Tea_Store;


ALTER TABLE chai_store
RENAME COLUMN chai_type TO Category;

SELECT * FROM chai_store;