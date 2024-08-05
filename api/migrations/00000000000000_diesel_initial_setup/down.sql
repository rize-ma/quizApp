DROP TABLE IF EXISTS user_quiz_results;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS users;

DROP FUNCTION IF EXISTS diesel_manage_updated_at(_tbl regclass);
DROP FUNCTION IF EXISTS diesel_set_updated_at();
