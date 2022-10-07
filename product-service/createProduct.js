'use strict';
const getConnect = require('./pg-client');
module.exports.createProduct = async (event) => {
  try{
    const {title, description, price} = JSON.parse(event.body);
    if(!title || !description || !price) {
      return {
        statusCode: 500,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(`Something went wrong!`),
      };
    }
    const connection = await getConnect();

    await connection.query(`insert into products (title, description, price) values ('${title}', '${description}', ${Number(price)});`);
    const {rows: products} = await connection.query('select id, title, description, price from products; ');

    connection.end();
    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(products),
    };
  } catch {
    return {
      statusCode: 400,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(`DB not connected!`),
    };
  }
};
