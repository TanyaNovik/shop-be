'use strict';
const data = require('./productsData');

module.exports.getProductsList = async (event) => {
  if(data){
    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(data),
    };
  } else {
    return {
      statusCode: 404,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify('Products were not found!'),
    };
  }


};
