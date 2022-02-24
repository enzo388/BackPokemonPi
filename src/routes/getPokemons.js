const { Router } = require('express');
const axios = require('axios').default;
const {get_all_data, get_detail, get_db_data} = require('../controllers');
const {POKEMON_NAME} = require('../utils/constants');

const router = Router();

router.get('/pokemons', async (req, res) => {
    try{
        const {name} = req.query;
        if(!name){
            return res.status(200).send(await get_all_data());
        }else{
            const pokemons_db = await get_db_data();
            const existe_db = pokemons_db.find( pokemon => pokemon.name === name.toLowerCase());
            if(existe_db){
                console.log("El pokemon se trajo de la db");
                return res.status(200).send(existe_db);
            }
            try{
                const existe_api = await axios.get(`${POKEMON_NAME}${name.toLowerCase()}`);
                if(existe_api.data){
                    console.log("El pokemon se trajo de la api");
                    return res.status(200).send(get_detail(existe_api.data));
                }
            }catch(e){
                console.log("El pokemon buscado no existe");
                return res.sendStatus(404);
            }
        }
    }catch(error){
        console.log(error);
    }
});

module.exports = router;