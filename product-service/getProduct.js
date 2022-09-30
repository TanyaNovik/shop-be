'use strict';
const getProductsList = require ('./productList').getProductsList;

module.exports.getProductsByName = async (event) => {
  const { name } = event.pathParameters;
  let data = [];
  try{
    const response = await getProductsList();
    data = JSON.parse(response.body);
  } catch{
    throw new Error('Products were not found!');
  }
  let searchProduct = data.find(el => el.title === name);
  if(searchProduct) {
    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(searchProduct),
    };
  } else {
    return {
      statusCode: 404,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify('Product with this name was not found!'),
    };
  }


};
