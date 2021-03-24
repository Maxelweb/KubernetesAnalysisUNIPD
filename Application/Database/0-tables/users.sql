BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    surname VARCHAR(100),
    email text NOT NULL,
    certid text UNIQUE NOT NULL
);

COMMIT;