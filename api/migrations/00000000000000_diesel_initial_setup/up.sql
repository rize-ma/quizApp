CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    correct_answers_count INT DEFAULT 0,
    email TEXT NOT NULL,
    icon_url VARCHAR(255),
    self_introduction TEXT,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    correct_option INT NOT NULL CHECK (correct_option IN (1, 2, 3, 4)),
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT NOT NULL,
    option4 TEXT NOT NULL,
    question TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_correct BOOLEAN NOT NULL,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    selected_option INT NOT NULL CHECK (selected_option IN (1, 2, 3, 4)),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
