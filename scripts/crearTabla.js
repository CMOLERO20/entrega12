import knex from 'knex'
import config from '../src/config.js'

//------------------------------------------
// productos en MariaDb

const mariaDbClient = knex(config.mariaDb)
// productos en MariaDb

try {
   
    
   await mariaDbClient.schema.dropTableIfExists('productos')
   await  mariaDbClient.schema.createTable('productos', table => {
        table.increments('id').primary();
        table.string('title', 15).notNullable;
        table.string('price', 15).notNullable;
        table.string('thumbnail', 150);
    })
    //Implementar creación de tabla

    console.log('tabla productos en mariaDb creada con éxito')


} catch (error) {
    console.log('error al crear tabla productos en mariaDb')
    console.log(error)
}