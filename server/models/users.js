const users = `
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL,
    avatar VARCHAR(100) DEFAULT '00000000_0000.png',
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT(1) DEFAULT 0,
    version INTEGER DEFAULT 1
);

DELIMITER $$
    CREATE TRIGGER before_user_update
    BEFORE UPDATE ON users
    FOR EACH ROW
    BEGIN
        SET NEW.version = OLD.version + 1;
    END$$
DELIMITER;
`

export default users;