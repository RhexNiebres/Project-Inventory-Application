const queries = require("../db/queries");

exports.getIndex = (req, res) => {
    res.render('index', { title: "Welcome to PokéVault" });
};

exports.getPokemons = async (req, res) => {
    const { rows: pokemons } = await queries.getAllPokemonsWithTypes();
    res.render('pokemon', { pokemons });
};

exports.getTrainers = async (req, res) => {
    const { rows: trainers } = await queries.getAllTrainers();

    // Fetch Pokémon for each trainer
    for (const trainer of trainers) {
        const { rows: pokemons } = await queries.getPokemonsForTrainer(trainer.id);
        trainer.pokemons = pokemons;  // Add Pokémon list to each trainer
    }

    res.render('trainers', { trainers });
};


exports.getAddPokemon = (req, res) => {
    res.render('addPokemon');
};

exports.postAddPokemon = async (req, res) => {
    const { name, types } = req.body;
    
    // Ensure types is an array before iterating
    if (Array.isArray(types)) {
        const { rows } = await queries.addPokemon(name);
        const pokemonId = rows[0].id;

        for (const type of types) {
            const { rows: typeRow } = await queries.getTypeId(type);
            if (typeRow.length) {
                await queries.insertPokemonType(pokemonId, typeRow[0].id);
            }
        }
    } else {
        console.error('Types is not an array:', types);
    }
    
    res.redirect('/pokemon');
};



exports.getAddTrainer = (req, res) => {
    res.render('addTrainers');
};

exports.postAddTrainer = async (req, res) => {
    const { name, region } = req.body;
    await queries.addTrainer(name, region);
    res.redirect('/trainers');
};

exports.getEditPokemon = async (req, res) => {
    const { rows: pokemons } = await queries.getPokemonWithTypes(req.params.id);
    if (pokemons.length > 0) {
        res.render("editPokemon", { pokemon: pokemons[0] });
    } else {
        res.redirect("/pokemon");
    }
};

exports.postUpdatePokemon = async (req, res) => {
    const { name, types } = req.body;
    const pokemonId = req.params.id;

    // Update Pokémon name
    await queries.updatePokemon(name, pokemonId);

    // Delete old types associated with the Pokémon
    await queries.deletePokemonTypes(pokemonId);

    // Insert new types for the Pokémon
    if (Array.isArray(types)) {
        for (const type of types) {
            const { rows: typeRow } = await queries.getTypeId(type);
            if (typeRow.length) {
                await queries.insertPokemonType(pokemonId, typeRow[0].id);
            }
        }
    } else {
        console.error('Types is not an array:', types);
    }

    res.redirect('/pokemon');
};


exports.getEditTrainer = async (req, res) => {
    const { rows } = await queries.getTrainerById(req.params.id);
    if (!rows.length) return res.status(404).send("Trainer not found");
    res.render("editTrainer", { trainer: rows[0] });
};

exports.postUpdateTrainer = async (req, res) => {
    const { name, region } = req.body;
    await queries.updateTrainer(name, region, req.params.id);
    res.redirect("/trainers");
};

exports.postDeletePokemon = async (req, res) => {
    await queries.deletePokemonTypes(req.params.id);
    await queries.deletePokemon(req.params.id);
    res.redirect('/pokemon');
};

exports.postDeleteTrainer = async (req, res) => {
    await queries.deleteTrainer(req.params.id);
    res.redirect('/trainers');
};

