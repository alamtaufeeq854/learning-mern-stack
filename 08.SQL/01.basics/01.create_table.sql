CREATE TABLE chai_store(
id 			SERIAL PRIMARY KEY,
chai_name 	VARCHAR(50),
price 		DECIMAL(5,2), 
chai_type 	VARCHAR(50),
available 	BOOLEAN

);

SELECT * FROM chai_store;