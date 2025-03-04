const express = require('express');
const router = express.Router();
const pokemonTrainerController = require('../controllers/pokemonTrainerController');

router.get('/', pokemonTrainerController.getIndex)
router.get('/pokemon', pokemonTrainerController.getPokemons);
router.get('/trainers', pokemonTrainerController.getTrainers);

router.post('/pokemon/add', pokemonTrainerController.postAddPokemon);
router.post('/trainer/add', pokemonTrainerController.postAddTrainer);

router.get("/pokemon/edit/:id", pokemonTrainerController.getEditPokemon);
router.post("/pokemon/update/:id", pokemonTrainerController.postUpdatePokemon);


router.get("/trainer/edit/:id", pokemonTrainerController.getEditTrainer);
router.post("/trainer/update/:id", pokemonTrainerController.postUpdateTrainer);

router.post("/pokemon/delete/:id", pokemonTrainerController.postDeletePokemon);
router.post("/trainers/delete/:id", pokemonTrainerController.postDeleteTrainer);


module.exports = router;