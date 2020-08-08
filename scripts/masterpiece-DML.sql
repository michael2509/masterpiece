USE masterpiece;

-- empty all tables
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE meetings;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

-- insert users
INSERT INTO users (username, password)
VALUES
-- clear password = Azerty1.
-- encoded password = $2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y
("Michael De Madet", "$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y"),
("Bill Gates", "$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y");