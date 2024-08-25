use crate::{
    config::db_connection::DbPool,
    errors::quiz::QuizError,
    models::quiz::{NewQuiz, Quiz, UpdateQuiz},
    schema::quizzes::dsl::{id, quizzes},
};
use actix_web::web;
use diesel::prelude::*;
use rand::seq::SliceRandom;
use uuid::Uuid;

pub struct QuizService;

impl QuizService {
    pub fn get_quiz(pool: web::Data<DbPool>, quiz_id: Uuid) -> Result<Quiz, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::UnknownError)?;
        quizzes
            .filter(id.eq(quiz_id))
            .first(&mut conn)
            .map_err(|_| QuizError::QuizRetrievalError)
    }

    pub fn get_all_quiz(pool: web::Data<DbPool>) -> Result<Vec<Quiz>, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::UnknownError)?;
        quizzes
            .load::<Quiz>(&mut conn)
            .map_err(|_| QuizError::QuizRetrievalError)
    }

    pub fn get_random_quizzes(
        pool: web::Data<DbPool>,
        count: usize,
    ) -> Result<Vec<Quiz>, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::UnknownError)?;

        let all_quizzes = quizzes
            .load::<Quiz>(&mut conn)
            .map_err(|_| QuizError::QuizRetrievalError)?;

        let mut rng = rand::thread_rng();
        let selected_quizzes = all_quizzes
            .choose_multiple(&mut rng, count)
            .cloned()
            .collect();

        Ok(selected_quizzes)
    }

    pub fn create_quiz(pool: web::Data<DbPool>, new_quiz: NewQuiz) -> Result<Quiz, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::UnknownError)?;
        diesel::insert_into(quizzes)
            .values(&new_quiz)
            .get_result(&mut conn)
            .map_err(|_| QuizError::QuizCreationError)
    }

    pub fn update_quiz(
        pool: web::Data<DbPool>,
        quiz_update: UpdateQuiz,
    ) -> Result<Quiz, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::UnknownError)?;
        diesel::update(quizzes.find(quiz_update.id))
            .set(&quiz_update)
            .get_result(&mut conn)
            .map_err(|_| QuizError::QuizUpdateError)
    }

    pub fn delete_quiz(pool: web::Data<DbPool>, quiz_id: Uuid) -> Result<usize, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::UnknownError)?;
        diesel::delete(quizzes.filter(id.eq(quiz_id)))
            .execute(&mut conn)
            .map_err(|_| QuizError::QuizDeletionError)
    }
}
