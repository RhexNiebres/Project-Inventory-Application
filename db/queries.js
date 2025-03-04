const pool = require("./pool");

const getAllPokemonsWithTypes = async () => {
  return pool.query(`
      SELECT pokemons.id, pokemons.name, 
      COALESCE(ARRAY_AGG(types.name), ARRAY[]::text[]) AS types 
      FROM pokemons 
      LEFT JOIN pokemon_types ON pokemons.id = pokemon_types.pokemon_id 
      LEFT JOIN types ON pokemon_types.type_id = types.id 
      GROUP BY pokemons.id
  `);
};


// Get a single Pokémon with types
const getPokemonWithTypes = async (id) => {
    return pool.query(`
        SELECT pokemons.id, pokemons.name, ARRAY_AGG(types.name) AS types 
        FROM pokemons 
        LEFT JOIN pokemon_types ON pokemons.id = pokemon_types.pokemon_id 
        LEFT JOIN types ON pokemon_types.type_id = types.id 
        WHERE pokemons.id = $1 
        GROUP BY pokemons.id
    `, [id]);
};

// Get all Trainers
const getAllTrainers = async () => {
    return pool.query("SELECT * FROM trainers");
};

// Get Trainer by ID
const getTrainerById = async (id) => {
    return pool.query("SELECT * FROM trainers WHERE id = $1", [id]);
};

// Add Pokémon
const addPokemon = async (name) => {
    return pool.query("INSERT INTO pokemons (name) VALUES ($1) RETURNING id", [name]);
};

// Get Type ID
const getTypeId = async (type) => {
    return pool.query("SELECT id FROM types WHERE name = $1", [type]);
};

// Insert into pokemon_types
const insertPokemonType = async (pokemonId, typeId) => {
    return pool.query("INSERT INTO pokemon_types (pokemon_id, type_id) VALUES ($1, $2)", [pokemonId, typeId]);
};

// Add Trainer
const addTrainer = async (name, region) => {
    return pool.query("INSERT INTO trainers (name, region) VALUES ($1, $2)", [name, region]);
};

// Update Pokémon
const updatePokemon = async (name, id) => {
    return pool.query("UPDATE pokemons SET name = $1 WHERE id = $2", [name, id]);
};

// Delete Pokémon Types
const deletePokemonTypes = async (id) => {
    return pool.query("DELETE FROM pokemon_types WHERE pokemon_id = $1", [id]);
};

// Delete Pokémon
const deletePokemon = async (id) => {
    return pool.query("DELETE FROM pokemons WHERE id = $1", [id]);
};

// Update Trainer
const updateTrainer = async (name, region, id) => {
    return pool.query("UPDATE trainers SET name = $1, region = $2 WHERE id = $3", [name, region, id]);
};

// Delete Trainer's Pokémon relationships
const deleteTrainerPokemons = async (id) => {
    return pool.query("DELETE FROM trainer_pokemons WHERE trainer_id = $1", [id]);
};

// Delete Trainer
const deleteTrainer = async (id) => {
    return pool.query("DELETE FROM trainers WHERE id = $1", [id]);
};

// Get Pokémon for a specific trainer
const getPokemonsForTrainer = async (trainerId) => {
  return pool.query(`
      SELECT pokemons.id, pokemons.name
      FROM pokemons
      JOIN trainer_pokemons ON trainer_pokemons.pokemon_id = pokemons.id
      WHERE trainer_pokemons.trainer_id = $1
  `, [trainerId]);
};


module.exports = {
    getAllPokemonsWithTypes,
    getPokemonWithTypes,
    getAllTrainers,
    getTrainerById,
    addPokemon,
    getTypeId,
    insertPokemonType,
    addTrainer,
    updatePokemon,
    deletePokemonTypes,
    deletePokemon,
    updateTrainer,
    deleteTrainerPokemons,
    deleteTrainer,
    getPokemonsForTrainer,
};

// Insert Pokémon for Trainer
const insertPokemonForTrainer = async (trainerId, pokemonId) => {
    return pool.query(`
        INSERT INTO trainer_pokemons (trainer_id, pokemon_id)
        VALUES ($1, $2)
    `, [trainerId, pokemonId]);
};
