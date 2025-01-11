use super::user::User;
use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Queryable, Identifiable, Associations, Serialize, Deserialize, Clone)]
#[diesel(table_name = crate::schema::quizzes)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(belongs_to(User, foreign_key = created_by))]
pub struct Quiz {
    pub id: Uuid,
    pub correct_option: i32,
    pub created_by: Uuid,
    pub option1: String,
    pub option2: String,
    pub option3: String,
    pub option4: String,
    pub question: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::quizzes)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewQuiz {
    pub correct_option: i32,
    pub created_by: Uuid,
    pub option1: String,
    pub option2: String,
    pub option3: String,
    pub option4: String,
    pub question: String,
}

#[derive(AsChangeset, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::quizzes)]
#[diesel(check_for_backend(diesel::pg::Pg))]

pub struct UpdateQuiz {
    pub id: Uuid,
    pub correct_option: i32,
    pub option1: String,
    pub option2: String,
    pub option3: String,
    pub option4: String,
    pub question: String,
}
