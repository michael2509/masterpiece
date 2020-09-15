USE masterpiece;

-- empty all tables
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE rooms;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

-- insert users
INSERT INTO
    users (username, password)
VALUES
-- clear password = Azerty1.
-- encoded password = $2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y
("Michael De Madet", "$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y"),
("Bill Gates", "$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y");

-- INSERT USERS
INSERT INTO
    users (`username`, `password`)
VALUES
    ("user 1", "password"),
    ("user 2", "password");

-- GET USERS ID
SET @user1_id = (SELECT id FROM users u WHERE u.username = "user 1")
SET @user2_id = (SELECT id FROM users u WHERE u.username = "user 2")

-- INSERT ROOMS
INSERT INTO
    rooms (`name`, `code`, `host_id`)
VALUES
    ("room 1", "111", @user1_id),
    ("room 2", "222", @user2_id);