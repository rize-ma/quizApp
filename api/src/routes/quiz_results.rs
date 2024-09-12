use crate::config::db_connection::DbPool;
use crate::errors::quiz_result::QuizResultError;
use crate::models::quiz_results::NewQuizResult;
use crate::services::quiz_results::QuizResultsService;
use actix_web::{post, web, HttpResponse, Responder};

#[post("")]
async fn save_results(
    pool: web::Data<DbPool>,
    quiz_results: web::Json<Vec<NewQuizResult>>,
) -> impl Responder {
    match web::block(move || QuizResultsService::save_results(pool, quiz_results.into_inner()))
        .await
    {
        Ok(Ok(data)) => Ok(HttpResponse::Ok().json(data)),
        Ok(Err(err)) => Err(err),
        Err(_) => Err(QuizResultError::UnknownError),
    }
}

pub fn quiz_result_route() -> actix_web::Scope {
    web::scope("/quiz_results").service(save_results)
}
