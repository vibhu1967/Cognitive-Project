const { 
  BlobServiceClient, 
  generateAccountSASQueryParameters, 
  AccountSASPermissions, 
  AccountSASServices,
  AccountSASResourceTypes,
  StorageSharedKeyCredential,
  SASProtocol 
} = require('@azure/storage-blob');
require('dotenv').config()

const constants = {
  accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  accountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY
};
const sharedKeyCredential = new StorageSharedKeyCredential(
  constants.accountName,
  constants.accountKey
);

function getURL(blob) {

  const sasToken =  createAccountSas();

if (!constants.accountName) throw Error('Azure Storage accountName not found');
if (!sasToken) throw Error('Azure Storage accountKey not found');

const blobServiceUri = `https://${constants.accountName}.blob.core.windows.net`;


const blobServiceClient = new BlobServiceClient(
  `${blobServiceUri}?${sasToken}`,
  null
);
  
  const containerName = 'cases';
  const blobName = blob;
  const containerClient =  blobServiceClient.getContainerClient(containerName);

  return((containerClient.getBlockBlobClient(blobName).url))

}
  function createAccountSas() {

    const sasOptions = {
  
        services: AccountSASServices.parse("btqf").toString(),          // blobs, tables, queues, files
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(), // service, container, object
        permissions: AccountSASPermissions.parse("rwdlacupi"),          // permissions
        protocol: SASProtocol.Https,
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + (10 * 60 * 1000)),   // 10 minutes
    };
  
    const sasToken = generateAccountSASQueryParameters(
        sasOptions,
        sharedKeyCredential 
    ).toString();
  
    //console.log(`sasToken = '${sasToken}'\n`);
  
    // prepend sasToken with `?`
    return (sasToken[0] === '?') ? sasToken : `?${sasToken}`;
  }

exports.getURL=getURL



  

