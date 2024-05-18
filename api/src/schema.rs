// @generated automatically by Diesel CLI.

diesel::table! {
    posts (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        published -> Bool,
    }
}

diesel::table! {
    quizzes (id) {
        id -> Int4,
        question -> Text,
        option1 -> Text,
        option2 -> Text,
        option3 -> Text,
        option4 -> Text,
        correct_option -> Int4,
        created_by -> Nullable<Int4>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    user_quiz_results (id) {
        id -> Int4,
        user_id -> Nullable<Int4>,
        quiz_id -> Nullable<Int4>,
        selected_option -> Int4,
        is_correct -> Bool,
        answered_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        #[max_length = 255]
        username -> Varchar,
        #[max_length = 255]
        icon_url -> Nullable<Varchar>,
        correct_answers_count -> Nullable<Int4>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::joinable!(quizzes -> users (created_by));
diesel::joinable!(user_quiz_results -> quizzes (quiz_id));
diesel::joinable!(user_quiz_results -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    posts,
    quizzes,
    user_quiz_results,
    users,
);
