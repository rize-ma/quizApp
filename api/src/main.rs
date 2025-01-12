use ::quiz::config::db_connection::get_pool;
use ::quiz::routes::auth::auth_route;
use ::quiz::routes::quiz::quiz_route;
use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{http, middleware, web, App, HttpServer};
use quiz::middleware::authentication_token;
use quiz::routes::quiz_results::quiz_result_route;
use quiz::routes::user::user_route;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:5173")
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"])
                    .allowed_headers(vec![
                        http::header::AUTHORIZATION,
                        http::header::ACCEPT,
                        http::header::CONTENT_TYPE,
                    ])
                    .supports_credentials()
                    .max_age(3600)
                    .send_wildcard(),
            )
            .wrap(Logger::default())
            .wrap(middleware::NormalizePath::default())
            .service(auth_route())
            .service(
                web::scope("/api")
                    .wrap(authentication_token::Authentication)
                    .service(quiz_route())
                    .service(quiz_result_route())
                    .service(user_route()),
            )
            .app_data(web::Data::new(get_pool().clone()))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
