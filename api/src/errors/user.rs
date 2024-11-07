use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use derive_more::Display;
use serde::Serialize;

#[derive(Debug, Serialize)]
struct ResponseBody {
    message: String,
}

#[derive(Debug, Serialize, Display)]
pub enum UserError {
    #[display(fmt = "Could not retrieve user")]
    UserRetrievalError,

    #[display(fmt = "Could not update user")]
    UserUpdateError,

    #[display(fmt = "Could not delete user")]
    UserDeletionError,

    #[display(fmt = "User not found")]
    UserNotFoundError,

    #[display(fmt = "Unknown error occurred")]
    UnknownError,

    #[display(fmt = "There is a problem with the database")]
    DatabaseError,
}

impl ResponseError for UserError {
    fn error_response(&self) -> HttpResponse {
        let (status, message) = match self {
            UserError::UserRetrievalError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Could not retrieve user")
            }
            UserError::UserUpdateError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Could not update user")
            }
            UserError::UserDeletionError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Could not delete user")
            }
            UserError::UserNotFoundError => (StatusCode::NOT_FOUND, "User not found"),
            UserError::UnknownError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Unknown error occurred")
            }
            UserError::DatabaseError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "There is a problem with the database",
            ),
        };
        HttpResponse::build(status).json(ResponseBody {
            message: message.to_string(),
        })
    }
}
