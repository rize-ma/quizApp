use crate::{
    config::db_connection::DbPool,
    errors::quiz_result::QuizResultError,
    models::quiz_results::{NewQuizResult, QuizResult},
    schema::quiz_results::dsl::quiz_results,
};
use actix_web::web;
use diesel::prelude::*;
pub struct QuizResultsService;

impl QuizResultsService {
    pub fn save_results(
        pool: web::Data<DbPool>,
        results: Vec<NewQuizResult>,
    ) -> Result<Vec<QuizResult>, QuizResultError> {
        let mut conn = pool.get().map_err(|_| QuizResultError::UnknownError)?;
        diesel::insert_into(quiz_results)
            .values(&results)
            .get_results(&mut conn)
            .map_err(|_| QuizResultError::QuizSaveError)
    }
}
