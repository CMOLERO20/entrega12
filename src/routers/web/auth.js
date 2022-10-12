import { Router } from 'express'

import path from 'path'

const authWebRouter = new Router()

const getNombreSession = req => req.session.nombre ? req.session.nombre : '';

authWebRouter.get('/', (req, res) => {
  
})

authWebRouter.get('/login', (req, res) => {
    if(req.session.contador){
        req.session.contador++;
        res.send(`Bienvenido ${getNombreSession(req)} `)
    } else {
        let {nombre} = req.query;
        req.session.nombre = nombre;
        req.session.contador = 1;
        res.send(` Bienvenida ${ getNombreSession (req)}`);
    }
})

authWebRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout Error', body:err})
        }
        res.send('Logout ok!')
    })
})


authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre;
    res.redirect('/home');
})



export default authWebRouter