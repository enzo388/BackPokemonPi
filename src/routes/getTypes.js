const { Router } = require('express');
const {Type} = require('../db');
const axios = require('axios').default;
const {POKEMONS_TYPES} = require('../utils/constants');
const {get_types} = require('../controllers');

const router = Router();

router.get('/types', async (req, res, next) => {
    try{
        const existe = await Type.findAll({
            attributes: ['name']
        });
        if(existe.length === 0){
            let response = await axios.get(`${POKEMONS_TYPES}`);
            response = response.data.results.map(type => Type.create({name: type.name}));
            response = await axios.all(response);
            console.log("Se crearon los types");
            return res.status(200).send(get_types(response));
        }else{
            console.log("Se trajeron de la db los types");
            return res.status(200).send(get_types(existe));
        }
    }catch(error){
        next(error);
    }
});

module.exports = router;