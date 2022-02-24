const axios = require('axios').default;
const { POKEMONS_URL } = require('../utils/constants');
const {Pokemon, Type} = require('../db');

async function get_api_data(){
    //axios devuelve una promesa
    //me tarigo la info de la api
    let pokemons = await axios.get(POKEMONS_URL);
    //mapeo la url por cada pokemon
    pokemons = pokemons.data.results.map(obj => axios.get(obj.url));
    //axios.all resuelve varias solicitudes a la ves
    pokemons = await axios.all(pokemons);
    //mapeo la info que me trajo 
    pokemons = pokemons.map( obj => obj.data);
    //retorno una funcion con el array que  trajo con los pokemones 
    //
    return get_principal(pokemons);
}

function get_principal(arrayConLosPokemones){
    //mapeo el array con los objetos que tienen la info de cada pokemon
    //los recibe de lo que retorna funcion get_api_data
    let arrayConDatos = []
    return arrayConDatos = arrayConLosPokemones.map( pok => {
        //retorno un objeto con la info seteada de lo que ami me interesa
        return {
            id: pok.id,
            name: pok.name,
            height: pok.height,
            weight: pok.weight,
            hp: pok.stats[0].base_stat,
            attack: pok.stats[1].base_stat,
            defense: pok.stats[2].base_stat,
            speed: pok.stats[5].base_stat,
            image: pok.sprites.other.dream_world.front_default,
            types: pok.types.map( obj => obj.type.name)
        }
    });
    //console.log(arrayConDatos)
}
////////////////////////////////////////////////////////////////
//es una funcion que trae los pokemones creados en la base de datos nuestra
async function get_db_data(){
    //creo una variable pokemons donde voy a meter lo que me traigo
    let pokemons = await Pokemon.findAll({
        //le digo que me traiga solo esos atributos de la tabla de pokemon y el atributo name de la tabla de tipos que coincida con ese pokemon
        attributes: ['id', 'name', 'height', 'weight', 'hp', 'attack', 'defense', 'speed', 'image', 'create'],
        include: {
            model: Type,
            attributes: ['name'],
            //averiguar esto**
            through: {
                attributes: []
            }
        }
    });

    //name ID tipo
    //verifico si no esta vacio
    if(pokemons.length !== 0){
        //si no esta vacio le piso los valores con un map 
        pokemons = pokemons.map(pok => pok.toJSON());
        //me traigo solo el nombre de el include
        for(let i=0; i<pokemons.length; i++){
            pokemons[i].types = pokemons[i].types.map(type => type.name);
        }
    }
    // y retorno esos nombres
    return pokemons;
}

async function get_all_data(){
    const api_info = await get_api_data();
    const db_info = await get_db_data();
    //CONCATENA AMBAS
    return api_info.concat(db_info);
}

//// SEGURAMENTE LO TRAE DESDE EL FRONT

function get_detail(pok){
    return {
        id: pok.id,
        name: pok.name,
        height: pok.height,
        weight: pok.weight,
        hp: pok.stats[0].base_stat,
        attack: pok.stats[1].base_stat,
        defense: pok.stats[2].base_stat,
        speed: pok.stats[5].base_stat,
        image: pok.sprites.other.dream_world.front_default,
        types: pok.types.map( obj => obj.type.name)
    }
}

function get_types(array){
    let types = array.map( type => type.name);
    return types;
}

module.exports = {
    get_api_data,
    get_db_data,
    get_all_data,
    get_principal,
    get_detail,
    get_types
}