import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import config from './config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import productosApi from './routers/api/productos.js'

import addProductosHandlers from './routers/ws/productos.js'
import addMensajesHandlers from './routers/ws/mensajes.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true};
//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    console.log('conectado')
    socket.emit('productos', await productosApi.listarAll())

    socket.on('update', async (producto) => { 
        productosApi.guardar(producto);
        const productos =  await productosApi.listarAll()
        io.sockets.emit('productos', productos );
    });
    const msj = await listarMensajesNormalizados(await mensajesApi.listarAll());
    console.log(msj);
    socket.emit('mensajes',  msj);

    socket.on('nuevoMensaje', async (data) => {
        
        mensajesApi.guardar(data)
        const mensajesN = await listarMensajesNormalizados(await mensajesApi.listarAll()) 
        
        io.sockets.emit('mensajes', mensajesN);
    });
});

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://moleroclara:N91CZqlbfakOHKH6@cluster0.e2pbfnu.mongodb.net/sesiones?retryWrites=true&w=majority' ,
        mongoOptions: advancedOptions
     }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: true
}))

//--------------------------------------------
// rutas del servidor API REST

app.use('/productos', productosApi )


//--------------------------------------------
// rutas del servidor web
app.get('/', (req,res)=>{
    res.render('pages/home', )
})

//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
