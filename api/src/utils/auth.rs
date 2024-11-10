use crate::{errors::auth::AuthError, models::user::User};
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2,
};
use diesel::pg::Pg;
use diesel::prelude::*;
use diesel::sql_types::Bool;

pub fn find_user(
    conn: &mut PgConnection,
    filter: Box<dyn BoxableExpression<crate::schema::users::table, Pg, SqlType = Bool>>,
) -> Result<Option<User>, AuthError> {
    let user = crate::schema::users::table
        .filter(filter)
        .first::<User>(conn)
        .optional()
        .map_err(|_| AuthError::DatabaseError)?;
    Ok(user)
}

pub fn hash_password(password: &[u8], salt: Option<String>) -> Result<(String, String), AuthError> {
    let salt = match salt {
        Some(salt) => SaltString::from_b64(&salt).map_err(|_| AuthError::PasswordHashingError)?,
        None => SaltString::generate(&mut OsRng),
    };

    let argon2 = Argon2::default();
    let hashed_password = argon2
        .hash_password(password, &salt)
        .map_err(|_| AuthError::PasswordHashingError)?
        .to_string();

    Ok((hashed_password, salt.to_string()))
}
