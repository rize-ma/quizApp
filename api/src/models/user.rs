use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: Uuid,
    pub correct_answers_count: i32,
    pub email: String,
    pub icon_url: Option<String>,
    pub self_introduction: Option<String>,
    pub user_id: String,
    pub username: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewUser {
    pub email: String,
    pub user_id: String,
    pub username: String,
}

#[derive(AsChangeset, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]

pub struct UpdateUser {
    pub id: Uuid,
    pub correct_answers_count: i32,
    pub email: String,
    pub icon_url: Option<String>,
    pub self_introduction: Option<String>,
    pub user_id: String,
    pub username: String,
}
