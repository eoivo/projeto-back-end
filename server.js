const app = require('./app');
const sequelize = require('./src/config/database');
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('A conexão com o banco de dados foi estabelecida com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${PORT}/`);
      console.log('Acesse a interface: http://localhost:3000/');
    });
  } catch (err) {
    console.error('Não é possível conectar-se ao banco de dados:', err);
  }
};

startServer();
