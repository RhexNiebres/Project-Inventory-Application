#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS pokemons (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS  pokemon_types(
  pokemon_id INTEGER REFERENCES pokemons(id) ON DELETE CASCADE,
  type_id INTEGER REFERENCES types(id) ON DELETE SET NULL,
  PRIMARY KEY (pokemon_id, type_id)
);

CREATE TABLE IF NOT EXISTS trainers ( 
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  region VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS  trainer_pokemons(
trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
pokemon_id INTEGER REFERENCES pokemons(id) ON DELETE CASCADE,
  PRIMARY KEY (trainer_id, pokemon_id)
);


INSERT INTO pokemons (name) 
VALUES
  ('Pikachu'),
  ('Snorlax'),
  ('Starmie'),
  ('Geodude'),
  ('Steelix');

INSERT INTO types (name) 
VALUES
  ('Electric'),
  ('Normal'),
  ('Rock'),
  ('Water'),
  ('Psychic'),
('Ground');

  

INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES
  ((SELECT id FROM pokemons WHERE name = 'Pikachu'), (SELECT id FROM types WHERE name = 'Electric')),
    ((SELECT id FROM pokemons WHERE name = 'Snorlax'), (SELECT id FROM types WHERE name = 'Normal')),
  ((SELECT id FROM pokemons WHERE name = 'Starmie'), (SELECT id FROM types WHERE name = 'Water')),
  ((SELECT id FROM pokemons WHERE name = 'Starmie'), (SELECT id FROM types WHERE name = 'Psychic')),
  ((SELECT id FROM pokemons WHERE name = 'Geodude'), (SELECT id FROM types WHERE name = 'Rock')),
  ((SELECT id FROM pokemons WHERE name = 'Geodude'), (SELECT id FROM types WHERE name = 'Ground')),
  ((SELECT id FROM pokemons WHERE name = 'Steelix'), (SELECT id FROM types WHERE name = 'Rock')),
  ((SELECT id FROM pokemons WHERE name = 'Steelix'), (SELECT id FROM types WHERE name = 'Ground'));


INSERT INTO trainers (name, region)  
VALUES
  ('Ash', 'Kanto'),
  ('Misty', 'Kanto'),
  ('Brock', 'Kanto');

INSERT INTO trainer_pokemons (trainer_id, pokemon_id)
VALUES
  ((SELECT id FROM trainers WHERE name = 'Ash'), (SELECT id FROM pokemons WHERE name = 'Pikachu')),
  ((SELECT id FROM trainers WHERE name = 'Misty'), (SELECT id FROM pokemons WHERE name = 'Starmie')),
  ((SELECT id FROM trainers WHERE name = 'Brock'), (SELECT id FROM pokemons WHERE name = 'Geodude')),
  ((SELECT id FROM trainers WHERE name = 'Brock'), (SELECT id FROM pokemons WHERE name = 'Steelix'));
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
