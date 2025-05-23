use dotenvy::dotenv;
use std::env;

pub fn get_database_url() -> String {
    dotenv().ok();
    env::var("DATABASE_URL").expect("DATABASE_URL must be set")
}

pub fn get_jwt_key() -> String {
    dotenv().ok();
    env::var("JWTKEY").expect("JWTKEY must be set")
}

pub fn get_cors_origin() -> String {
    dotenv().ok();
    env::var("CORS_ORIGIN").expect("CORS_ORIGIN must be set")
}
