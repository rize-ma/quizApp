use crate::{
    config::db_connection::DbPool,
    models::quiz::{NewQuiz, Quiz, UpdateQuiz},
    schema::quizzes::dsl::{id, quizzes},
};
use actix_web::web;
use diesel::prelude::*;
use diesel::result::Error;
use uuid::Uuid;

pub struct QuizService;

impl QuizService {
    pub fn get_quiz(pool: web::Data<DbPool>, quiz_id: Uuid) -> Result<Quiz, Error> {
        let mut conn = pool.get().unwrap();
        quizzes.filter(id.eq(quiz_id)).first(&mut conn)
    }

    pub fn get_all_quiz(pool: web::Data<DbPool>) -> Result<Vec<Quiz>, Error> {
        let mut conn = pool.get().unwrap();
        quizzes.load::<Quiz>(&mut conn)
    }

    pub fn create_quiz(pool: web::Data<DbPool>, new_quiz: NewQuiz) -> Result<Quiz, Error> {
        let mut conn = pool.get().unwrap();
        diesel::insert_into(quizzes)
            .values(&new_quiz)
            .get_result(&mut conn)
    }

    pub fn update_quiz(pool: web::Data<DbPool>, quiz_update: UpdateQuiz) -> Result<Quiz, Error> {
        let mut conn = pool.get().unwrap();
        diesel::update(quizzes.find(quiz_update.id))
            .set(&quiz_update)
            .get_result(&mut conn)
    }

    pub fn delete_quiz(pool: web::Data<DbPool>, quiz_id: Uuid) -> Result<usize, Error> {
        let mut conn = pool.get().unwrap();
        diesel::delete(quizzes.filter(id.eq(quiz_id))).execute(&mut conn)
    }
}
