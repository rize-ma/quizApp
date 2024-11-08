use crate::config::db_connection::DbPool;
use crate::config::jwt::create_token;
use crate::errors::auth::AuthError;
use crate::models::user::{LoginUser, UserRegister};
use crate::services::auth::AuthService;
use actix_web::{post, web, HttpResponse, Responder};
use serde_json::json;

#[post("/login")]
async fn login(pool: web::Data<DbPool>, form_data: web::Json<LoginUser>) -> impl Responder {
    match web::block(move || AuthService::login(pool, form_data.into_inner())).await {
        Ok(Ok(user)) => {
            let token = create_token(user.id);
            Ok(HttpResponse::Ok().json(json!({
                "user": user,
                "token": token
            })))
        }
        Ok(Err(err)) => Err(err),
        Err(_) => Err(AuthError::UnknownError),
    }
}

#[post("/user-register")]
async fn user_register(
    pool: web::Data<DbPool>,
    form_data: web::Json<UserRegister>,
) -> impl Responder {
    match web::block(move || AuthService::user_register(pool, form_data.into_inner())).await {
        Ok(Ok(user)) => {
            let token = create_token(user.id);
            Ok(HttpResponse::Ok().json(json!({
                "user": user,
                "token": token
            })))
        }
        Ok(Err(err)) => Err(err),
        Err(_) => Err(AuthError::UnknownError),
    }
}

pub fn auth_route() -> actix_web::Scope {
    web::scope("/auth").service(login).service(user_register)
}
