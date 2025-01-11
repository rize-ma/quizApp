use super::{quiz::Quiz, user::User};
use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::quiz_results)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(belongs_to(User, foreign_key = user_id))]
#[diesel(belongs_to(Quiz, foreign_key = quiz_id))]
pub struct QuizResult {
    pub id: Uuid,
    pub answered_at: Option<NaiveDateTime>,
    pub is_correct: bool,
    pub quiz_id: Uuid,
    pub selected_option: i32,
    pub user_id: Uuid,
    pub created_at: Option<NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name =  crate::schema::quiz_results)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewQuizResult {
    pub is_correct: bool,
    pub quiz_id: Uuid,
    pub selected_option: i32,
    pub user_id: Uuid,
}
