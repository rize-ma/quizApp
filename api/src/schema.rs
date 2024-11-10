// @generated automatically by Diesel CLI.

diesel::table! {
    quiz_results (id) {
        id -> Uuid,
        answered_at -> Nullable<Timestamp>,
        is_correct -> Bool,
        quiz_id -> Uuid,
        selected_option -> Int4,
        user_id -> Uuid,
        created_at -> Nullable<Timestamp>,
    }
}

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
    users (id) {
        id -> Uuid,
        correct_answers_count -> Nullable<Int4>,
        email -> Text,
        #[max_length = 255]
        icon_url -> Nullable<Varchar>,
        #[max_length = 255]
        password -> Varchar,
        #[max_length = 255]
        salt -> Varchar,
        self_introduction -> Nullable<Text>,
        #[max_length = 255]
        user_id -> Varchar,
        #[max_length = 255]
        username -> Varchar,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::joinable!(quiz_results -> quizzes (quiz_id));
diesel::joinable!(quiz_results -> users (user_id));
diesel::joinable!(quizzes -> users (created_by));

diesel::allow_tables_to_appear_in_same_query!(
    quiz_results,
    quizzes,
    users,
);
