use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use derive_more::Display;
use serde::Serialize;

#[derive(Debug, Serialize)]
struct ResponseBody {
    message: String,
}

#[derive(Debug, Serialize, Display)]
pub enum QuizResultError {
    #[display(fmt = "Could not save quiz results")]
    QuizSaveError,

    #[display(fmt = "Unknown error occurred")]
    UnknownError,

    #[display(fmt = "There is a problem with the database")]
    DatabaseError,
}

impl ResponseError for QuizResultError {
    fn error_response(&self) -> HttpResponse {
        let (status, message) = match self {
            QuizResultError::QuizSaveError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Could not retrieve quiz")
            }
            QuizResultError::UnknownError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Unknown error occurred")
            }
            QuizResultError::DatabaseError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "There is a problem with the database",
            ),
        };
        HttpResponse::build(status).json(ResponseBody {
            message: message.to_string(),
        })
    }
}
