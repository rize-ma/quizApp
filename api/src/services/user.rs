use crate::{
    config::db_connection::DbPool,
    errors::user::UserError,
    models::user::{User, UserDTO},
    schema::users::dsl::{email, user_id, users},
};
use actix_web::web;
use diesel::prelude::*;

pub struct UserService;

impl UserService {
    pub fn get_all_user(pool: web::Data<DbPool>) -> Result<Vec<UserDTO>, UserError> {
        let mut conn = pool.get().map_err(|_| UserError::DatabaseError)?;
        users
            .load::<User>(&mut conn)
            .map(|user_list| user_list.into_iter().map(|user| user.to_dto()).collect())
            .map_err(|_| UserError::UnknownError)
    }
    pub fn find_user_by_user_id(
        pool: web::Data<DbPool>,
        query_user_id: String,
    ) -> Result<Option<UserDTO>, UserError> {
        let mut conn = pool.get().map_err(|_| UserError::DatabaseError)?;
        users
            .filter(user_id.eq(query_user_id))
            .first::<User>(&mut conn)
            .optional()
            .map(|opt_user: Option<User>| opt_user.map(|user| user.to_dto()))
            .map_err(|_| UserError::UnknownError)
    }
    pub fn find_user_by_email(
        pool: web::Data<DbPool>,
        query_email: String,
    ) -> Result<Option<UserDTO>, UserError> {
        let mut conn = pool.get().map_err(|_| UserError::DatabaseError)?;
        users
            .filter(email.eq(query_email))
            .first::<User>(&mut conn)
            .optional()
            .map(|opt_user: Option<User>| opt_user.map(|user| user.to_dto()))
            .map_err(|_| UserError::UnknownError)
    }
}