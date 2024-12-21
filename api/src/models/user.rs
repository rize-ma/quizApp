use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Queryable, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: Uuid,
    pub correct_answers_count: Option<i32>,
    pub email: String,
    pub icon_url: Option<String>,
    pub password: String,
    pub salt: String,
    pub self_introduction: Option<String>,
    pub user_id: String,
    pub username: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct LoginUser {
    pub email: String,
    pub password: String,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct UserRegister {
    pub email: String,
    pub password: String,
    pub user_id: String,
    pub username: String,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct CreateUser {
    pub email: String,
    pub password: String,
    pub salt: String,
    pub user_id: String,
    pub username: String,
}

#[derive(Debug, Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct UserFilter {
    pub email: Option<String>,
    pub user_id: Option<String>,
    pub username: Option<String>,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct UserDTO {
    pub id: Uuid,
    pub correct_answers_count: Option<i32>,
    pub email: String,
    pub icon_url: Option<String>,
    pub self_introduction: Option<String>,
    pub user_id: String,
    pub username: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(AsChangeset, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct UpdateUser {
    pub id: Uuid,
    pub correct_answers_count: Option<i32>,
    pub email: Option<String>,
    pub icon_url: Option<String>,
    pub self_introduction: Option<String>,
    pub user_id: Option<String>,
    pub username: Option<String>,
}

impl User {
    pub fn to_dto(&self) -> UserDTO {
        UserDTO {
            id: self.id.clone(),
            correct_answers_count: self.correct_answers_count.clone(),
            email: self.email.clone(),
            icon_url: self.icon_url.clone(),
            self_introduction: self.self_introduction.clone(),
            user_id: self.user_id.clone(),
            username: self.username.clone(),
            created_at: self.created_at.clone(),
            updated_at: self.updated_at.clone(),
        }
    }
}
