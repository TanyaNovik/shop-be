'use strict';
const AWS = require('aws-sdk');

const csv = require('csv-parser');
module.exports.importFileParser = async (event, context, callback) => {
  const BUCKET = 'uploaded-shop';
  let results = [];
  const s3 = new AWS.S3({region: 'eu-west-1'});
  const sqs = new AWS.SQS();
  for (const record of event.Records) {
    const params = {
      Bucket: BUCKET,
      Key: `${record.s3.object.key}`,
    }

    await s3.getObject(params).createReadStream()
      .pipe(csv())
      .on('data', (data) => {
        results.push(data)
      })
      .on('end', () => {
        sqs.sendMessage({
          QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/833686642500/catalogItemsQueue',
          MessageBody: JSON.stringify(results)
        }, (err, data) => {
          if(err){
            console.log('ERROR!!!', err)
          } else {
            console.log('Send record:', results);
          }
        })
      });

    await s3.copyObject({
      Bucket: BUCKET,
      CopySource: BUCKET + '/' + record.s3.object.key,
      Key: record.s3.object.key.replace('uploaded', 'parsed')
    }).promise();
    await s3.deleteObject({
      Bucket: BUCKET,
      Key: record.s3.object.key
    }).promise();
  }
  callback(null, {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
  });
};
