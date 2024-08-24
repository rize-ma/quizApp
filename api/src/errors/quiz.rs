use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use derive_more::Display;
use serde::Serialize;

#[derive(Debug, Serialize)]
struct ResponseBody {
    message: String,
}

#[derive(Debug, Serialize, Display)]
pub enum QuizError {
    #[display(fmt = "Could not retrieve quiz")]
    QuizRetrievalError,

    #[display(fmt = "Could not create quiz")]
    QuizCreationError,

    #[display(fmt = "Could not update quiz")]
    QuizUpdateError,

    #[display(fmt = "Could not delete quiz")]
    QuizDeletionError,

    #[display(fmt = "Unknown error occurred")]
    UnknownError,

    #[display(fmt = "There is a problem with the database")]
    DatabaseError,
}

impl ResponseError for QuizError {
    fn error_response(&self) -> HttpResponse {
        let (status, message) = match self {
            QuizError::QuizRetrievalError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Could not retrieve quiz")
            }
            QuizError::QuizCreationError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Could not create quiz")
            }
            QuizError::QuizUpdateError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Could not update quiz")
            }
            QuizError::QuizDeletionError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Could not delete quiz")
            }
            QuizError::UnknownError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Unknown error occurred")
            }
            QuizError::DatabaseError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "There is a problem with the database",
            ),
        };
        HttpResponse::build(status).json(ResponseBody {
            message: message.to_string(),
        })
    }
}
