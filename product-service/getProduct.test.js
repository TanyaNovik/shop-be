const getProductsByName = require ('./getProduct').getProductsByName;

describe('tests for getProductsByName', () => {

  test('get product by name', async () => {
    const name = 'cucumber';
    const response = await getProductsByName({pathParameters:{name}});
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body).title).toEqual(name);
  });
  test('get product by name with incorrect name', async () => {
    const name = 'cuc';
    const response = await getProductsByName({pathParameters:{name}});
    expect(response.statusCode).toEqual(404);
  });
});