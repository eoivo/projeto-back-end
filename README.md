# Projeto Backend

Este projeto é uma aplicação backend construída com Node.js e Express.js, usando Sequelize ORM para gerenciar o banco de dados MySQL. Ele implementa funcionalidades básicas de um sistema que lida com usuários, categorias e produtos.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
project-root/
├── src/
│   ├── config/
│   │   └── database.js            # Configuração da conexão com o banco de dados
│   ├── controllers/
│   │   ├── authController.js      # Controlador para autenticação de usuários
│   │   ├── productController.js   # Controlador para operações com produtos
│   │   └── userController.js      # Controlador para operações com usuários
│   ├── middleware/
│   │   └── authMiddleware.js      # Middleware para autenticação de usuários
│   ├── models/
│   │   ├── Category.js            # Modelo de dados para categorias
│   │   ├── Product.js             # Modelo de dados para produtos
│   │   ├── ProductCategory.js     # Modelo de dados para relação entre produtos e categorias
│   │   ├── ProductImage.js        # Modelo de dados para imagens de produtos
│   │   ├── ProductOption.js       # Modelo de dados para opções de produtos
│   │   └── User.js                # Modelo de dados para usuários
│   ├── routes/
│   │   ├── categoryRoutes.js      # Rotas para operações com categorias
│   │   ├── productRoutes.js       # Rotas para operações com produtos
│   │   └── userRoutes.js          # Rotas para operações com usuários
│   ├── services/
│   │   ├── authService.js         # Serviço para lógica de autenticação
├── app.js                         # Configuração principal do Express.js
├── createData.js                  # Script para criar dados iniciais no banco de dados
├── index.html                     # Fornece links diretos para acessar os principais endpoints da API
├── server.js                      # Arquivo principal para iniciar o servidor
├── tests/
│   ├── category.test.js           # Testes para o controlador de categorias
│   ├── product.test.js            # Testes para o controlador de produtos
│   └── user.test.js               # Testes para o controlador de usuários
├── .env                           # Arquivo de configuração das variáveis de ambiente
├── .gitignore                     # Arquivo para ignorar arquivos e pastas no Git
└── package.json                   # Gerenciador de dependências e scripts do projeto
```

## Instalação

Para configurar e rodar este projeto em sua máquina local, siga estas etapas:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/eoivo/projeto-back-end
   cd projeto-back-end
   ```

2. **Instale as dependências:**
   ```bash
   npm install 
   ```

3. **Configure as variáveis de ambiente:**
   - Renomeie o arquivo `.env.example` para `.env` (se existir) e preencha as variáveis com as informações adequadas para seu banco de dados.
   - Exemplo de arquivo `.env`:
     ```
     DB_NAME=projeto
     DB_USER=root
     DB_PASSWORD=root
     DB_HOST=localhost
     DB_PORT=3306
     DB_DIALECT=mysql
     PORT=3000
     ```

4. **Crie as tabelas e dados iniciais:**
   ```bash
   node createData.js
   ```

5. **Inicie o servidor:**
   ```bash
   node server.js / npm start
   ```

6. **Execute os testes:**
   ```bash
   npm test
   ```

## Configurações do Postman

Para testar a API com Postman, você pode importar as coleções e variáveis de ambiente fornecidas. Siga as instruções abaixo:

1. **Importar Coleções:**
   - Abra o Postman e clique em "Importar" no canto superior esquerdo.
   - Selecione o arquivo JSON da coleção que você deseja importar. Se você não tiver o arquivo JSON da coleção, você pode exportar do Postman usando a funcionalidade "Exportar" para obter os arquivos necessários.

2. **Importar Variáveis de Ambiente:**
   - No Postman, vá para a seção "Ambientes" e clique em "Importar".
   - Selecione o arquivo JSON do ambiente que contém variáveis como URLs base e chaves de autenticação.

3. **Verificar Configurações:**
   - Certifique-se de que as variáveis de ambiente estão corretamente configuradas com os valores do seu ambiente local, como `localhost` para URLs.

## Uso

Após iniciar o servidor, a aplicação estará disponível em `http://localhost:3000`. Você pode interagir com a API usando as seguintes rotas:

- **Usuários:** `/api/users`
- **Categorias:** `/api/categories`
- **Produtos:** `/api/products`

## Contribuição

Se você deseja contribuir para este projeto, por favor, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Faça commit das suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request no GitHub.

## Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Se você tiver dúvidas ou encontrar problemas, por favor, abra uma issue no GitHub ou entre em contato.
