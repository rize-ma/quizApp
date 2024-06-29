use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: i32,
    pub username: String,
    pub icon_url: Option<String>,
    pub correct_answers_count: i32,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::quizzes)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[belongs_to(User, foreign_key = "created_by")]
pub struct Quiz {
    pub id: i32,
    pub question: String,
    pub option1: String,
    pub option2: String,
    pub option3: String,
    pub option4: String,
    pub correct_option: i32,
    pub created_by: i32,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::user_quiz_results)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[belongs_to(User)]
#[belongs_to(Quiz)]
pub struct UserQuizResult {
    pub id: i32,
    pub user_id: i32,
    pub quiz_id: i32,
    pub selected_option: i32,
    pub is_correct: bool,
    pub answered_at: NaiveDateTime,
}
