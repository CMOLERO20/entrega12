import { normalize, schema} from 'normalizr'

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' })

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

async function normalizarMensajes(mensajes) {
    return normalizr.normalize(mensajes,schemaMensajes);
}

export { normalizarMensajes }