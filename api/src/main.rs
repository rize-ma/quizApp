use ::quiz::config::db_connection::get_pool;
use ::quiz::routes::auth::auth_route;
use ::quiz::routes::quiz::quiz_route;
use actix_web::middleware::Logger;
use actix_web::{middleware, web, App, HttpServer};
use pos::middleware::authentication_token;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            //.wrap(middleware::NormalizePath::default())
            .service(auth_route())
            .service(
                web::scope("/api")
                    .wrap(authentication_token::Authentication)
                    .service(quiz_route()),
            )
            .app_data(web::Data::new(get_pool().clone()))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
