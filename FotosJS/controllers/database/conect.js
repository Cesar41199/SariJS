const sql = require("mssql")

const dbSettings = {

    server : "10.250.1.4",
    database : "redJaliscoWeb",
    user : "sa",
    password : "SIAserver1234",    
    port : 1433,
    options:{
        encrypt: true,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
        }
    },

};
const dbSettingsSIA = {

    server : "10.250.1.4",
    database : "Sistema_Integral",
    user : "sa",
    password : "SIAserver1234",    
    port : 1433,
    options:{
        encrypt: true,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
        }
    },

};



async function getConnection(){
   try{
    const pool = await sql.connect(dbSettings);
    return pool; 
   }catch (error){
    console.error(error)
   }
}
 
async function getConnectionSIA(){
    try{
     const pool = await sql.connect(dbSettingsSIA);
     return pool; 
    }catch (error){
     console.error(error)
    }
 }
module.exports = {
    getConnection,
    getConnectionSIA,sql};