GRANT SELECT ON chai_store TO user1;
GRANT INSERT,UPDATE ON chai_store TO user1;
REVOKE SELECT ON chai_store FROM user1;
REVOKE INSERT,UPDATE ON chai_store FROM user1;