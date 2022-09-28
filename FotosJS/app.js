const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require("http")
const multer = require('multer')
const puerto = 3002


const {hash,login,getPassword, getProducts,Imageupload,ShowImg,CompleteEvent,getMoreInf,getInformacion_inicio,MaxEstatus,MaxXsucursal,Top10Suc,modificarEvento, getInformacion_Etiquetas,SelectidEstatus,Infousuario,CheckEstatus,getAPSW,cerrarEvento,datosfotosAdminRevisar,borrarfotoAdminRevisar,getDatos_sitiosSupervisor,getDatos_sitiosAnalisis,datosfotosAnalisisRevisar,enviarProtocoloAnalisis} = require ('./controllers/database')


const { Console } = require('console')
const { response } = require('express')
const { Resolver } = require('dns')

var jso
var idRed 
var Usuario
var APSW

var events
var log = false
var usuariologin
var empresa
var tipo

let datosSupervisor;
let idSARIestatus_idGlobal;

let datosAnalisis;
let idSARIestatus_idGlobal_Analisis;

const upload = multer({storage:multer.memoryStorage()})
var uploadAP2 = upload.fields([{ name: 'aimagen1', maxCount:2}, { name: 'aimagen2', maxCount:3 },{ name: 'aimagen3', maxCount:2 },{ name: 'aimagen4', maxCount:3 }])
var uploadAP3 = upload.fields([{ name: 'aimagen1', maxCount:2}, { name: 'aimagen2', maxCount:3 }])
var uploadMultiple = upload.fields([{ name: 'imagen1', maxCount:2}, { name: 'imagen2', maxCount:2 },{ name: 'imagen3', maxCount:4 },{ name: 'imagen4', maxCount:2 },{ name: 'imagen5', maxCount:2 },{ name: 'imagen6', maxCount:3 },{ name: 'imagen7', maxCount:3 },{ name: 'imagen8', maxCount:3 }])
var uploadMultipleDurante = upload.fields([{ name: 'imagen1', maxCount:9}, { name: 'imagen2', maxCount:2 },{ name: 'imagen3', maxCount:2 },{ name: 'imagen4', maxCount:4 },{ name: 'imagen5', maxCount:2 },{ name: 'imagen6', maxCount:2 },{ name: 'imagen7', maxCount:1 },{ name: 'imagen8', maxCount:2 },{ name: 'imagen9', maxCount:3 }])
var uploadMultipleDespues = upload.fields([{ name: 'imagen1', maxCount:6}, { name: 'imagen2', maxCount:1 },{ name: 'imagen3', maxCount:5 },{ name: 'imagen4', maxCount:3 },{ name: 'imagen5', maxCount:4 },{ name: 'imagen6', maxCount:5 },{ name: 'imagen7', maxCount:2 },{ name: 'imagen8', maxCount:2 },{ name: 'imagen9', maxCount:1 },,{ name: 'imagen10', maxCount:1 }])
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
        if(log==true){
          res.sendFile(path.resolve(__dirname,'public/inicio.html'));
        }else{
          res.redirect('/')
        }
       
      })
      app.post('/exit',(req,res)=>{
        if(log==true){
        log=false
        Usuario = [{
          'us': 'Saliste correctamente',
          'color':'green'
        }]
        res.redirect('/')
      }else{
        res.redirect('/')
      }
      }) 
      app.get('/fotos', (req, res) => {
        if(log==true){
        res.sendFile(path.resolve(__dirname,'public/fotos.html'));
      }else{
        res.redirect('/')
      }
      })
      app.get('/fotosantes', (req, res) => {
        if(log==true){
        idRed=req.query
       const {idRedJalisco_id} = req.query
        
        getAPSW(idRedJalisco_id).then((numEquipo)=>{
          
          APSW= numEquipo          
       })
        res.sendFile(path.resolve(__dirname,'public/fotosantes.html'))
      }else{
        res.redirect('/')
      }
      })
      app.get('/numEquipos', (req, res) => {
        if(log==true){
        res.json(APSW)
      }else{
        res.redirect('/')
      }
      })

      app.get('/idRed', (req, res) => {
        if(log==true){
        res.json(idRed)
      }else{
        res.redirect('/')
      }
      })
      app.get('/usuario', (req, res) => {
        res.json(Usuario)
        
      })
      app.get('/fotosdurante', (req, res) => {
        if(log==true){
        idRed=req.query
        const {idRedJalisco_id} = req.query
        
        getAPSW(idRedJalisco_id).then((numEquipo)=>{
          
          APSW= numEquipo          
       })
        res.sendFile(path.resolve(__dirname,'public/fotosdurante.html'));
      }else{
        res.redirect('/')
      }
      })
      app.get('/fotosdespues', (req, res) => {
        if(log==true){
        idRed=req.query
        const {idRedJalisco_id} = req.query
        
        getAPSW(idRedJalisco_id).then((numEquipo)=>{
          
          APSW= numEquipo          
       })
        res.sendFile(path.resolve(__dirname,'public/fotosdespues.html'));
      }else{
        res.redirect('/')
      }
      })
      app.get('/fotosaprovada', (req, res) => {
        if(log==true){
        res.sendFile(path.resolve(__dirname,'public/fotosaprovada.html'));
      }else{
        res.redirect('/')
      }
      })
      app.get('/supervisor', (req, res) => {
        if(log==true){
        res.sendFile(path.resolve(__dirname,'public/supervisor.html'));
      }else{
        res.redirect('/')
      }
      });
      app.get('/fotosAdminRevisar', (req, res) => {
        if(log==true){
          res.sendFile(path.resolve(__dirname,'public/fotosAdminRevisar.html'));
        }else{
          res.redirect('/')
        }
      });
      app.get('/analisis', (req, res) => {
        if(log==true){
        res.sendFile(path.resolve(__dirname,'public/analisis.html'));
      }else{
        res.redirect('/')
      }
      });
      app.get('/fotosAnalisisRevisar', (req, res) => {
        if(log==true){
        res.sendFile(path.resolve(__dirname,'public/analisisRevisarFotos.html'));
      }else{
        res.redirect('/')
      }
      });
      app.get('/etiquetas', (req, res) => {
        if(log==true){
        res.sendFile(path.resolve(__dirname,'public/etiquetas.html'));
      }else{
        res.redirect('/')
      }
      })
      app.get('/check', (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/check.html'));
      })
      app.get('/crearusuarios', (req, res) => {
        if(log==true && tipo=='admin'){
        res.sendFile(path.resolve(__dirname,'public/usuarios.html'))
      }else{
        res.redirect('/')
      }
      })
      app.post('/checkEstatus', (req, res) => {
        if(log==true){
        
        const{idRedJalisco} = req.body


        CheckEstatus(idRedJalisco).then((estatus)=>{
          var string = encodeURIComponent(idRedJalisco);
          if(estatus=='Ninguno'){
            res.redirect('/fotosantes?idRedJalisco_id='+string)
          }else if(estatus=='Antes'){
            res.redirect('/fotosdurante?idRedJalisco_id='+string)
          }else if(estatus=='Durante'){
            res.redirect('/fotosdespues?idRedJalisco_id='+string)
          }else if(estatus=='Despues'){
            res.redirect('/fotosaprovada?idRedJalisco_id='+string)
          }else{
            response.redirect('/error')
          }
          
       })

      }else{
        res.redirect('/')
      }
      }) 

      app.post('/register',(req,res) => {
        const {nombre,apellidos,username,password, correo,empresa,tipo} = req.body;
      
       
       
        hash(nombre,apellidos,username,password, correo,empresa,tipo)
        res.redirect('/crearusuarios')
      });

      app.post('/authenticate',(req,response) => {
      
        try{
        const{username,password} = req.body;
        
        
        getPassword(username,password).then((resultado)=>{
          
          if(resultado == true){
            console.log("Usuario correcto") 
           Infousuario(username).then((info)=>{
           //const obj = JSON.stringify(info)
           
           let val = ''
           for( val of info)

           empresa= val.empresa   
           tipo=val.tipo
           usuariologin=username

           if (val.tipo =='admin') {
            response.redirect('/inicio')
           }else if(val.tipo=='supervisor'){
            response.redirect('/supervisor')
           }else if(val.tipo=='normal'){
            response.redirect('/fotos')
           }else if (val.tipo=='analisis'){
            response.redirect('/analisis')  
           }else{
            response.redirect('/error')
           }
            log=true
           })

            
          }else if (resultado == false){
            console.log("Usuario incorrecto")
            Usuario = [{
              'us': "Usuario o contraseña incorrecta",
              'color':'red'
            }]                  
           
              response.redirect('/')
            
                     
          }
        })
      
      }catch(err){
        console.log(err)
      }
      
      });
      
      app.get('/tablaProvedores', (req, res) => {
        try {
          console.log(empresa)
          getInformacion_inicio(empresa)
          .then((tabla)=>{
            res.json(tabla)
          })
        } catch (error) {
          console.log(error)
        }
      })
      app.get('/tablaEtiquetas', (req, res) => {
        try{
          
          getInformacion_Etiquetas()
          .then((tabla)=>{
            res.json(tabla)
          })
        } catch (error) {
          console.log(error)
        }
      })

      

      
      app.post('/datosfotosAdminRevisarVista',(req,res)=>{
        try {
          const{idSARIestatus} = req.body;
          //console.log(`idsariFotos ${idSARIestatus}`)
          idSARIestatus_idGlobal = idSARIestatus
          datosfotosAdminRevisar(idSARIestatus_idGlobal)
          .then((inf)=>{
            datosSupervisor=inf
            res.redirect('/fotosAdminRevisar')
          })
        } catch (error) {
          console.log(error);
        }
      });

      app.post('/enviarProtocoloAnalisis',(req,res)=>{
        try {
          const{idSARIestatus} = req.body;
          enviarProtocoloAnalisis(idSARIestatus)
          .then((inf)=>{
            res.redirect('/supervisor')
          })

        } catch (error) {
          
        }
      })


      app.post('/borrarFotoAdmin',(req,res)=>{
        try {
          const{idImagenEliAdmin} = req.body;

          borrarfotoAdminRevisar(idImagenEliAdmin)
          .then((infEliFoto)=>{
              datosfotosAdminRevisar(idSARIestatus_idGlobal)
              .then((inf)=>{
                datosSupervisor=inf
                res.redirect('/fotosAdminRevisar')
            })
          })

        } catch (error) {
          console.log(error)
        }
      });

      
      app.get('/informacionDatosSitioSupervisor',(req,res)=>{
        res.json(datosSupervisor)
      });

      
      app.get('/getDatos_sitiosSupervisor',(req,res)=>{
        try {
          getDatos_sitiosSupervisor()
          .then((inf)=>{
            res.json(inf)
          })
        } catch (error) {
          console.log(error);
        }
      });

      app.get('/getDatos_sitiosAnalisis',(req,res)=>{
        try {
          getDatos_sitiosAnalisis()
          .then((inf)=>{
            res.json(inf)
          })
        } catch (error) {
          console.log(error);
        }
      });

      
      app.post('/datosfotosAnalisisRevisar',(req,res)=>{
        try {
          const{idSARIestatus} = req.body;
          console.log(`Entro al datosfotosAnalisisRevisar ${idSARIestatus}`)
          idSARIestatus_idGlobal_Analisis = idSARIestatus
          datosfotosAnalisisRevisar(idSARIestatus_idGlobal_Analisis)
          .then((inf)=>{
            datosAnalisis=inf
            res.redirect('/fotosAnalisisRevisar')
          })
        } catch (error) {
          console.log(error);
        }
      });

      
      app.get('/informacionDatosSitioAnalisis',(req,res)=>{
        res.json(datosAnalisis)
      });

      app.post('/photoDB',upload.single('ProductImage'),(req,res)=>{
        image1 = req.file.buffer.toString('base64')      
        cam = '1'  
        IdEvento = '8' 
             
        Imageupload(IdEvento,cam,image1).then(()=>{
          res.redirect('/crearusuarios')
        })
  
      })
      
        app.post('/ApAntes',upload.any(),(req,res,next)=>{
          
          const{AP}=req.body
          console.log(AP)
          
          if(AP == 2){
            console.log(req.files)
            
              if(req.files){
                let imagenes=[]
                let input=[]
                let numEquipo=[]
                const{idsitioAP,estatusAP,ainput1,ainput2}= req.body
                imagenes[0]=req.files[0].buffer.toString('base64')
                imagenes[1]=req.files[1].buffer.toString('base64')
                imagenes[2]=req.files[2].buffer.toString('base64')
                imagenes[3]=req.files[3].buffer.toString('base64')
                imagenes[4]=req.files[4].buffer.toString('base64')
                
                
                
                input[0] = ainput1
                input[1] = ainput1
                input[2] = ainput2
                input[3] = ainput2
                input[4] = ainput2
                numEquipo[0]= 2
                numEquipo[1]= 2
                numEquipo[2]= 2
                numEquipo[3]= 2
                numEquipo[4]= 2
               
                
    
                info ='Borrador'
    
                
                var string = encodeURIComponent(idsitioAP);
                  modificarEvento(idsitioAP,info,estatusAP)
                  .then((inf2)=>{                 
                      //console.log(`info::: ${inf}`)
                      
                        SelectidEstatus(idsitioAP)
                        .then((query)=>{
                          
                          for(i=0;i<=4;i++){
                           
                          console.log(imagenes[i].length ,estatusAP,input[i],query,numEquipo[i])   
                          Imageupload(imagenes[i],estatusAP,input[i],query,numEquipo[i])
                          .then(()=>{
                            
                          })
                        }
                        res.redirect('/fotosdurante?idRedJalisco_id='+string)
                        })
                  })
                   
            }
          }else if(AP == 3){
            
              if(req.files){
                let imagenes=[]
                let input=[]
                let numEquipo=[]
                const{idsitioAP,estatusAP,ainput1,ainput2,ainput3,ainput4}= req.body
                imagenes[0]=req.files[0].buffer.toString('base64')
                imagenes[1]=req.files[1].buffer.toString('base64')
                imagenes[2]=req.files[2].buffer.toString('base64')
                imagenes[3]=req.files[3].buffer.toString('base64')
                imagenes[4]=req.files[4].buffer.toString('base64')
                imagenes[5]=req.files[5].buffer.toString('base64')
                imagenes[6]=req.files[6].buffer.toString('base64')
                imagenes[7]=req.files[7].buffer.toString('base64')
                imagenes[8]=req.files[8].buffer.toString('base64')
                imagenes[9]=req.files[9].buffer.toString('base64')
                
                
                input[0] = ainput1
                input[1] = ainput1
                input[2] = ainput2
                input[3] = ainput2
                input[4] = ainput2
                input[5] = ainput3
                input[6] = ainput3
                input[7] = ainput4
                input[8] = ainput4
                input[9] = ainput4
                
                numEquipo[0]= 2
                numEquipo[1]= 2
                numEquipo[2]= 2
                numEquipo[3]= 2
                numEquipo[4]= 2
                numEquipo[5]= 3
                numEquipo[6]= 3
                numEquipo[7]= 3
                numEquipo[8]= 3
                numEquipo[8]= 3
                numEquipo[9]= 3
                
                info ='Borrador'
    
                
                var string = encodeURIComponent(idsitioAP);
                  modificarEvento(idsitioAP,info,estatusAP)
                  .then((inf2)=>{                 
                      //console.log(`info::: ${inf}`)
                      
                        SelectidEstatus(idsitioAP)
                        .then((query)=>{
                          
                          for(i=0;i<=9;i++){
                           
                          
                          Imageupload(imagenes[i],estatusAP,input[i],query,numEquipo[i])
                          .then(()=>{
                            
                          })
                        }
                        res.redirect('/fotosdurante?idRedJalisco_id='+string)
                        })
                  })
                }   
            
          }else{
            console.log('no entra')
          }
                 
  
         
        })
        app.post('/ApDurante',upload.any(),(req,res,next)=>{
          
          const{AP}=req.body
          console.log(AP)
          
          if(AP == 2){
            console.log(req.files)
            
              if(req.files){
                let imagenes=[]
                let input=[]
                let numEquipo=[]
                const{idsitioAP,estatusAP,ainput1,ainput2}= req.body
                imagenes[0]=req.files[0].buffer.toString('base64')
                imagenes[1]=req.files[1].buffer.toString('base64')
                imagenes[2]=req.files[2].buffer.toString('base64')
                imagenes[3]=req.files[3].buffer.toString('base64')
                
                
                
                
                input[0] = ainput1
                input[1] = ainput1
                input[2] = ainput2
                input[3] = ainput2
                
                numEquipo[0]= 2
                numEquipo[1]= 2
                numEquipo[2]= 2
                numEquipo[3]= 2
                
               
                
    
                info ='Borrador'
    
                
                var string = encodeURIComponent(idsitioAP);
                  modificarEvento(idsitioAP,info,estatusAP)
                  .then((inf2)=>{                 
                      //console.log(`info::: ${inf}`)
                      
                        SelectidEstatus(idsitioAP)
                        .then((query)=>{
                          
                          for(i=0;i<=3;i++){
                           
                          // console.log(imagenes[i].length ,estatusAP,input[i],query,numEquipo[i])   
                          Imageupload(imagenes[i],estatusAP,input[i],query,numEquipo[i])
                          .then(()=>{
                            
                          })
                        }
                        res.redirect('/fotosdurante?idRedJalisco_id='+string)
                        })
                  })
                   
            }
          }else if(AP == 3){
            
              if(req.files){
                let imagenes=[]
                let input=[]
                let numEquipo=[]
                const{idsitioAP,estatusAP,ainput1,ainput2,ainput3,ainput4}= req.body
                imagenes[0]=req.files[0].buffer.toString('base64')
                imagenes[1]=req.files[1].buffer.toString('base64')
                imagenes[2]=req.files[2].buffer.toString('base64')
                imagenes[3]=req.files[3].buffer.toString('base64')
                imagenes[4]=req.files[4].buffer.toString('base64')
                imagenes[5]=req.files[5].buffer.toString('base64')
                imagenes[6]=req.files[6].buffer.toString('base64')
                imagenes[7]=req.files[7].buffer.toString('base64')
               
                
                
                
                input[0] = ainput1
                input[1] = ainput1
                input[2] = ainput2
                input[3] = ainput2
                input[4] = ainput3
                input[5] = ainput3
                input[6] = ainput4
                input[7] = ainput4
               
                numEquipo[0]= 2
                numEquipo[1]= 2
                numEquipo[2]= 2
                numEquipo[3]= 2
                numEquipo[4]= 3
                numEquipo[5]= 3
                numEquipo[6]= 3
                numEquipo[7]= 3
              
                
                info ='Borrador'
    
                
                var string = encodeURIComponent(idsitioAP);
                  modificarEvento(idsitioAP,info,estatusAP)
                  .then((inf2)=>{                 
                      //console.log(`info::: ${inf}`)
                      
                        SelectidEstatus(idsitioAP)
                        .then((query)=>{
                          
                          for(i=0;i<=7;i++){
                           
                          
                          Imageupload(imagenes[i],estatusAP,input[i],query,numEquipo[i])
                          .then(()=>{
                            
                          })
                        }
                        res.redirect('/fotosdurante?idRedJalisco_id='+string)
                        })
                  })
                }   
            
          }else{
            console.log('no entra')
          }
                 
  
         
        })
        app.post('/ApDespues',upload.any(),(req,res,next)=>{
          
          const{AP}=req.body
          console.log(AP)
          
          if(AP == 2){
            console.log(req.files)
            
              if(req.files){
                let imagenes=[]
                let input=[]
                let numEquipo=[]
                const{idsitioAP,estatusAP,ainput1,ainput2}= req.body
                imagenes[0]=req.files[0].buffer.toString('base64')
                imagenes[1]=req.files[1].buffer.toString('base64')
                
                
                
                
                input[0] = ainput1
                input[1] = ainput2
                
                numEquipo[0]= 2
                numEquipo[1]= 2
                
                
    
                info ='Borrador'
    
                
                var string = encodeURIComponent(idsitioAP);
                  modificarEvento(idsitioAP,info,estatusAP)
                  .then((inf2)=>{                 
                      //console.log(`info::: ${inf}`)
                      
                        SelectidEstatus(idsitioAP)
                        .then((query)=>{
                          
                          for(i=0;i<=1;i++){
                           
                          // console.log(imagenes[i].length ,estatusAP,input[i],query,numEquipo[i])   
                          Imageupload(imagenes[i],estatusAP,input[i],query,numEquipo[i])
                          .then(()=>{
                            
                          })
                        }
                        res.redirect('/fotosdespues?idRedJalisco_id='+string)
                        })
                  })
                   
            }
          }else if(AP == 3){
            
              if(req.files){
                let imagenes=[]
                let input=[]
                let numEquipo=[]
                const{idsitioAP,estatusAP,ainput1,ainput2,ainput3,ainput4}= req.body
                imagenes[0]=req.files[0].buffer.toString('base64')
                imagenes[1]=req.files[1].buffer.toString('base64')
                imagenes[2]=req.files[2].buffer.toString('base64')
                imagenes[3]=req.files[3].buffer.toString('base64')
               
                
                
                input[0] = ainput1
                input[1] = ainput2
                input[2] = ainput3
                input[3] = ainput4
                
                
                numEquipo[0]= 2
                numEquipo[1]= 2
                numEquipo[2]= 3
                numEquipo[3]= 3
               
                
                info ='Borrador'
    
                
                var string = encodeURIComponent(idsitioAP);
                  modificarEvento(idsitioAP,info,estatusAP)
                  .then((inf2)=>{                 
                      //console.log(`info::: ${inf}`)
                      
                        SelectidEstatus(idsitioAP)
                        .then((query)=>{
                          
                          for(i=0;i<=3;i++){
                           
                          
                          Imageupload(imagenes[i],estatusAP,input[i],query,numEquipo[i])
                          .then(()=>{
                            
                          })
                        }
                        res.redirect('/fotosaprovada?idRedJalisco_id='+string)
                        })
                  })
                }   
            
          }else{
            console.log('no entra')
          }
                 
  
         
        })
      
      
     
      app.post('/modificarEventoAntes' ,uploadMultiple,(req,res,next)=>{
        console.log('Antes')
        try {
          if(req.files){
            
            let imagenes=[]
            let input=[]
            const{idsitio,estatus,input1,input2,input3,input4,input5,input6,input7,input8}= req.body
            imagenes[0]=req.files['imagen1'][0].buffer.toString('base64')
            imagenes[1]=req.files['imagen1'][1].buffer.toString('base64')
            imagenes[2]=req.files['imagen2'][0].buffer.toString('base64')
            imagenes[3]=req.files['imagen2'][1].buffer.toString('base64')
            imagenes[4]=req.files['imagen3'][0].buffer.toString('base64')
            imagenes[5]=req.files['imagen3'][1].buffer.toString('base64')
            imagenes[6]=req.files['imagen3'][2].buffer.toString('base64')
            imagenes[7]=req.files['imagen3'][3].buffer.toString('base64')
            imagenes[8]=req.files['imagen4'][0].buffer.toString('base64')
            imagenes[9]=req.files['imagen4'][1].buffer.toString('base64')
            imagenes[10]=req.files['imagen5'][0].buffer.toString('base64')
            imagenes[11]=req.files['imagen5'][1].buffer.toString('base64')
            imagenes[12]=req.files['imagen6'][0].buffer.toString('base64')
            imagenes[13]=req.files['imagen6'][1].buffer.toString('base64')
            imagenes[14]=req.files['imagen6'][2].buffer.toString('base64')
            imagenes[15]=req.files['imagen7'][0].buffer.toString('base64')
            imagenes[16]=req.files['imagen7'][1].buffer.toString('base64')
            imagenes[17]=req.files['imagen7'][2].buffer.toString('base64')
            imagenes[18]=req.files['imagen8'][0].buffer.toString('base64')
            imagenes[19]=req.files['imagen8'][1].buffer.toString('base64')
            imagenes[20]=req.files['imagen8'][2].buffer.toString('base64')
            
            input[0] = input1
            input[1] = input1
            input[2] = input2
            input[3] = input2
            input[4] = input3
            input[5] = input3
            input[6] = input3
            input[7] = input3
            input[8] = input4
            input[9] = input4
            input[10] = input5
            input[11] = input5
            input[12] = input6
            input[13] = input6
            input[14] = input6
            input[15] = input7
            input[16] = input7
            input[17] = input7
            input[18] = input8
            input[19] = input8
            input[20] = input8

            info ='Borrador'

            
            var string = encodeURIComponent(idsitio);
              modificarEvento(idsitio,info,estatus)
              .then((inf2)=>{                 
                  //console.log(`info::: ${inf}`)
                  
                    SelectidEstatus(idsitio)
                    .then((query)=>{
                      
                      for(i=0;i<=20;i++){
                       
                     
                      Imageupload(imagenes[i],estatus,input[i],query,1)
                      .then(()=>{
                        
                      })
                    }
                    res.redirect('/fotosdurante?idRedJalisco_id='+string)
                    })
              })
            }        

        } catch (error) {
          console.log(error);
        }
        
      })

      app.post('/modificarEventoDurante',uploadMultipleDurante,(req,res) => {
        try {
          if(req.files){
            
            let imagenes=[]
            let input=[]
            const{idsitio,estatus,input1,input2,input3,input4,input5,input6,input7,input8,input9}= req.body
            imagenes[0]=req.files['imagen1'][0].buffer.toString('base64')
            imagenes[1]=req.files['imagen1'][1].buffer.toString('base64')
            imagenes[2]=req.files['imagen1'][2].buffer.toString('base64')
            imagenes[3]=req.files['imagen1'][3].buffer.toString('base64')
            imagenes[4]=req.files['imagen1'][4].buffer.toString('base64')
            imagenes[5]=req.files['imagen1'][5].buffer.toString('base64')
            imagenes[6]=req.files['imagen1'][6].buffer.toString('base64')
            imagenes[7]=req.files['imagen1'][7].buffer.toString('base64')
            imagenes[8]=req.files['imagen1'][8].buffer.toString('base64')
            imagenes[9]=req.files['imagen2'][0].buffer.toString('base64')
            imagenes[10]=req.files['imagen2'][1].buffer.toString('base64')
            imagenes[11]=req.files['imagen3'][0].buffer.toString('base64')
            imagenes[12]=req.files['imagen3'][1].buffer.toString('base64')
            imagenes[13]=req.files['imagen4'][0].buffer.toString('base64')
            imagenes[14]=req.files['imagen4'][1].buffer.toString('base64')
            imagenes[15]=req.files['imagen4'][2].buffer.toString('base64')
            imagenes[16]=req.files['imagen4'][3].buffer.toString('base64')
            imagenes[17]=req.files['imagen5'][0].buffer.toString('base64')
            imagenes[18]=req.files['imagen5'][1].buffer.toString('base64')
            imagenes[19]=req.files['imagen6'][0].buffer.toString('base64')
            imagenes[20]=req.files['imagen6'][1].buffer.toString('base64')
            imagenes[21]=req.files['imagen7'][0].buffer.toString('base64')
            imagenes[22]=req.files['imagen8'][0].buffer.toString('base64')
            imagenes[23]=req.files['imagen8'][1].buffer.toString('base64')
            imagenes[24]=req.files['imagen9'][0].buffer.toString('base64')
            imagenes[25]=req.files['imagen9'][1].buffer.toString('base64')
            imagenes[26]=req.files['imagen9'][2].buffer.toString('base64')
            

            input[0] = input1
            input[1] = input1
            input[2] = input1
            input[3] = input1
            input[4] = input1
            input[5] = input1
            input[6] = input1
            input[7] = input1
            input[8] = input1
            input[9] = input2
            input[10] = input2
            input[11] = input3
            input[12] = input3
            input[13] = input4
            input[14] = input4
            input[15] = input4
            input[16] = input4
            input[17] = input5
            input[18] = input5
            input[19] = input6
            input[20] = input6
            input[21] = input7
            input[22] = input8
            input[23] = input8
            input[24] = input9
            input[25] = input9
            input[26] = input9

            info ='Borrador'          
            var string = encodeURIComponent(idsitio);

              modificarEvento(idsitio,info,estatus)
              .then((inf2)=>{                 
                  //console.log(`info::: ${inf}`)
                  
                    SelectidEstatus(idsitio)
                    .then((query)=>{
                      console.log(query)
                      for(i=0;i<=26;i++){
                       
                        
                      Imageupload(imagenes[i],estatus,input[i],query,1)
                      .then(()=>{
                        
                      })
                    }
                    res.redirect('/fotosdespues?idRedJalisco_id='+string)
                    })
              })
        }
              
        } catch (error) {
          console.log(error);
        }
        
      })

      app.post('/modificarEventoDespues',uploadMultipleDespues,(req,res) => {
        try {
          if(req.files){
            
            let imagenes=[]
            let input=[]
            const{idsitio,estatus,input1,input2,input3,input4,input5,input6,input7,input8,input9,input10}= req.body
            imagenes[0]=req.files['imagen1'][0].buffer.toString('base64')
            imagenes[1]=req.files['imagen1'][1].buffer.toString('base64')
            imagenes[2]=req.files['imagen1'][2].buffer.toString('base64')
            imagenes[3]=req.files['imagen1'][3].buffer.toString('base64')
            imagenes[4]=req.files['imagen1'][4].buffer.toString('base64')
            imagenes[5]=req.files['imagen1'][5].buffer.toString('base64')
            imagenes[6]=req.files['imagen2'][0].buffer.toString('base64')
            imagenes[7]=req.files['imagen3'][0].buffer.toString('base64')
            imagenes[8]=req.files['imagen3'][1].buffer.toString('base64')
            imagenes[9]=req.files['imagen3'][2].buffer.toString('base64')
            imagenes[10]=req.files['imagen3'][3].buffer.toString('base64')
            imagenes[11]=req.files['imagen3'][4].buffer.toString('base64')
            imagenes[12]=req.files['imagen4'][0].buffer.toString('base64')
            imagenes[13]=req.files['imagen4'][1].buffer.toString('base64')
            imagenes[14]=req.files['imagen4'][2].buffer.toString('base64')
            imagenes[15]=req.files['imagen5'][0].buffer.toString('base64')
            imagenes[16]=req.files['imagen4'][1].buffer.toString('base64')
            imagenes[17]=req.files['imagen5'][2].buffer.toString('base64')
            imagenes[18]=req.files['imagen5'][3].buffer.toString('base64')
            imagenes[19]=req.files['imagen6'][0].buffer.toString('base64')
            imagenes[20]=req.files['imagen6'][1].buffer.toString('base64')
            imagenes[21]=req.files['imagen6'][2].buffer.toString('base64')
            imagenes[22]=req.files['imagen6'][3].buffer.toString('base64')
            imagenes[23]=req.files['imagen6'][4].buffer.toString('base64')
            imagenes[24]=req.files['imagen7'][0].buffer.toString('base64')
            imagenes[25]=req.files['imagen7'][1].buffer.toString('base64')
            imagenes[26]=req.files['imagen8'][0].buffer.toString('base64')
            imagenes[27]=req.files['imagen8'][1].buffer.toString('base64')
            imagenes[28]=req.files['imagen9'][0].buffer.toString('base64')
            imagenes[29]=req.files['imagen10'][0].buffer.toString('base64')
            

            input[0] = input1
            input[1] = input1
            input[2] = input1
            input[3] = input1
            input[4] = input1
            input[5] = input1
            input[6] = input2
            input[7] = input3
            input[8] = input3
            input[9] = input3
            input[10] = input3
            input[11] = input3
            input[12] = input4
            input[13] = input4
            input[14] = input4
            input[15] = input5
            input[16] = input5
            input[17] = input5
            input[18] = input5
            input[19] = input6
            input[20] = input6
            input[21] = input6
            input[22] = input6
            input[23] = input6
            input[24] = input7
            input[25] = input7
            input[26] = input8
            input[27] = input8
            input[28] = input9
            input[29] = input10

            info ='Borrador'          
            var string = encodeURIComponent(idsitio);

              modificarEvento(idsitio,info,estatus)
              .then((inf2)=>{                 
                  //console.log(`info::: ${inf}`)
                  
                    SelectidEstatus(idsitio)
                    .then((query)=>{
                      console.log(query)
                      for(i=0;i<=29;i++){
                       
                        
                      Imageupload(imagenes[i],estatus,input[i],query,1)
                      .then(()=>{
                        
                      })
                    }
                    res.redirect('/fotosaprovada?idRedJalisco_id='+string)
                    })
              })
        }
              
        } catch (error) {
          console.log(error);
        }
        
      })



      app.listen(puerto, () => {
        console.log(`Servidor Web inicializado en ${puerto}`)
        
      })
}
server();