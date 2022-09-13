const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require("http")
const multer = require('multer')
const puerto = 3002
const {hash,login,getPassword, getProducts,Imageupload,ShowImg,CompleteEvent,getMoreInf,getInformacion_inicio,MaxEstatus,MaxXsucursal,Top10Suc,modificarEvento, cerrarEvento} = require ('./controllers/database')

const { Console } = require('console')
const { response } = require('express')
const { Resolver } = require('dns')
var jso
var idRedJalisco 
var usuariologin
var events
const upload = multer({storage:multer.memoryStorage()})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function server(){
    var publicPath = path.resolve(__dirname, 'public');
    app.use(express.static(publicPath));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/login.html'));
      }) 
      app.post('/login', (req, res) => {
        res.redirect('/fotos')
      }) 
      app.get('/inicio', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/inicio.html'));
      }) 
      app.get('/fotos', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/fotos.html'));
      })
      app.get('/fotosantes', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/fotosantes.html'))
      })
      app.get('/fotosdurante', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/fotosdurante.html'));
      })
      app.get('/fotosdespues', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/fotosdespues.html'));
      })
      app.get('/fotosaprovada', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/fotosaprovada.html'));
      })
      app.get('/analisis', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/analisis.html'));
      })
      app.get('/etiquetas', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/etiquetas.html'));
      })
      app.get('/check', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/check.html'));
      })
      app.get('/tablaProvedores', (req, res) => {
        try {
          proveedor = 'Tovar-05 Luis Carrillo'
          getInformacion_inicio(proveedor)
          .then((tabla)=>{
            res.json(tabla)
          })
        } catch (error) {
          console.log(error)
        }
      })



      app.post('/modificarEventoAntes',(req,res) => {
        try {
          console.log(req.body)
          const {idsitio,estatus} = req.body;
          
          console.log('estatus',estatus)
        
          modificarEvento(idsitio,estatus)
              .then((inf2)=>{
                  
                  //console.log(`info::: ${inf}`)
                  
                  console.log(inf2)
                  res.redirect('/fotosdurante')
                
              })
              
        } catch (error) {
          console.log(error);
        }
        
      })

      app.post('/modificarEventoDurante',(req,res) => {
        try {
          console.log(req.body)
          const {idsitio,estatus} = req.body;
          
          console.log('estatus',estatus)
        
          modificarEvento(idsitio,estatus)
              .then((inf2)=>{
                  
                  //console.log(`info::: ${inf}`)
                  
                  console.log(inf2)
                  res.redirect('/fotosdespues')
                
              })
              
        } catch (error) {
          console.log(error);
        }
        
      })

      app.post('/modificarEventoDespues',(req,res) => {
        try {
          console.log(req.body)
          const {idsitio,estatus} = req.body;
          
          console.log('estatus',estatus)
        
          modificarEvento(idsitio,estatus)
              .then((inf2)=>{
                  
                  //console.log(`info::: ${inf}`)
                  
                  console.log(inf2)
                  res.redirect('/fotosaprovada')
                
              })
              
        } catch (error) {
          console.log(error);
        }
        
      })


      app.listen(puerto, () => {
        console.log(`Servidor Web inicializado en ${puerto}`)
        
      })
}
server();