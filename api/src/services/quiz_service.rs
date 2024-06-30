use crate::db::establish_connection;
use crate::models::{NewQuiz, NewUserQuizResult, Quiz, QuizUpdate, UserQuizResult};
use crate::schema::{quizzes, user_quiz_results};
use diesel::prelude::*;
use diesel::result::Error;

pub struct QuizService;

impl QuizService {
    pub fn create_quiz(new_quiz: NewQuiz) -> Result<Quiz, Error> {
        use crate::schema::quizzes::dsl::*;

        let connection = &mut establish_connection();
        diesel::insert_into(quizzes)
            .values(&new_quiz)
            .get_result(connection)
    }

    pub fn get_quiz(quiz_id: i32) -> Result<Quiz, Error> {
        use crate::schema::quizzes::dsl::*;

        let connection = &mut establish_connection();
        quizzes.find(quiz_id).first(connection)
    }

    pub fn update_quiz(quiz_id: i32, quiz_update: QuizUpdate) -> Result<Quiz, Error> {
        use crate::schema::quizzes::dsl::*;

        let connection = &mut establish_connection();
        diesel::update(quizzes.find(quiz_id))
            .set(&quiz_update)
            .get_result(connection)
    }

    pub fn delete_quiz(quiz_id: i32) -> Result<usize, Error> {
        use crate::schema::quizzes::dsl::*;

        let connection = &mut establish_connection();
        diesel::delete(quizzes.find(quiz_id)).execute(connection)
    }

    pub fn get_all_quizzes() -> Result<Vec<Quiz>, Error> {
        use crate::schema::quizzes::dsl::*;

        let connection = &mut establish_connection();
        quizzes.load::<Quiz>(connection)
    }

    pub fn record_quiz_result(new_result: NewUserQuizResult) -> Result<UserQuizResult, Error> {
        use crate::schema::user_quiz_results::dsl::*;

        let connection = &mut establish_connection();
        diesel::insert_into(user_quiz_results)
            .values(&new_result)
            .get_result(connection)
    }

    pub fn get_user_results(user_id: i32) -> Result<Vec<UserQuizResult>, Error> {
        use crate::schema::user_quiz_results::dsl::*;

        let connection = &mut establish_connection();
        user_quiz_results
            .filter(user_id.eq(user_id))
            .load::<UserQuizResult>(connection)
    }
}
