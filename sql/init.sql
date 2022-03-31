CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- https://www.postgresql.org/docs/9.6/static/contrib.html
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- https://www.postgresql.org/docs/9.6/static/contrib.html

CREATE TABLE IF NOT EXISTS app_user (
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uuid)
);

INSERT INTO app_user (username, email, password) VALUES ('admin', 'netomatiazi@hotmail.com', crypt('123456', 'my_salt'))
DELETE FROM app_user WHERE email = 'netomatiazi@hotmail.com'