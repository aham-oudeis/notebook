CREATE DATABASE notebook;

\c notebook 

CREATE TABLE notes(
  note_id SERIAL PRIMARY KEY,
  content VARCHAR,
  author varchar(255)
);
