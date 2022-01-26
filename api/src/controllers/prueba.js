const axios = require('axios').default;
const { POKEMONS_URL } = require('../utils/constants');
const {Pokemon, Type} = require('../db');
//la funcion es asincrona porque puede tardar en resolver las promesas 




async function get_db_data(){
    //creo una variable pokemons donde voy a meter lo que me traigo
    try {
        let pokemons = await Pokemon.findAll({
            //le digo que me traiga solo esos atributos de la tabla de pokemon y el atributo name de la tabla de tipos que coincida con ese pokemon
            attributes: ['id', 'name', 'height', 'weight', 'hp', 'attack', 'defense', 'speed', 'image', 'create'],
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        console.log(pokemons, "asdasdasdasdasdads")
    } catch (error) {
        
    }
    
    //name ID tipo
    //verifico si no esta vacio
    /* if(pokemons.length !== 0){
        //si no esta vacio le piso los valores con un map 
        pokemons = pokemons.map(pok => pok.toJSON());
        //
        for(let i=0; i<pokemons.length; i++){
            pokemons[i].types = pokemons[i].types.map(type => type.name);
        }
    }
    return pokemons; */
}

get_db_data()