\c notebook 

CREATE SEQUENCE counter MINVALUE 382737 INCREMENT 111;

CREATE TABLE anecdotes(
  note_id integer NOT NULL PRIMARY KEY DEFAULT nextval('counter'),
  content VARCHAR,
  author varchar(255),
  votes integer DEFAULT 0
);
