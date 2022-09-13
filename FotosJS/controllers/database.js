const {getConnection,sql} = require ('./database/conect')
const {queries} = require ('./database/query')

const bcrypct = require("bcryptjs");
const { json } = require('body-parser');
const rondas = 3;
const document = this;


    function hash(username,password){
        
        bcrypct.hash(password, rondas, (err, pass) =>{
            if(err){
               console.log(err)
            }else{
              console.log('hasheado') 
            }
            const  id = 1
            createUser(id,username,pass)
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
    const modificarEvento = async (id,estatus,req,res)=>{
       
        //console.log(`Id desde el connect ${id}`);
        try {
            const pool = await getConnection();
            console.log(id,estatus)
            
            const result = await pool.request()
                .input("id",sql.VarChar,id)
                .input("estatus",sql.VarChar,estatus)
               // .query(queries.verEvento)
                .query(queries.query_modificarEvento)
                //console.log(result);
            return new Promise((resolver,reject)=>{
                resolver(result['recordset'])
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
    
    const getPassword = async (username,password,res,req) => {  
       
        try{
        const pool = await getConnection()
        const result = await pool.request().input("username", username).query(queries.getPassword)
        
       
        return new Promise((resolve, reject) =>{
            
                
            login(password,result['recordset'][0]['Password']).then((resultado)=>{
            setTimeout(()=>{
                resolve(resultado)
             
            },1500)
            })
            
            
        })     
        
        }catch(error){
                console.log(error)
        }
      
     
    }


    const createUser = async (id,username,password,req, res) => {
    
    if(username == null || password == null || id == null){
        return res.status(400).json({msg: "BAD REQUEST"})
    }
    
    if (id == null) id = 0;
    try{
        const pool = await getConnection();
    
        await pool.request()
        .input("name", sql.Text,username)
        .input("password", sql.Text,password)
        .input("id", sql.Int,id)
        .query(
            queries.createProduct
            )
        
        
    } catch(error) {
       
        console.log(error)
    }
    }

    const Imageupload = async (IdEvento,cam,image1,req, res) => {
    
        if(IdEvento == null || cam == null || image1 == null ){
            return res.status(400).json({msg: "BAD REQUEST"})
        }
        
        if (IdEvento == null) IdEvento = 0;
        try{
            const pool = await getConnection();
            console.log('Imageupload')
            await pool.request()
            .input("IdEvento", sql.Int,IdEvento)
            .input("cam", sql.Text,cam)
            .input("image1", sql.VarChar,image1)
            .query(
                queries.UploadImage
                )
            
            
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