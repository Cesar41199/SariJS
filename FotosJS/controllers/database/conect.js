const sql = require("mssql")

const dbSettings = {

    server : "192.168.53.31",
    database : "redJaliscoWeb_AnyDesk",
    user : "sa",
    password : "SIAserver1234",    
    port : 1433,
    options:{
        encrypt: true,
        trustServerCertificate: true,
        /*cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
        }*/
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
 
module.exports = {
    getConnection,sql};