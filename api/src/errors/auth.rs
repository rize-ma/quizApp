use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use derive_more::Display;
use serde::Serialize;

#[derive(Debug, Serialize)]
struct ResponseBody {
    message: String,
}

#[derive(Debug, Serialize, Display)]
pub enum AuthError {
    #[display(fmt = "Could not create JWT token")]
    CreateJwtTokenError,

    #[display(fmt = "There is a problem with the database")]
    DatabaseError,

    #[display(fmt = "Could not decode JWT token")]
    DecodeJwtTokenError,

    #[display(fmt = "Registered email address")]
    EmailAlreadyRegistered,

    #[display(fmt = "Email address does not exist")]
    EmailNotFound,

    #[display(fmt = "Password is incorrect")]
    IncorrectPassword,

    #[display(fmt = "Login failed")]
    LoginFailed,

    #[display(fmt = "Password hashing fails")]
    PasswordHashingError,

    #[display(fmt = "Unknown error occurred")]
    UnknownError,

    #[display(fmt = "Registered userId")]
    UserIdAlreadyRegistered,

    #[display(fmt = "Could not save quiz results")]
    UserRegistrationError,
}

impl ResponseError for AuthError {
    fn error_response(&self) -> HttpResponse {
        let (status, message) = match self {
            AuthError::CreateJwtTokenError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "Could not create JWT token",
            ),
            AuthError::DatabaseError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "There is a problem with the database",
            ),
            AuthError::DecodeJwtTokenError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "Could not decode JWT token",
            ),
            AuthError::EmailAlreadyRegistered => (StatusCode::CONFLICT, "Registered email address"),
            AuthError::EmailNotFound => (StatusCode::NOT_FOUND, "Email address does not exist"),
            AuthError::IncorrectPassword => (StatusCode::UNAUTHORIZED, "Password is incorrect"),
            AuthError::LoginFailed => (StatusCode::UNAUTHORIZED, "Login failed"),
            AuthError::PasswordHashingError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Password hashing fails")
            }
            AuthError::UnknownError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "Unknown error occurred")
            }
            AuthError::UserIdAlreadyRegistered => (StatusCode::CONFLICT, "Registered userId"),
            AuthError::UserRegistrationError => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "User registration failed",
            ),
        };
        HttpResponse::build(status).json(ResponseBody {
            message: message.to_string(),
        })
    }
}
