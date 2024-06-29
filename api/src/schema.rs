// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Int4,
        username -> Varchar,
        icon_url -> Nullable<Varchar>,
        correct_answers_count -> Int4,
        created_at -> Timestamp,
        updated_at -> Timestamp,
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
        created_by -> Int4,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    user_quiz_results (id) {
        id -> Int4,
        user_id -> Int4,
        quiz_id -> Int4,
        selected_option -> Int4,
        is_correct -> Bool,
        answered_at -> Timestamp,
    }
}

diesel::joinable!(quizzes -> users (created_by));
diesel::joinable!(user_quiz_results -> quizzes (quiz_id));
diesel::joinable!(user_quiz_results -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(quizzes, user_quiz_results, users,);
