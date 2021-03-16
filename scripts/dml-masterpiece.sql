USE masterpiece;

-- empty all tables
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE rooms;
TRUNCATE TABLE messages;
TRUNCATE TABLE speakers;
TRUNCATE TABLE guests;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

-- Insert Users
INSERT INTO
    users (username)
VALUES
("User Speaker"),
("User Guest");

-- Get Users id
SET @user_speaker_id = (SELECT id FROM users u WHERE u.username = "User Speaker");
SET @user_guest_id = (SELECT id FROM users u WHERE u.username = "User Guest");

-- Insert Speaker
-- clear password = Azerty1.
-- encoded password = $2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y
INSERT INTO
    speakers (`user_id`, `password`)
VALUES
    (@user_speaker_id, "$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y");

-- Get Speaker id
SET @speaker_id = (
    SELECT id FROM speakers s
    INNER JOIN users u ON s.user_id = u.id
    WHERE u.username = "User Speaker"
);

-- Insert Room
INSERT INTO
    rooms (`name`, `code`, `speaker_id`, `creation_date`)
VALUES
    ("room 1", "ABCDE", @speaker_id, NOW());

-- Get Room
SELECT id FROM rooms r WHERE r.name = "room 1";

-- Insert Message
INSERT INTO
    messages (`username_code_message_send_date`, `message`, `send_date`, `user_id`, `room_id`)
VALUES
    ("User Speaker111_Hello World_2021-01-19 13:14:07", "Hello World", "2021-01-19 13:14:07", @user_speaker_id, @room_id)