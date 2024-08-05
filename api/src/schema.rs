// @generated automatically by Diesel CLI.

diesel::table! {
    quizzes (id) {
        id -> Uuid,
        correct_option -> Int4,
        created_by -> Uuid,
        option1 -> Text,
        option2 -> Text,
        option3 -> Text,
        option4 -> Text,
        question -> Text,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    user_quiz_results (id) {
        id -> Uuid,
        is_correct -> Bool,
        quiz_id -> Nullable<Uuid>,
        selected_option -> Int4,
        user_id -> Nullable<Uuid>,
        answered_at -> Nullable<Timestamp>,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    users (id) {
        id -> Uuid,
        correct_answers_count -> Nullable<Int4>,
        email -> Text,
        #[max_length = 255]
        icon_url -> Nullable<Varchar>,
        self_introduction -> Nullable<Text>,
        #[max_length = 255]
        user_id -> Varchar,
        #[max_length = 255]
        username -> Varchar,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::joinable!(quizzes -> users (created_by));
diesel::joinable!(user_quiz_results -> quizzes (quiz_id));
diesel::joinable!(user_quiz_results -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    quizzes,
    user_quiz_results,
    users,
);
