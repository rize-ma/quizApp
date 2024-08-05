use super::{quiz::Quiz, user::User};
use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::user_quiz_results)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[belongs_to(User, foreign_key = "user_id")]
#[belongs_to(Quiz, foreign_key = "quiz_id")]
pub struct UserQuizResult {
    pub id: Uuid,
    pub user_id: Uuid,
    pub quiz_id: Uuid,
    pub selected_option: i32,
    pub is_correct: bool,
    pub answered_at: NaiveDateTime,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name =  crate::schema::user_quiz_results)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewUserQuizResult {
    pub user_id: Uuid,
    pub quiz_id: Uuid,
    pub selected_option: i32,
    pub is_correct: bool,
}
