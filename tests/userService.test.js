const userService = require('../src/services/authService');
const { User } = require('../src/models/User');

describe('User Service', () => {
  beforeAll(async () => {
    await User.sync({ force: true });
  });

  test('Deve criar um novo usuário', async () => {
    const user = await userService.createUser({ name: 'Teste', email: 'teste@example.com', password: 'senha123' });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Teste');
  });

  test('Deve obter todos os usuários', async () => {
    await userService.createUser({ name: 'Teste2', email: 'teste2@example.com', password: 'senha123' });
    const users = await userService.getAllUsers();
    expect(users.length).toBe(2);
  });
});
