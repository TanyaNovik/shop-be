const getProductsList = require ('./productList').getProductsList;

describe('tests for getProductsList', () => {

  test('get products list', async () => {
    const response = await getProductsList();
    expect(response.statusCode).toEqual(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.length).toEqual(6);
  });
});