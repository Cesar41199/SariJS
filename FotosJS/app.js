const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require("http")
const multer = require('multer')
const puerto = 3002
const host = '10.250.1.19'
const {hash,login,getPassword, getProducts,Imageupload,ShowImg,CompleteEvent,getMoreInf,getInformacion_inicio,
  MaxEstatus,MaxXsucursal,Top10Suc,modificarEvento, cerrarEvento,getInformacion_Etiquetas,SelectidEstatus,
  Infousuario,CheckEstatus,getAPSW,getInformacion_protocolos,Infoid,getInformacion_series,Series1,Series2,ver,
  datosfotosAdminRevisar,borrarfotoAdminRevisar,getDatos_sitiosSupervisor,getDatos_sitiosAnalisis,
  datosfotosAnalisisRevisar,enviarProtocoloAnalisis,analisis_MandarObservaciones,protocoloValidadoAnalisis
} = require ('./controllers/database')


const { Console } = require('console')
const { response } = require('express')
const { Resolver } = require('dns')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const PassportLocal = require('passport-local').Strategy
const { red } = require('color-name')
///////////////////////////
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
////////////////

const upload = multer({storage:multer.memoryStorage()})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs')
function server(){
    var publicPath = path.resolve(__dirname, 'public');
    app.use(express.static(publicPath));

      app.use(cookieParser('mi secreto'))

      app.use(session({
        secret:'mi secreto',
        resave:true,
        saveUninitialized: true
      }))

      app.use(passport.initialize())
      app.use(passport.session())

     
      passport.use(new PassportLocal(function(username,password,done){
        getPassword(username,password).then((resultado)=>{
          
          if(resultado == true){
            
          //  Infousuario(username).then((info)=>{
                  
          //  })
          done(null,username)
            
          }else if (resultado == false){
            
            done(null,false)                                   
          }
        })
      }))
      
      

      passport.serializeUser(function(user,done){
        Infoid(user).then((id)=>{
          id.find(object =>{
            done(null,object.idSARIusuarios)
          })
          
        })
        
      })

      passport.deserializeUser(function(id,done){
        
        Infousuario(id).then((user)=>{
          done(null,user)
        })
        
      })

      

      app.get('/',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
        //SI ya se inicio
        req.user.find(usuario=>{
          console.log(usuario.tipo)
          req.session.empresa = usuario.empresa
          
          if (usuario.tipo =='admin') {
            res.redirect('/inicio')            
           }else if(usuario.tipo=='supervisor'){
            res.redirect('/supervisor')
           }else if(usuario.tipo=='normal'){
            res.redirect('/fotos')
           }else if (usuario.tipo=='analisis'){
            res.redirect('/etiquetas')  
           }else{
           console.log('error')
           }
           })
       }) 
       
      app.get("/log",(req,res)=>{
       res.render("login")
      })
      app.post("/loge",passport.authenticate('local',{
        failureRedirect: '/log',
      }),function(req,res){
        res.redirect('/')
      })

      app.get('/usuario', (req, res) => {
        if (req.session.us){
          
          res.json(req.session.us)
        }else{
          res.json([{}])
        }
      })


      
      

      app.get('/inicio',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
       
          res.sendFile(path.resolve(__dirname,'public/inicio.html'));
       
       
      })
      app.post('/exit',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      },(req,res)=>{
       
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      
      }) 


////////////////INICIO DE SESION///////////////////////////////////////////////////////
app.get('/fotosaprovada',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
        
        res.sendFile(path.resolve(__dirname,'public/fotosaprovada.html'));
    
      })
      app.get('/supervisor',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
      
        res.sendFile(path.resolve(__dirname,'public/supervisor.html'));
     
      })
      app.get('/analisis',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
      
        res.sendFile(path.resolve(__dirname,'public/analisis.html'));
     
      })
      app.get('/protocolos',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
       res.sendFile(path.resolve(__dirname,'public/protocolos.html'))
      })
      
      app.get('/etiquetas',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
       
        res.sendFile(path.resolve(__dirname,'public/etiquetas.html'));
      
      
      })
      app.get('/check', (req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      },(req, res) => {
        res.sendFile(path.resolve(__dirname,'public/check.html'));
      })
      app.get('/imagen',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
        res.sendFile(path.resolve(__dirname,'public/imagen.html'))
       })
      //  app.get('/ver',(req,res,next)=>{
      //   if(req.isAuthenticated())return next();
      //  ver().then((info)=>{
      //   res.json(info)

      //  })
      // }, (req, res) => {
      //   res.sendFile(path.resolve(__dirname,'public/imagen.html'))
      //  })

////////////////VISTAS REQ/////////////////////////////////////////////////////////////      
      app.get('/fotos',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
        
        res.sendFile(path.resolve(__dirname,'public/fotos.html'));
     
      })
      app.get('/fotosantes',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
       
        req.session.idRed= req.query
        
       const {idRedJalisco_id} = req.query
       
        
        getAPSW(idRedJalisco_id).then((numEquipo)=>{
          
          req.session.APSW= numEquipo  
          
          res.sendFile(path.resolve(__dirname,'public/fotosantes.html'))
       })
        
      
      })
    
      app.get('/numEquipos', (req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      },(req, res) => {
       
        if(req.session.APSW){
          
          res.json(req.session.APSW)

        }else{
          
          res.json([{}])
        }

     
      })

      app.get('/idRed',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
      
       if (req.session.idRed){
        res.json(req.session.idRed)
       }
      
      })
      
      app.get('/fotosdurante',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
       
        req.session.idRed= req.query
        const {idRedJalisco_id} = req.query
        
        getAPSW(idRedJalisco_id).then((numEquipo)=>{
          
          req.session.APSW= numEquipo 
          res.sendFile(path.resolve(__dirname,'public/fotosdurante.html'));         
       })
        
     
      })
      
      app.get('/fotosdespues',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
       
        req.session.idRed= req.query
        const {idRedJalisco_id} = req.query
        
        getAPSW(idRedJalisco_id).then((numEquipo)=>{
          
          req.session.APSW= numEquipo 
          res.sendFile(path.resolve(__dirname,'public/fotosdespues.html'));         
       })
       
     
      })
      
      app.get('/crearusuarios', (req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      },(req, res) => {
       
        res.sendFile(path.resolve(__dirname,'public/usuarios.html'))
      
      })
      app.post('/checkEstatus',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
        
        
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

     
      }) 

      app.post('/register',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      },(req,res) => {
        const {nombre,apellidos,username,password, correo,empresa,tipo} = req.body;
      
       
       
        hash(nombre,apellidos,username,password, correo,empresa,tipo)
        res.redirect('/crearusuarios')
      });

      // app.post('/authenticate',(req,response) => {
      
      //   try{
      //   const{username,password} = req.body;
        
        
      //   getPassword(username,password).then((resultado)=>{
          
      //     if(resultado == true){
      //       console.log("Usuario correcto") 
      //      Infousuario(username).then((info)=>{
      //      //const obj = JSON.stringify(info)
           
      //      let val = ''
      //      for( val of info)

      //      empresa= val.empresa   
      //      tipo=val.tipo
      //      usuariologin=username

      //      if (val.tipo =='admin') {
      //       response.redirect('/inicio')
      //      }else if(val.tipo=='supervisor'){
      //       response.redirect('/supervisor')
      //      }else if(val.tipo=='normal'){
      //       response.redirect('/fotos')
      //      }else if (val.tipo=='analisis'){
      //       response.redirect('/etiquetas')  
      //      }else{
      //       response.redirect('/error')
      //      }
      //       log=true
      //      })

            
      //     }else if (resultado == false){
      //       console.log("Usuario incorrecto")
      //       Usuario = [{
      //         'us': "Usuario o contraseña incorrecta",
      //         'color':'red'
      //       }]                  
           
      //         response.redirect('/')
            
                     
      //     }
      //   })
      
      // }catch(err){
      //   console.log(err)
      // }
      
      // });
      app.get('/tablaProtocolos',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
        try {
         
          getInformacion_protocolos()
          .then((tabla)=>{
            res.json(tabla)
          })
        } catch (error) {
          console.log(error)
        }
      })
      app.get('/SeriesEquipos', (req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      },(req, res) => {
        try {
         
          getInformacion_series()
          .then((tabla)=>{
            res.json(tabla)
          })
        } catch (error) {
          console.log(error)
        }
      })
      app.get('/tablaProtocolosreq',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
     
      })
      app.get('/tablaProvedores',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res) => {
        try {

          empresa = req.session.empresa
          getInformacion_inicio(empresa)
          .then((tabla)=>{
            res.json(tabla)
          })
        } catch (error) {
          console.log(error)
        }
      })
      app.get('/tablaEtiquetas',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      }, (req, res,next) => {
        try{
                  
         
          getInformacion_Etiquetas()
          .then((tabla)=>{
            
            res.json(tabla)
          })
        } catch (error) {
          console.log(error)
        }
      })


        app.post('/modificarEventoAntes' ,(req,res,next)=>{
          if(req.isAuthenticated())return next();
          res.redirect('/log')
        },upload.any(),(req,res,next)=>{
          try {
            if(req.files){
              
              let imagenes=[]
              let input=[]
              const{idsitio,estatus,input1,input2,input3,input4,input5,input6,input7,input8,AP}= req.body
              let string = encodeURIComponent(idsitio);
              for(i=0;i<21;i++){
                imagenes[i]=req.files[i].buffer.toString('base64')
                
              }              
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
       
                modificarEvento(idsitio,info,estatus)
                .then(()=>{                 
                    //console.log(`info::: ${inf}`)
                    
                      SelectidEstatus(idsitio)
                      .then((query)=>{
                        
                        for(i=0;i<21;i++){                        
                       
                        Imageupload(imagenes[i],estatus,input[i],query,1)
                        .then(()=>{  
                                               
                          })
                        }
                      
                      })
                })
                if(AP != 1){   
                  
                  let imagenesAp = 20 
                  let imanesstart = 21 
                  let numEquipo=[]
                 for(o=2;o<=AP;o++){
                  imagenesAp= imagenesAp+5
                 }
                 

                  const{ainput1,ainput2}= req.body
                  for(i=21;i<=imagenesAp;i++){
                    imagenes[i]=req.files[i].buffer.toString('base64')
                    
                                      
                  }
                 for(o=1,k=2;o<=AP;o++,k++){
                  numEquipo[imanesstart] = k
                  input[imanesstart] = ainput1
                  imanesstart ++
                  numEquipo[imanesstart] = k
                  input[imanesstart] = ainput1
                  imanesstart ++
                  numEquipo[imanesstart] = k
                  input[imanesstart] = ainput2
                  imanesstart ++
                  numEquipo[imanesstart] = k
                  input[imanesstart] = ainput2
                  imanesstart ++
                  numEquipo[imanesstart] = k
                  input[imanesstart] = ainput2
                  imanesstart ++
                 }
     
                  info ='Borrador'          
                      
                     
                        modificarEvento(idsitio,info,estatus)
                        .then(()=>{                 
                            //console.log(`info::: ${inf}`)
                            
                              SelectidEstatus(idsitio)
                              .then((query)=>{
                                
                                for(i=21;i<=imagenesAp;i++){  
                                Imageupload(imagenes[i],estatus,input[i],query,numEquipo[i])
                                .then(()=>{
                                 
                                })
                              }
                              res.redirect('/fotosdurante?idRedJalisco_id='+string)
                              })
                        })                        
                
                }else{
                  
                  res.redirect('/fotosdurante?idRedJalisco_id='+string)
                }   
          }        
  
        } catch (error) {
          console.log(error);
        }
      })

      app.post('/modificarEventoDurante',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      },upload.any(),(req,res) => {
        try {
          if(req.files){
            
            let imagenes=[]
            let input=[]
            const{idsitio,estatus,input1,input2,input3,input4,input5,input6,input7,input8,input9,AP}= req.body
              let string = encodeURIComponent(idsitio);
              for(i=0;i<27;i++){
                imagenes[i]=req.files[i].buffer.toString('base64')
                
              }
            

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
            

            modificarEvento(idsitio,info,estatus)
            .then(()=>{                 
                //console.log(`info::: ${inf}`)
                
                  SelectidEstatus(idsitio)
                  .then((query)=>{
                    
                    for(i=0;i<27;i++){                        
                   
                    Imageupload(imagenes[i],estatus,input[i],query,1)
                    .then(()=>{  
                                           
                      })
                    }
                  
                  })
            })
            if(AP != 1){   
                  
              let imagenesAp = 26 
              let imanesstart = 27 
              let numEquipo=[]
             for(o=2;o<=AP;o++){
              imagenesAp= imagenesAp+4
             }
             

              const{ainput1,ainput2}= req.body
              for(i=27;i<=imagenesAp;i++){
                imagenes[i]=req.files[i].buffer.toString('base64')
                
                                  
              }
             for(o=1,k=2;o<=AP;o++,k++){
              numEquipo[imanesstart] = k
              input[imanesstart] = ainput1
              imanesstart ++
              numEquipo[imanesstart] = k
              input[imanesstart] = ainput1
              imanesstart ++
              numEquipo[imanesstart] = k
              input[imanesstart] = ainput2
              imanesstart ++
              numEquipo[imanesstart] = k
              input[imanesstart] = ainput2
              imanesstart ++
             
             }
 
              info ='Borrador'          
                  
                 
                    modificarEvento(idsitio,info,estatus)
                    .then(()=>{                 
                        //console.log(`info::: ${inf}`)
                        
                          SelectidEstatus(idsitio)
                          .then((query)=>{
                            
                            for(i=27;i<=imagenesAp;i++){  
                            Imageupload(imagenes[i],estatus,input[i],query,numEquipo[i])
                            .then(()=>{
                             
                            })
                          }
                          res.redirect('/fotosdespues?idRedJalisco_id='+string)
                          })
                    })                        
            
            }else{
              
              res.redirect('/fotosdespues?idRedJalisco_id='+string)
            } 
        }
              
        } catch (error) {
          console.log(error);
        }
        
      })

      app.post('/modificarEventoDespues',(req,res,next)=>{
        if(req.isAuthenticated())return next();
        res.redirect('/log')
      },upload.any(),(req,res) => {
        try {
          if(req.files){
            
            let imagenes=[]
            let input=[]
            const{idsitio,estatus,input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,AP}= req.body
            let string = encodeURIComponent(idsitio);
              for(i=0;i<30;i++){
                imagenes[i]=req.files[i].buffer.toString('base64')
                
              }
            

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
            modificarEvento(idsitio,info,estatus)
            .then(()=>{                 
                //console.log(`info::: ${inf}`)
                
                  SelectidEstatus(idsitio)
                  .then((query)=>{
                    
                    for(i=0;i<30;i++){                        
                   
                    Imageupload(imagenes[i],estatus,input[i],query,1)
                    .then(()=>{  
                                           
                      })
                    }
                  
                  })
            })
            if(AP != 1){   
                  
              let imagenesAp = 29 
              let imanesstart = 30 
              let numEquipo=[]
             for(o=2;o<=AP;o++){
              imagenesAp= imagenesAp+2
             }
             

              const{ainput1,ainput2}= req.body
              for(i=30;i<=imagenesAp;i++){
                imagenes[i]=req.files[i].buffer.toString('base64')
                
                                  
              }
             for(o=1,k=2;o<=AP;o++,k++){
              numEquipo[imanesstart] = k
              input[imanesstart] = ainput1
              imanesstart ++
              numEquipo[imanesstart] = k
              input[imanesstart] = ainput1
              imanesstart ++
              
             
             }
 
              info ='Borrador'          
                  
                 
                    modificarEvento(idsitio,info,estatus)
                    .then(()=>{                 
                        //console.log(`info::: ${inf}`)
                        
                          SelectidEstatus(idsitio)
                          .then((query)=>{
                            
                            for(i=30;i<=imagenesAp;i++){  
                            Imageupload(imagenes[i],estatus,input[i],query,numEquipo[i])
                            .then(()=>{
                             
                            })
                          }
                          res.redirect('/fotosaprovada?idRedJalisco_id='+string)
                          })
                    })                        
            
            }else{
              
              res.redirect('/fotosaprovada?idRedJalisco_id='+string)
            }
        }
              
        } catch (error) {
          console.log(error);
        }
        
      })


       /////////////////////////////////////     

      
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
          console.log(`Error app en borrarFotoAdmin :: ${error}`)
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
          console.log(`Error app en informacionDatosSitioSupervisor :: ${error}`);
        }
      });

      app.get('/getDatos_sitiosAnalisis',(req,res)=>{
        try {
          getDatos_sitiosAnalisis()
          .then((inf)=>{
            res.json(inf)
          })
        } catch (error) {
          console.log(`Error app en getDatos_sitiosAnalisis :: ${error}`);
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
          console.log(`Error app en datosfotosAnalisisRevisar :: ${error}`);
        }
      });

      
      app.get('/informacionDatosSitioAnalisis',(req,res)=>{
        res.json(datosAnalisis)
      });


      app.post('/regresarProtocolo_Analisis',(req,res)=>{
        try {
          const{txtObservacionesAnalisis,idSARIestatusObservaciones} = req.body;
          analisis_MandarObservaciones(txtObservacionesAnalisis,idSARIestatusObservaciones)
          .then((infObs)=>{
            res.redirect('/analisis')
          })

        } catch (error) {
          
        }
      });

      app.post('/validaProtocolo_Analisis',(req,res)=>{
        try {
          const{idSARIestatusValida} = req.body;
          protocoloValidadoAnalisis(idSARIestatusValida)
          .then((infValida)=>{
            res.redirect('/analisis')
          })
        } catch (error) {
          console.log(`Error app en validaProtocolo_Analisis :: ${error}`);
        }
      });

    


      app.listen(puerto,host, () => {
        console.log(`Servidor Web inicializado en${host}: ${puerto}`)
        
      })
}
server();