use crate::config::db_connection::DbPool;
use crate::errors::user::UserError;
use crate::services::user::UserService;
use actix_web::{get, web, HttpResponse, Responder};
use uuid::Uuid;

#[get("all")]
async fn get_all_user(pool: web::Data<DbPool>) -> impl Responder {
    match web::block(move || UserService::get_all_user(pool)).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(UserError::UnknownError),
    }
}

#[get("/{id}")]
async fn find_user_by_id(pool: web::Data<DbPool>, id: web::Path<Uuid>) -> impl Responder {
    match web::block(move || UserService::find_user_by_id(pool, id.into_inner())).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(UserError::UnknownError),
    }
}

#[get("/user-id/{user_id}")]
async fn find_user_by_user_id(
    pool: web::Data<DbPool>,
    user_id: web::Path<String>,
) -> impl Responder {
    match web::block(move || UserService::find_user_by_user_id(pool, user_id.into_inner())).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(UserError::UnknownError),
    }
}

pub fn user_route() -> actix_web::Scope {
    web::scope("/users")
        .service(get_all_user)
        .service(find_user_by_id)
        .service(find_user_by_user_id)
}
