const sequelize = require('./src/config/database');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');
const ProductCategory = require('./src/models/ProductCategory');
const User = require('./src/models/User');

const criarDados = async () => {
  try {
    console.log('Conectando ao banco de dados...');
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    console.log('Desativando restrições de chave estrangeira...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    console.log('Restrições de chave estrangeira desativadas.');

    console.log('Sincronizando os modelos com o banco de dados...');
    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados com o banco de dados.');

    console.log('Reativando restrições de chave estrangeira...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Restrições de chave estrangeira ativadas.');

    
    console.log('Criando categorias...');
    const electronics = await Category.create({ name: 'Eletrônicos', slug: 'eletronicos', use_in_menu: true });
    const clothing = await Category.create({ name: 'Roupas', slug: 'roupas', use_in_menu: true });

    
    console.log('Criando produtos...');
    const smartphone = await Product.create({
      name: 'Smartphone',
      slug: 'smartphone',
      price: 1999.99,
      price_with_discount: 1799.99,
      stock: 50,
      description: 'Smartphone de última geração',
      enabled: true,
    });

    const laptop = await Product.create({
      name: 'Laptop',
      slug: 'laptop',
      price: 4999.99,
      price_with_discount: 4499.99,
      stock: 30,
      description: 'Laptop potente para trabalho e jogos',
      enabled: true,
    });

    
    console.log('Associando produtos às categorias...');
    await ProductCategory.create({ product_id: smartphone.id, category_id: electronics.id });
    await ProductCategory.create({ product_id: laptop.id, category_id: electronics.id });

  
    console.log('Criando usuários...');
    const user1 = await User.create({
      firstname: 'Lucas',
      surname: 'Silva',
      email: 'lucas.silva@example.com',
      password: 'password123', 
    });

    const user2 = await User.create({
      firstname: 'Ana',
      surname: 'Lima',
      email: 'ana.lima@example.com',
      password: 'password123', 
    });

    console.log('Dados criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar dados:', error);
  } finally {
    await sequelize.close();
  }
};

criarDados();
