const getConnect = require("./pg-client");
const AWS = require('aws-sdk');


module.exports.catalogBatchProcess = async (event) => {
  const data = event.Records.map(({body}) => body);
  const product = JSON.parse(data[0]);

  const title = product.filter(el => el.name === 'title')[0].value;
  const description = product.filter(el => el.name === 'description')[0].value;
  const price = product.filter(el => el.name === 'price')[0].value;
  const connection = await getConnect();

  await connection.query(`insert into products (title, description, price) values ('${title}', '${description}', ${Number(price)});`);
  const {rows: products} = await connection.query('select id, title, description, price from products;');

  const sns = new AWS.SNS({region: 'eu-west-1'});
  await sns.publish({
    Subject: 'Product have been created!',
    Message: JSON.stringify(product),
    TopicArn: process.env.SNS_ARN
  }, () => {
    console.log('Send email with:', product);
  });

  connection.end();
  console.log('ROWS:', JSON.stringify(products));
};