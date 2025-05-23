use crate::{
    config::db_connection::DbPool,
    errors::quiz::QuizError,
    models::quiz::{NewQuiz, Quiz, UpdateQuiz},
    schema::quizzes::dsl::{created_by, id, quizzes},
};
use actix_web::web;
use diesel::prelude::*;
use rand::seq::SliceRandom;
use uuid::Uuid;

pub struct QuizService;

impl QuizService {
    pub fn find_quiz_by_quiz_id(pool: web::Data<DbPool>, quiz_id: Uuid) -> Result<Quiz, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::DatabaseError)?;
        quizzes
            .filter(id.eq(quiz_id))
            .first(&mut conn)
            .map_err(|_| QuizError::QuizRetrievalError)
    }

    pub fn find_quiz_by_user_id(
        pool: web::Data<DbPool>,
        user_id: Uuid,
    ) -> Result<Vec<Quiz>, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::DatabaseError)?;
        quizzes
            .filter(created_by.eq(user_id))
            .load::<Quiz>(&mut conn)
            .map_err(|_| QuizError::QuizRetrievalError)
    }

    pub fn get_all_quiz(pool: web::Data<DbPool>) -> Result<Vec<Quiz>, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::DatabaseError)?;
        quizzes
            .load::<Quiz>(&mut conn)
            .map_err(|_| QuizError::QuizRetrievalError)
    }

    pub fn get_random_quizzes(
        pool: web::Data<DbPool>,
        count: usize,
    ) -> Result<Vec<Quiz>, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::DatabaseError)?;
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
        let mut conn = pool.get().map_err(|_| QuizError::DatabaseError)?;
        diesel::insert_into(quizzes)
            .values(&new_quiz)
            .get_result(&mut conn)
            .map_err(|_| QuizError::QuizCreationError)
    }

    pub fn update_quiz(pool: web::Data<DbPool>, quiz: UpdateQuiz) -> Result<Quiz, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::DatabaseError)?;
        diesel::update(quizzes.find(quiz.id))
            .set(&quiz)
            .get_result(&mut conn)
            .map_err(|_| QuizError::QuizUpdateError)
    }

    pub fn delete_quiz(pool: web::Data<DbPool>, quiz_id: Uuid) -> Result<usize, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::DatabaseError)?;
        diesel::delete(quizzes.filter(id.eq(quiz_id)))
            .execute(&mut conn)
            .map_err(|_| QuizError::QuizDeletionError)
    }

    pub fn delete_quizzes(
        pool: web::Data<DbPool>,
        quiz_ids: Vec<Uuid>,
    ) -> Result<usize, QuizError> {
        let mut conn = pool.get().map_err(|_| QuizError::DatabaseError)?;
        diesel::delete(quizzes.filter(id.eq_any(quiz_ids)))
            .execute(&mut conn)
            .map_err(|_| QuizError::QuizDeletionError)
    }
}
