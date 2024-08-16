use crate::models::quiz::UpdateQuiz;
use crate::services::quiz::QuizService;
use crate::{config::db_connection::DbPool, models::quiz::NewQuiz};
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use uuid::Uuid;

#[get("")]
async fn get_all_quiz(pool: web::Data<DbPool>) -> impl Responder {
    match web::block(move || QuizService::get_all_quiz(pool)).await {
        Ok(data) => HttpResponse::Ok().json(data.ok()),
        Err(err) => HttpResponse::BadRequest().body(err.to_string()),
    }
}

#[get("/{quiz_id}")]
async fn get_quiz(pool: web::Data<DbPool>, quiz_id: web::Path<Uuid>) -> impl Responder {
    match web::block(move || QuizService::get_quiz(pool, quiz_id.into_inner())).await {
        Ok(data) => HttpResponse::Ok().json(data.ok()),
        Err(err) => HttpResponse::BadRequest().body(err.to_string()),
    }
}

#[post("")]
async fn create_quiz(pool: web::Data<DbPool>, quiz_data: web::Json<NewQuiz>) -> impl Responder {
    match web::block(move || QuizService::create_quiz(pool, quiz_data.into_inner())).await {
        Ok(data) => HttpResponse::Ok().json(data.ok()),
        Err(err) => HttpResponse::Ok().body(err.to_string()),
    }
}

#[put("")]
async fn update_quiz(pool: web::Data<DbPool>, quiz_data: web::Json<UpdateQuiz>) -> impl Responder {
    match web::block(move || QuizService::update_quiz(pool, quiz_data.into_inner())).await {
        Ok(data) => HttpResponse::Ok().json(data.ok()),
        Err(err) => HttpResponse::BadRequest().body(err.to_string()),
    }
}

#[delete("/{quiz_id}")]
async fn delete_quiz(pool: web::Data<DbPool>, quiz_id: web::Path<Uuid>) -> impl Responder {
    match web::block(move || QuizService::delete_quiz(pool, quiz_id.into_inner())).await {
        Ok(data) => HttpResponse::Ok().json(data.ok()),
        Err(err) => HttpResponse::BadRequest().body(err.to_string()),
    }
}

pub fn quiz_route() -> actix_web::Scope {
    web::scope("/quizzes")
        .service(get_all_quiz)
        .service(get_quiz)
        .service(create_quiz)
        .service(update_quiz)
        .service(delete_quiz)
}
