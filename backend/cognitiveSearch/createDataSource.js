require("dotenv").config();
const endpoint = process.env.SEARCH_API_ENDPOINT;
const apiKey = process.env.SEARCH_API_KEY;
const { SearchIndexerClient, AzureKeyCredential,SearchIndexClient } = require("@azure/search-documents");
  
  
 function makeDataSource() {
    console.log(`Running Create Datasource Connection Sample....`);
  
    if (!endpoint || !apiKey) {
      console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
      return;
    }
    
    const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
    const dataSourceConnection = {
      name: "dlsqldata",
      type: "azuresql",
      connectionString : "Server=tcp:dlpractice.database.windows.net,1433;Database=DL-practice;User ID=admin123;Password=Admin@123;Trusted_Connection=False;Encrypt=True;Connection Timeout=30;",
      container: { 
          name : "case_studies",
          query: null,
        }
    };
  
    client.createDataSourceConnection(dataSourceConnection);
  };
 

  
  

exports.makeDataSource=makeDataSource;

