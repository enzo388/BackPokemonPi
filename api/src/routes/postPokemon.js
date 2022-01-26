const { Router } = require('express');
const {Pokemon, Type} = require('../db');

const router = Router();

router.post('/pokemon', async (req, res, next) => {
    try{
        const {name, image, hp, attack, defense, speed, height, weight, create, types} = req.body;
        if(!name || !types){
            console.log("Faltan datos: name o types");
            return res.sendStatus(404);
        }
        if(typeof name !== 'string' &&  typeof image !== 'string'  && typeof hp !== 'number' && typeof attack !== 'number' && typeof defense !== 'number' && typeof speed !== 'number' && typeof height !== 'number' && typeof weight !== 'number'){
            console.log("Datos erroneos");
            return res.sendStatus(404);
        }
       
        else{
            const pokemon_created = await Pokemon.create({
                name: name.toLowerCase(),
                image,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                create
            });
            const all_types = await Type.findAll({
                where: {
                    name: types
                }
            });
            await pokemon_created.addType(all_types);
            console.log("El pokemon fue creado con éxito");
            return res.sendStatus(200);
        }
    }catch(error){
        next(error);
    }
});

module.exports = router;