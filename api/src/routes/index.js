const { Router } = require('express');

const get_pokemons_router = require('./getPokemons');
const get_pokemon_router = require('./getPokemon');
const get_types_router = require('./getTypes');
const post_pokemon_router = require('./postPokemon');

const router = Router();

router.use('/', get_pokemons_router);
router.use('/', get_pokemon_router);
router.use('/', get_types_router);
router.use('/', post_pokemon_router);

module.exports = router;