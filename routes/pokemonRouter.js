const express = require('express');
const router = express.Router();
const pokemonTrainerController = require('../controllers/pokemonTrainerController');

router.get('/', pokemonTrainerController.getIndex)
router.get('/pokemon', pokemonTrainerController.getPokemons);
router.get('/trainers', pokemonTrainerController.getTrainers);
router.post('/pokemon/add', pokemonTrainerController.postAddPokemon);
router.post('/trainer/add', pokemonTrainerController.postAddTrainer);

module.exports = router;