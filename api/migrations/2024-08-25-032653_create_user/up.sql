CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    correct_answers_count INT DEFAULT 0,
    email TEXT NOT NULL,
    icon_url VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    self_introduction TEXT,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER trigger_update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
