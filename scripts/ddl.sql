-- -----------------------------------------------------
-- Delete tables
-- -----------------------------------------------------
DROP TABLE IF EXISTS guests CASCADE;
DROP TABLE IF EXISTS speakers CASCADE;
DROP TABLE IF EXISTS chats CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

-- -----------------------------------------------------
-- Table speakers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS speakers (
  id SERIAL NOT NULL,
  username VARCHAR(80) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT speakers_username_UQ UNIQUE (username));


-- -----------------------------------------------------
-- Table chats
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS chats (
  id SERIAL NOT NULL,
  access_code VARCHAR(10) NOT NULL,
  name VARCHAR(120) NOT NULL,
  creation_date TIMESTAMP NOT NULL,
  speaker_id SERIAL NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT chats_access_code_UQ UNIQUE (access_code),
  CONSTRAINT chats_speakers_FK
    FOREIGN KEY (speaker_id)
    REFERENCES speakers (id));

CREATE INDEX chats_speaker_id_IDX ON chats(speaker_id);

-- -----------------------------------------------------
-- Table guests
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS guests (
  id SERIAL NOT NULL,
  pseudo VARCHAR(80) NOT NULL,
  chat_id SERIAL NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT guests_pseudo_UQ UNIQUE (pseudo),
  CONSTRAINT guests_chats_FK
    FOREIGN KEY (chat_id)
    REFERENCES chats (id));

CREATE INDEX guests_chat_id_IDX ON guests(chat_id);

-- -----------------------------------------------------
-- Table messages
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL NOT NULL,
  send_date TIMESTAMP NOT NULL,
  text VARCHAR(255) NOT NULL,
  chat_id SERIAL NOT NULL,
  speaker_id SERIAL,
  guest_id SERIAL,
  PRIMARY KEY (id),
  CONSTRAINT messages_chats_FK
    FOREIGN KEY (chat_id)
    REFERENCES chats (id)
);

CREATE INDEX messages_chat_id_IDX ON messages(chat_id);