const request = require('supertest');
const app = require('../app'); 
const User = require('../src/models/User');

describe('User API', () => {
 
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  test('should create a new user', async () => {
    const newUser = {
      firstname: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/users/v1/users')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('email', 'john.doe@example.com');
  });
});
