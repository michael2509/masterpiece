USE masterpiece;

-- empty all tables
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE chats;
TRUNCATE TABLE messages;
TRUNCATE TABLE speakers;
TRUNCATE TABLE guests;

SET FOREIGN_KEY_CHECKS = 1;

-- Insert Speaker
-- clear password = Azerty1.
-- encoded password = $2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y
INSERT INTO
    speakers (`username`, `password`)
VALUES
("Michael De Madet", "$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y");

-- Get Speaker id
SET @speaker_id = (SELECT id FROM speakers s WHERE s.username = "Michael De Madet");

-- Insert Chat
INSERT INTO
    chats (`name`, `access_code`, `speaker_id`, `creation_date`)
VALUES
    ("First Chat", "ABCDE", @speaker_id, NOW());

-- Get Chat Id
SET @chat_id = (SELECT id FROM chats c WHERE c.name = "First Chat");

-- Insert Guest
INSERT INTO
    guests (`pseudo`, `chat_id`)
VALUES
    ("Bill Gates", @chat_id);

-- Get Guest
SET @guest_id = (SELECT id FROM guests g WHERE g.pseudo = "Bill Gates");

-- Insert Message from speaker
INSERT INTO
    messages (`text`, `send_date`, `chat_id`, `speaker_id`)
VALUES
    ("Hello from Michael", NOW(), @chat_id, @speaker_id);

-- Insert Message from guest
INSERT INTO
    messages (`text`, `send_date`, `chat_id`, `guest_id`)
VALUES
    ("Hello from Bill", NOW(), @chat_id, @guest_id);