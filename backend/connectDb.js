const sql = require('mssql');
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: 1433, 
    database:process.env.DB_NAME,
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true

    }
}

console.log("Starting...");



  async function getFile(id) {
    try { 
        const poolConnection =await  sql.connect(config);

        const resultSet = await poolConnection.request().query(`select FileName from [dbo].[case_studies] where id=${id}`);
        return(resultSet.recordset[0].FileName)
        poolConnection.close();
        }
    catch (err) {
          console.error(err.message);
      }
  }
  exports.getFile=getFile;