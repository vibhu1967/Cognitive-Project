const indexer=require('./cognitiveSearch/createIndexer')
const index=require('./cognitiveSearch/createIndex')
const dataSource=require('./cognitiveSearch/createDataSource')
const dataFilter=require('./cognitiveSearch/oDataFilter')
const geturl = require('./blobClient')
const express=require('express');
const connect = require('connect');
const http = require('http');
const { stringify } = require('querystring');
const app = express();
const cors=require("cors")
const { type } = require('os')
const getFile=require('./connectDb')

app.use(express.json());
app.use(cors())
require("dotenv").config();



//dataSource.makeDataSource();
//index.makeIndex();
//indexer.makeIndexer();
//dataFilter.oDataFilter(account,null,null,null);


app.post("/filter",async(req,resp)=>{
  const bodyContent = req.body;
  var account=bodyContent.Account;
  if(account){
    account.stringify;
  }
  else{
    account=null;
  }
  var vertical=bodyContent.Vertical;
  if(vertical){
    vertical.stringify;
  }
  else{
    vertical=null;
  }
  var serviceOfferingMapping=bodyContent.ServiceOfferingMapping;
  if(serviceOfferingMapping){
    serviceOfferingMapping.stringify;
  }
  else{
    serviceOfferingMapping=null;
  }
  var metaData=bodyContent.MetaData;
  if(metaData){
    metaData.stringify;
  }
  else{
    metaData=null;
  }
  
  (async () => {
    const val=(await dataFilter.oDataFilter(account,vertical,serviceOfferingMapping,metaData))
    resp.send(val);
  })()
})


app.get("/image/:id",(req,resp)=>{
    //var image=req.params.id
    (async () => {
      var file=(await getFile.getFile(req.params.id))
      console.log(file)
      file=file+'.pptx';
      var url = geturl.getURL(file)
      console.log(typeof url)
      resp.json({
        file:`${url}`
      })
     
    })()
    
  
})


app.listen(4000);
console.log("helo")