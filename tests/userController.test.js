const request = require('supertest');
const app = require('../app'); 
const { User } = require('../src/models/User');

describe('User Controller', () => {
  beforeAll(async () => {
    await User.sync({ force: true }); 
  });

  afterAll(async () => {
    await User.drop(); 
  });

  test('Deve criar um novo usuário', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Teste', email: 'teste@example.com', password: 'senha123' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Teste');
  });

  test('Deve obter todos os usuários', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
