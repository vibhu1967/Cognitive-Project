require("dotenv").config();
const endpoint = process.env.SEARCH_API_ENDPOINT;
const apiKey = process.env.SEARCH_API_KEY;

const { SearchClient, AzureKeyCredential,SearchIndexClient, odata } = require("@azure/search-documents");

const client = new SearchClient(
    endpoint,
    'dlcasestudy',
    new AzureKeyCredential(apiKey)
  );



async function oDataFilter(Account,Vertical,ServiceOfferingMapping,MetaData) {
   const account=Account;
   const vertical = Vertical;
   const serviceOfferingMapping = ServiceOfferingMapping;
   const metaData = MetaData;
   const val=[];
    if(account!=null && vertical==null && serviceOfferingMapping==null && metaData==null){
        searchResults = await client.search("*",{
            filter : odata`Account eq ${account}`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val
    }
    else if(account==null && vertical!=null && serviceOfferingMapping==null && metaData==null){
        searchResults = await client.search("*",{
            filter : odata`Vertical eq ${vertical}`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            console.log(result)
            val.push(result.document)
            
          }
          return val

    }
    else if(account==null && vertical==null && serviceOfferingMapping!=null && metaData==null){
        searchResults = await client.search("*",{
            filter : odata`search.ismatchscoring(${serviceOfferingMapping},'ServiceOfferingMapping')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val
    }
    else if(account==null && vertical==null && serviceOfferingMapping==null && metaData!=null){
        searchResults = await client.search("*",{
            filter : odata`search.ismatchscoring(${metaData},'MetaData')`,
            //search.in('MetaData','Azure')

            // filter:odata`MetaData eq ${metaData}`,
            // $filter=(MetaData eq 'Azure, Microservices Azure')
            
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val
    }
    else if(account!=null && vertical!=null && serviceOfferingMapping==null && metaData==null){
        searchResults = await client.search("*",{
            filter : odata`Account eq ${account} and Vertical eq ${vertical}`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account!=null && vertical==null && serviceOfferingMapping!=null && metaData==null){
        searchResults = await client.search("*",{
            filter : odata`Account eq ${vertical} and search.ismatchscoring(${serviceOfferingMapping},'ServiceOfferingMapping')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account!=null && vertical==null && serviceOfferingMapping==null && metaData!=null){
        searchResults = await client.search("*",{
            filter : odata`Account eq ${vertical} and search.ismatchscoring(${metaData},'MetaData')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account==null && vertical!=null && serviceOfferingMapping!=null && metaData==null){
        searchResults = await client.search("*",{
            filter : odata`Vertical eq ${vertical} and search.ismatchscoring(${serviceOfferingMapping},'ServiceOfferingMapping')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account==null && vertical!=null && serviceOfferingMapping==null && metaData!=null){
        searchResults = await client.search("*",{
            filter : odata`Vertical eq ${vertical} and search.ismatchscoring(${metaData},'MetaData')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account==null && vertical==null && serviceOfferingMapping!=null && metaData!=null){
        searchResults = await client.search("*",{
            filter : odata`search.ismatchscoring(${serviceOfferingMapping},'ServiceOfferingMapping') and search.ismatchscoring(${metaData},'MetaData')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account!=null && vertical!=null && serviceOfferingMapping!=null && metaData==null){
        searchResults = await client.search("*",{
            filter : odata`Account eq ${account} and Vertical eq ${vertical} and search.ismatchscoring(${serviceOfferingMapping},'ServiceOfferingMapping')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account!=null && vertical!=null && serviceOfferingMapping==null && metaData!=null){
        searchResults = await client.search("*",{
            filter : odata` Account eq ${account} and Vertical eq ${vertical} and search.ismatchscoring(${metaData},'MetaData')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account==null && vertical!=null && serviceOfferingMapping!=null && metaData!=null){
        searchResults = await client.search("*",{
            filter : odata`Vertical eq ${vertical} and search.ismatchscoring(${serviceOfferingMapping},'ServiceOfferingMapping') and search.ismatchscoring(${metaData},'MetaData')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else if(account!=null && vertical!=null && serviceOfferingMapping!=null && metaData!=null){
        searchResults = await client.search("*",{
            filter : odata` Account eq ${account} and Vertical eq ${vertical} and search.ismatchscoring(${serviceOfferingMapping},'ServiceOfferingMapping') and search.ismatchscoring(${metaData},'MetaData')`,
            select: ["id","CaseStudyName","Account","Vertical","SolutionName","ServiceOfferingMapping","Status","Dependency","Remarks","MetaData","FileName"]
          });
          for await(const result of searchResults.results) {
            val.push(result.document)
            console.log(result);
          }
          return val;
    }
    else{
        console.log("no match found");
    }
  }
exports.oDataFilter=oDataFilter;
// exports.getImage=getImage;