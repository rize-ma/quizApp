use crate::config::db_connection::DbPool;
use crate::errors::user::UserError;
use crate::models::user::UserFilter;
use crate::services::user::UserService;
use actix_web::{get, web, HttpResponse, Responder};

#[get("")]
async fn get_all_user(pool: web::Data<DbPool>) -> impl Responder {
    match web::block(move || UserService::get_all_user(pool)).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(UserError::UnknownError),
    }
}

#[get("/filter")]
async fn find_user_by_user_id(
    pool: web::Data<DbPool>,
    filter: web::Query<UserFilter>,
) -> impl Responder {
    if let Some(user_id) = filter.user_id.clone() {
        return match web::block(move || UserService::find_user_by_user_id(pool, user_id)).await {
            Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
            Ok(Err(err)) => Err(err),
            Err(_) => Err(UserError::UnknownError),
        };
    }
    if let Some(email) = filter.email.clone() {
        return match web::block(move || UserService::find_user_by_email(pool, email)).await {
            Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
            Ok(Err(err)) => Err(err),
            Err(_) => Err(UserError::UnknownError),
        };
    }
    Ok(HttpResponse::BadRequest().body("No valid filter provided".to_string()))
}
pub fn user_route() -> actix_web::Scope {
    web::scope("/users")
        .service(get_all_user)
        .service(find_user_by_user_id)
}
