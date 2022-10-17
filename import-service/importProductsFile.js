'use strict';
const AWS = require('aws-sdk');
module.exports.importProductsFile = async (event) => {
  const { name } = event.pathParameters;
  const s3 = new AWS.S3({region: 'eu-west-1'});
  let products;
  const params = {
    Bucket: 'uploaded-shop',
    Key: `uploaded/${name}`,
    Expires: 60,
    ContentType: 'text/csv'
  }
 const url = s3.getSignedUrl('putObject', params);
  return {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(url),
  };


};
