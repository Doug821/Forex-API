CREATE DATABASE forexexchanges;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS exchanges (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  send REAL NOT NULL,
  receive REAL NOT NULL,
  operation VARCHAR NOT NULL,
  createdAt VARCHAR NOT NULL DEFAULT now()
);
