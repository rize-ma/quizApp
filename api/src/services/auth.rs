use crate::{
    config::{db_connection::DbPool, jwt::create_token},
    errors::auth::AuthError,
    models::user::{LoginUser, SignupUser, User},
    schema::users::dsl::{email, user_id, users},
    utils::auth::{find_user, hash_password},
};
use actix_web::{web, HttpResponse};
use serde_json::json;

use diesel::prelude::*;

pub struct AuthService;

impl AuthService {
    pub fn login(pool: web::Data<DbPool>, form_data: LoginUser) -> Result<HttpResponse, AuthError> {
        let mut conn = pool.get().unwrap();

        let user = find_user(&mut conn, Box::new(email.eq(form_data.email.clone())))?
            .ok_or(AuthError::EmailNotFound)?;

        let hashed_password = hash_password(&form_data.password.as_bytes())?;
        if user.password != hashed_password {
            return Err(AuthError::IncorrectPassword);
        };

        let token = create_token(user.id);

        Ok(HttpResponse::Ok().json(json!({
            "user": user,
            "token": token
        })))
    }

    pub fn signup(
        pool: web::Data<DbPool>,
        form_data: SignupUser,
    ) -> Result<HttpResponse, AuthError> {
        let mut conn = pool.get().unwrap();

        if find_user(&mut conn, Box::new(email.eq(form_data.email.clone())))?.is_some() {
            return Err(AuthError::EmailAlreadyRegistered);
        }
        if find_user(&mut conn, Box::new(user_id.eq(form_data.user_id.clone())))?.is_some() {
            return Err(AuthError::UserIdAlreadyRegistered);
        }

        let hashed_password = hash_password(&form_data.password.as_bytes())?;
        let new_user = SignupUser {
            email: form_data.email,
            password: hashed_password,
            user_id: form_data.user_id,
            username: form_data.username,
        };

        let user = diesel::insert_into(users)
            .values(&new_user)
            .get_result::<User>(&mut conn);

        match user {
            Ok(user) => {
                let token = create_token(user.id);
                Ok(HttpResponse::Ok().json(json!({
                    "user": new_user,
                    "token": token
                })))
            }
            Err(_) => return Err(AuthError::UserRegistrationError),
        }
    }
}
