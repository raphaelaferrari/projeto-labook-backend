-- Active: 1684947223489@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME() NOT NULL),
    updated_at TEXT DEFAULT (DATETIME() NOT NULL),
    FOREIGN KEY (creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO users (id, name, email, password, role)
VALUES
-- senha: 111111
("001","Admin","admin@gmail.com","$2a$12$.Tr7PaR/Uk76AQ5R/eFN7uPsPnGsPtHjt0ZtR4WwtnnMKrD3YfGAG","ADMIN");


INSERT INTO posts (id, creator_id, content)
VALUES 
("p001", "001", "Sou admin!");

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;