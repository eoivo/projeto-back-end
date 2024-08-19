const request = require('supertest');
const app = require('../app'); 
const { User } = require('../src/models/User');

describe('Auth Controller', () => {
  beforeAll(async () => {
    await User.sync({ force: true });
    await User.create({ name: 'Teste', email: 'teste@example.com', password: 'senha123' });
  });

  test('Deve gerar um token JWT para um usuário válido', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@example.com', password: 'senha123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Não deve gerar um token para credenciais inválidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@example.com', password: 'senhaErrada' });

    expect(response.status).toBe(400);
  });
});
