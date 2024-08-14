use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, TokenData, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::errors::auth::AuthError;

use super::env::get_jwt_key;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub user_id: Uuid,
    pub iat: usize,
    pub exp: usize,
}

pub fn create_token(user_id: Uuid) -> Result<String, AuthError> {
    let secret = get_jwt_key();
    let now = Utc::now();
    let iat = now.timestamp() as usize;
    let exp = (now + Duration::hours(8)).timestamp() as usize;
    let claims = Claims { user_id, iat, exp };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref()),
    );
    match token {
        Ok(token) => Ok(token),
        Err(_) => return Err(AuthError::CreateJwtTokenError),
    }
}

pub fn decode_token(token: String) -> Result<TokenData<Claims>, AuthError> {
    let secret = get_jwt_key();
    let token_data = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    );
    match token_data {
        Ok(token_data) => Ok(token_data),
        Err(_) => return Err(AuthError::DecodeJwtTokenError),
    }
}
