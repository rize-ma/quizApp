use diesel::pg::PgConnection;
use diesel::r2d2::Pool;
use diesel::r2d2::{self, ConnectionManager};

use super::env::get_database_url;

pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn get_pool() -> DbPool {
    let database_url = get_database_url();
    let manager = ConnectionManager::<PgConnection>::new(database_url);

    Pool::builder()
        .build(manager)
        .expect("It cannot create pool")
}
