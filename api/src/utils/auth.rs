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

pub fn hash_password(password: &[u8]) -> Result<String, AuthError> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    match argon2.hash_password(password, &salt) {
        Ok(hashed_password) => Ok(hashed_password.to_string()),
        Err(_) => return Err(AuthError::PasswordHashingError),
    }
}
