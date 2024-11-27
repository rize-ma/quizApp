use crate::errors::quiz::QuizError;
use crate::models::quiz::UpdateQuiz;
use crate::services::quiz::QuizService;
use crate::{config::db_connection::DbPool, models::quiz::NewQuiz};
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use serde_json::json;
use uuid::Uuid;

#[get("")]
async fn get_all_quiz(pool: web::Data<DbPool>) -> impl Responder {
    match web::block(move || QuizService::get_all_quiz(pool)).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(QuizError::UnknownError),
    }
}

#[get("/{count}")]
async fn get_quizzes(pool: web::Data<DbPool>, count: web::Path<usize>) -> impl Responder {
    match web::block(move || QuizService::get_random_quizzes(pool, count.into_inner())).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(QuizError::UnknownError),
    }
}

#[get("/{quiz_id}")]
async fn find_quiz_by_quiz_id(pool: web::Data<DbPool>, quiz_id: web::Path<Uuid>) -> impl Responder {
    match web::block(move || QuizService::find_quiz_by_quiz_id(pool, quiz_id.into_inner())).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(QuizError::UnknownError),
    }
}

#[get("/{user_id}")]
async fn find_quiz_by_user_id(pool: web::Data<DbPool>, user_id: web::Path<Uuid>) -> impl Responder {
    match web::block(move || QuizService::find_quiz_by_user_id(pool, user_id.into_inner())).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(QuizError::UnknownError),
    }
}

#[post("")]
async fn create_quiz(pool: web::Data<DbPool>, quiz_data: web::Json<NewQuiz>) -> impl Responder {
    match web::block(move || QuizService::create_quiz(pool, quiz_data.into_inner())).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(QuizError::UnknownError),
    }
}

#[put("")]
async fn update_quiz(pool: web::Data<DbPool>, quiz_data: web::Json<UpdateQuiz>) -> impl Responder {
    match web::block(move || QuizService::update_quiz(pool, quiz_data.into_inner())).await {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(QuizError::UnknownError),
    }
}

#[delete("")]
async fn delete_quizzes(pool: web::Data<DbPool>, quiz_ids: web::Json<Vec<Uuid>>) -> impl Responder {
    match web::block(move || QuizService::delete_quizzes(pool, quiz_ids.into_inner())).await {
        Ok(Ok(deleted_count)) => {
            Ok(HttpResponse::Ok().json(json!({ "deleted_count": deleted_count })))
        }
        Ok(Err(err)) => Err(err),
        Err(_) => Err(QuizError::UnknownError),
    }
}

pub fn quiz_route() -> actix_web::Scope {
    web::scope("/quizzes")
        .service(get_all_quiz)
        .service(get_quizzes)
        .service(find_quiz_by_quiz_id)
        .service(find_quiz_by_user_id)
        .service(create_quiz)
        .service(update_quiz)
        .service(delete_quizzes)
}
