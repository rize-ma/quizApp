use crate::{
    config::db_connection::DbPool,
    errors::auth::AuthError,
    models::user::{LoginUser, User, UserRegister},
    schema::users::dsl::{email, user_id, users},
    utils::auth::{find_user, hash_password},
};
use actix_web::web;

use diesel::prelude::*;

pub struct AuthService;

impl AuthService {
    pub fn login(pool: web::Data<DbPool>, form_data: LoginUser) -> Result<User, AuthError> {
        let mut conn = pool.get().map_err(|_| AuthError::UnknownError)?;

        let user = find_user(&mut conn, Box::new(email.eq(form_data.email.clone())))?
            .ok_or(AuthError::EmailNotFound)?;

        let hashed_password = hash_password(&form_data.password.as_bytes())?;
        if user.password != hashed_password {
            return Err(AuthError::IncorrectPassword);
        };
        Ok(user)
    }

    pub fn user_register(
        pool: web::Data<DbPool>,
        form_data: UserRegister,
    ) -> Result<User, AuthError> {
        let mut conn = pool.get().map_err(|_| AuthError::UnknownError)?;

        if find_user(&mut conn, Box::new(email.eq(form_data.email.clone())))?.is_some() {
            return Err(AuthError::EmailAlreadyRegistered);
        }
        if find_user(&mut conn, Box::new(user_id.eq(form_data.user_id.clone())))?.is_some() {
            return Err(AuthError::UserIdAlreadyRegistered);
        }

        let hashed_password = hash_password(&form_data.password.as_bytes())?;
        let new_user = UserRegister {
            email: form_data.email,
            password: hashed_password,
            user_id: form_data.user_id,
            username: form_data.username,
        };

        let user = diesel::insert_into(users)
            .values(&new_user)
            .get_result::<User>(&mut conn)
            .map_err(|_| AuthError::UserRegistrationError)?;
        Ok(user)
    }
}
