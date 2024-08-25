CREATE TABLE user_quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_correct BOOLEAN NOT NULL,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    selected_option INT NOT NULL CHECK (selected_option IN (1, 2, 3, 4)),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
