-- empty all tables

TRUNCATE TABLE chats CASCADE;
TRUNCATE TABLE messages CASCADE;
TRUNCATE TABLE speakers CASCADE;
TRUNCATE TABLE guests CASCADE;

-- Insert Speaker
-- clear password = Azerty1.
-- encoded password = $2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y
INSERT INTO
    speakers (username, password)
VALUES
('Michael De Madet', '$2a$10$oxBw3r2s8rBunfgmCadFmeJCCVUNQdfhR/LT2pCUEShztbc9hZO7y');

-- Insert Chat
INSERT INTO
    chats (name, access_code, speaker_id, creation_date)
VALUES
    (
        'First Chat',
        'ABCDE',
        (SELECT id FROM speakers s where s.username = 'Michael De Madet'),
        NOW()
    );

-- Insert Guest
INSERT INTO
    guests (pseudo, chat_id)
VALUES
    (
        'Bill Gates',
        (SELECT id FROM chats c WHERE c.name = 'First Chat')
    );

-- Insert Message from speaker
INSERT INTO
    messages (text, send_date, chat_id, speaker_id)
VALUES
    (
        'Hello from Michael',
        NOW(),
        (SELECT id FROM chats c WHERE c.name = 'First Chat'),
        (SELECT id FROM speakers s where s.username = 'Michael De Madet')
    );

-- Insert Message from guest
INSERT INTO
    messages (text, send_date, chat_id, guest_id)
VALUES
    (
        'Hello from Bill',
        NOW(),
        (SELECT id FROM chats c WHERE c.name = 'First Chat'),
        (SELECT id FROM guests g WHERE g.pseudo = 'Bill Gates')
    );