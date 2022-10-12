const {getConnection,sql} = require ('./database/conect')
const {queries} = require ('./database/query')

const bcrypct = require("bcryptjs");
const { json } = require('body-parser');
const { async } = require('regenerator-runtime');
const rondas = 3;
const document = this;


    function hash(nombre,apellidos,username,password,correo,empresa,tipo){
        
        bcrypct.hash(password, rondas, (err, pass) =>{
            if(err){
               console.log(err)
            }else{
              console.log('hasheado') 
            }
            
            createUser(nombre,apellidos,username,pass,correo,empresa,tipo)
        })
        
    }
   const login = (password,palabrahash) => {
    return new Promise((resolve,reject) => {
        
        
        bcrypct.compare(password,palabrahash , (err, coinciden) => {
            if (err) {
                console.log("Error comprobando:", err);
                
            }else{
               
                resolve(coinciden)
                   
               
            } 
       
    });      
       
    })
        
    }

    const modificarEvento = async (id,info,estatus,req,res)=>{
       
        //console.log(`Id desde el connect ${id}`);
        try {
            const pool = await getConnection();
            console.log(id,estatus)
            
            const result = await pool.request()
                .input("id",sql.VarChar,id)
                .input("info",sql.VarChar,info)
                .input("estatus",sql.VarChar,estatus)
               // .query(queries.verEvento)
                .query(queries.query_modificarEvento)
                //console.log(result);
            return new Promise((resolver,reject)=>{
                resolver(result['recordset'])
            })
    
        } catch (error) {
            console.log(`Error en la extraccion de Modificar Evento: ${error}`)
        }
    
    }
    const SelectidEstatus = async (idRedJalisco,req,res)=>{
       
        //console.log(`Id desde el connect ${id}`);
        try {
            const pool = await getConnection();
            console.log("1"+idRedJalisco+"1")
            
            const result = await pool.request()
                .input("idRedJalisco",sql.VarChar,idRedJalisco)
               
               // .query(queries.verEvento)
                .query(queries.select_idEstatus)
                //console.log(result);
            return new Promise((resolver,reject)=>{ 
                console.log(result)
                resolver(result['recordset'][0]['idSARIestatus'])
            })
    
        } catch (error) {
            console.log(`Error en la extraccion de mas informacion: ${error}`)
        }
    
    }
    
    const cerrarEvento = async (id,req,res)=>{
        if(id==null) id=0;
        //console.log(`Id desde el connect ${id}`);
        try {
            const pool = await getConnection();
    
            const result = await pool.request()
                .input("id",sql.Int,id)
                .query(queries.query_cerrarEvento)
                //console.log(result);
            return new Promise((resolver,reject)=>{
                resolver(result['recordset'])
            })
    
        } catch (error) {
            console.log(`Error en la extraccion de mas informacion: ${error}`)
        }
    
    }


    const getProducts = async  (req, res) => {
    try {
        
        const pool = await getConnection();
    
        const result = await pool.request().query(queries.getAllProduct)
       // (result['recordset'][0]['Password'])
       
       return new Promise ((resolve,reject)=>{
    
         resolve(result['recordset'])
       })
    
    } catch (error) {
        
        console.log(error);
    }

    };
    const CheckEstatus = async  (id,req, res) => {
        try {
            
            const pool = await getConnection();
        
            const result = await pool.request()
            .input("id",sql.VarChar,id)
            .query(queries.getEstatusFotos)
           // (result['recordset'][0]['Password'])
           
           return new Promise ((resolve,reject)=>{
        
             resolve(result['recordset'][0]['estatusSave'])
           })
        
        } catch (error) {
            
            console.log(error);
        }
    
        };

    
    const getPassword = async (username,password,res,req) => {  
       
        try{
        const pool = await getConnection()
        const result = await pool.request().input("username", username).query(queries.getPassword)
        
       
        return new Promise((resolve, reject) =>{
          
            try{
            login(password,result['recordset'][0]['contraseña']).then((resultado)=>{
            setTimeout(()=>{
                resolve(resultado)
             
            },500)
            })
        }catch(error){
            resultado = false
            resolve(resultado)
        }
            
        })     
        
        }catch(error){
                console.log(error)
        }
      
     
    }
    const   Infousuario = async (username,res,req) => {  
       
        try{
        const pool = await getConnection()
        const result = await pool.request().input("username", username).query(queries.infoUser)
        
       
        return new Promise((resolve, reject) =>{    
                resolve(result['recordset']) 
        })     
        
        }catch(error){
                console.log(error)
        }
      
     
    }




    const createUser = async (nombre,apellidos,username,password,correo,empresa,tipo,req, res) => {
    
    
    
    try{
        const pool = await getConnection();
        console.log(nombre,apellidos,username,password,correo,empresa,tipo)
        await pool.request()
        .input("nombre", sql.Text,nombre)
        .input("apellidos", sql.Text,apellidos)
        .input("username", sql.Text,username)
        .input("password", sql.Text,password)
        .input("correo", sql.Text,correo)
        .input("empresa", sql.Text,empresa)
        .input("tipo", sql.Text,tipo)
        .query(
            queries.createUser
            )
        
        
    } catch(error) {
       
        console.log(error)
    }
    }

    const Imageupload = async (imagen,estatus,nombre,idSitio,numEquipo,req, res) => {       
        
        try{
            const pool = await getConnection();
            
            await pool.request()
            .input("imagen", sql.VarChar,imagen)
            .input("estatus", sql.VarChar,estatus)
            .input("nombre", sql.VarChar,nombre)
            .input("idSitio", sql.Int,idSitio)
            .input("numEquipo", sql.Int,numEquipo)
            .query(queries.UploadImage)
            console.log('Imageupload')
            
            
        } catch(error) {
           
            console.log(error)
        }
        }
    const ShowImg = async (IdEvento,res,req) => {  
       
            try{
            const pool = await getConnection()
            const result = await pool.request().input("IdEvento", IdEvento).query(queries.ShowImage)
            
            return new Promise((resolve, reject) =>{
                
                    
                
                    resolve(result['recordset'])
                 
                
                
                
            })     
            
            }catch(error){
                    console.log(error)
            }
          
         
        }

        const ShowImg2 = async (IdEvento,res,req) => {  
       
            try{
            const pool = await getConnection()
            const result = await pool.request().input("IdEvento", IdEvento).query(queries.ShowImage)
            
            return new Promise((resolve, reject) =>{
                
                    
                
                    resolve(result['recordset'])
                 
                
                
                
            })     
            
            }catch(error){
                    console.log(error)
            }
          
         
        }

        const CompleteEvent = async (IdEvento,res,req) => {  
       
            try{
                console.log(IdEvento)
            const pool = await getConnection()
            const result = await pool.request().input("id", IdEvento).query(queries.MaxEvents)
            
            return new Promise((resolve, reject) =>{
                
                    
                
                    resolve(result['recordset'])
                 
                
                
                
            })     
            
            }catch(error){
                    console.log(error)
            }
          
         
        }

        const MaxXstatus = async (IdEvento,res,req) => {  
       
            try{
            const pool = await getConnection()
            const result = await pool.request().input("estatus", IdEvento).query(queries.MaxEstatus)
            
            return new Promise((resolve, reject) =>{
                
                    
                
                    resolve(result['recordset'])
                 
                
                
                
            })     
            
            }catch(error){
                    console.log(error)
            }
          
         
        }
        const MaxXsucursal = async (IdEvento,res,req) => {  
       
            try{
            const pool = await getConnection()
            const result = await pool.request().input("sucursal", IdEvento).query(queries.MaxSucursal)
            
            return new Promise((resolve, reject) =>{
                
                    
                
                    resolve(result['recordset'])
                 
                
                
                
            })     
            
            }catch(error){
                    console.log(error)
            }
          
         
        }
        const Top10Suc = async (res,req) => {  

            try{
            const pool = await getConnection()
            const result = await pool.request().query(queries.T10Sucursales)
            
            return new Promise((resolve, reject) =>{
                
                    
                
                    resolve(result['recordset'])
                 
                
                
                
            })     
            
            }catch(error){
                    console.log(error)
            }
          
         
        }

        const getMoreInf = async (id,req,res)=>{
            if(id==null) id=0;
            console.log(`Id desde el connect ${id}`);
            try {
                const pool = await getConnection();
        
                const result = await pool.request()
                    .input("id",sql.Int,id)
                    .query(queries.query_getMoreInf)
                    //console.log(result);
                return new Promise((resolver,reject)=>{
                    resolver(result['recordset'])
                })
        
            } catch (error) {
                console.log(`Error en la extraccion de mas informacion: ${error}`)
            }
        
        }
        const getInformacion_inicio = async (proveedor,req,res)=>{
            
            try {
                
                const pool = await getConnection()
                const result = await pool.request()
                .input("proveedor",sql.VarChar,proveedor)
                .query(queries.getTableproveedores)
                //console.log(result)
                //res.json(result.recordset)
        
                return new Promise((resolve,reject)=>{
                    resolve(result['recordset']);
                })
        
                //return res.request(result);
        
                //return res.send(result.recordset);
        
        
                //res.send('index',{result});
                //res.json(result.recordset)
            } catch (error) {
                console.log(`Error en la extraccion de informacion de INICIO: ${error}`)
            }
        
        };

        const getInformacion_Etiquetas = async (req,res)=>{
            
            try {
                
                const pool = await getConnection()
                const result = await pool.request()
                
                .query(queries.getTableEtiquetas)
                //console.log(result)
                //res.json(result.recordset)
        
                return new Promise((resolve,reject)=>{
                    resolve(result['recordset']);
                })
        
                //return res.request(result);
        
                //return res.send(result.recordset);
        
        
                //res.send('index',{result});
                //res.json(result.recordset)
            } catch (error) {
                console.log(`Error en la extraccion de informacion de INICIO: ${error}`)
            }
        }
       
        const datosfotosAdminRevisar = async(idSARIestatus,req,res)=>{
            try {
                const pool = await getConnection()
                const result = await pool.request()
                .input("idSARIestatus",sql.Int,idSARIestatus)
                .query(queries.datosfotosAdminRevisar)

                return new Promise((resolver,reject)=>{
                    resolver(result['recordset'])
                })

            } catch (error) {
                console.log(`Error en la extraccion de mas datosfotosAdminRevisar: ${error}`)
            }
        };

        const enviarProtocoloAnalisis = async(idSARIestatus,req,res)=>{
            try {
                const pool = await getConnection()
                const result = await pool.request()
                .input("idSARIestatus",sql.Int,idSARIestatus)
                .query(queries.enviarProtocoloAnalisis)

                return new Promise((resolver,reject)=>{
                    resolver(result['recordset'])
                })
            } catch (error) {
                console.log(`Error en la extraccion de mas enviarProtocoloAnalisis: ${error}`)
            }
        };

        
        const borrarfotoAdminRevisar = async(idImagenEliAdmin,req,res)=>{
            try {
                const pool = await getConnection()
                const result = await pool.request()
                .input("id",sql.Int,idImagenEliAdmin)
                .query(queries.borrarfotoAdminRevisar)

                return new Promise((resolver,reject)=>{
                    resolver(result['recordset'])
                })

            } catch (error) {
                console.log(`Error en la extraccion de mas borrarfotoAdminRevisar: ${error}`)
            }
        };

        
        const getDatos_sitiosSupervisor = async(req,res)=>{
            try {
                const pool = await getConnection()
                const result = await pool.request().query(queries.getDatos_sitiosSupervisor)

                return new Promise((resolver,reject)=>{
                    resolver(result['recordset'])
                })

            } catch (error) {
                console.log(`Error en la extraccion de mas getDatos_sitiosSupervisor: ${error}`)
            }
        };

        
        const getDatos_sitiosAnalisis = async(req,res)=>{
            try {
                const pool = await getConnection()
                const result = await pool.request().query(queries.getDatos_sitiosAnalisis)

                return new Promise((resolver,reject)=>{
                    resolver(result['recordset'])
                })

            } catch (error) {
                console.log(`Error en la extraccion de mas getDatos_sitiosAnalisis: ${error}`)
            }
        };
        const getAPSW = async (idRedJalisco,req,res)=>{
            
            try {
                
                const pool = await getConnection()
                const result = await pool.request()
                
                .input("idRedJalisco",sql.VarChar,idRedJalisco)
                .query(queries.getAPSW)
                //console.log(result)
                //res.json(result.recordset)
        
                return new Promise((resolve,reject)=>{
                    resolve(result['recordset']);
                })
        
                //return res.request(result);
        
                //return res.send(result.recordset);
        
        
                //res.send('index',{result});
                //res.json(result.recordset)
            } catch (error) {
                console.log(`Error en la extraccion de informacion de INICIO: ${error}`)
            }
        
        };
        
    
    exports.getProducts = getProducts
    exports.createUser = createUser
    exports.getPassword = getPassword
    exports.hash = hash
    exports.Imageupload = Imageupload
    exports.login = login
    exports.ShowImg = ShowImg
    exports.ShowImg2 = ShowImg2
    exports.CompleteEvent = CompleteEvent
    exports.getMoreInf = getMoreInf
    exports.getInformacion_inicio = getInformacion_inicio
    exports.MaxEstatus=MaxXstatus
    exports.MaxXsucursal=MaxXsucursal
    exports.Top10Suc=Top10Suc
    exports.modificarEvento = modificarEvento
    exports.cerrarEvento = cerrarEvento
    exports.getInformacion_Etiquetas = getInformacion_Etiquetas
    exports.SelectidEstatus = SelectidEstatus
    exports.Infousuario = Infousuario
    exports.CheckEstatus = CheckEstatus
    exports.getAPSW = getAPSW

    exports.datosfotosAdminRevisar = datosfotosAdminRevisar
    exports.borrarfotoAdminRevisar = borrarfotoAdminRevisar
    exports.getDatos_sitiosSupervisor = getDatos_sitiosSupervisor
    exports.enviarProtocoloAnalisis = enviarProtocoloAnalisis
    exports.getDatos_sitiosAnalisis = getDatos_sitiosAnalisis

