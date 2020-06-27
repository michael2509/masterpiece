USE masterpiece;


-- empty all tables
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE accounts_roles;
TRUNCATE TABLE accounts;
TRUNCATE TABLE roles;

SET FOREIGN_KEY_CHECKS = 1;


-- insert accounts
INSERT INTO accounts (username, email, password, enabled)
VALUES
-- clear password = Azerty1.
-- encoded password = $2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y
("Michael De Madet", "michaeldemadet@gmail.com", "$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y", 1),
("Bill Gates", "billgates@microsoft.com", "$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y", 1);


-- insert roles
INSERT INTO roles (code, default_role)
VALUES
("admin", 0),
("animator", 1);


-- get account_id for mike and bill account
SET @mike_account_id = (SELECT id FROM accounts WHERE username = "Michael De Madet");
SET @bill_account_id = (SELECT id FROM accounts WHERE username = "Bill Gates");


-- get admin and animator role id
SET @admin_role_id = (SELECT id FROM roles WHERE code = "admin");
SET @animator_role_id = (SELECT id FROM roles WHERE code = "animator");

-- insert accounts_role
INSERT INTO accounts_roles (account_id, role_id)
VALUES
-- All roles for mike
(@mike_account_id, @admin_role_id),
(@mike_account_id, @animator_role_id),
-- Only animator role for bill
(@bill_account_id, @animator_role_id);