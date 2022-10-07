'use strict';
const getConnect = require('./pg-client');
module.exports.getProductsList = async (event) => {
  try{
  const connection = await getConnect();

  const {rows: products} = await connection.query('select p.id, title, description, price, s.count from products p inner join stocks s on p.id =s.product_id; ');
  console.log('products', products);
  connection.end();
    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(products),
    };
  } catch {
    return {
      statusCode: 404,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify('Products were not found!'),
    };
  }
};
