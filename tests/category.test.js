const request = require('supertest');
const app = require('../app'); 

describe('Category API', () => {
  it('should fetch all categories', async () => {
    const response = await request(app).get('/api/categories/v1/categories');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new category', async () => {
    const newCategory = {
      name: 'Test Category',
      slug: 'test-category',
      use_in_menu: true
    };
    const response = await request(app)
      .post('/api/categories/v1/categories')
      .send(newCategory);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test Category');
  });

  
});
