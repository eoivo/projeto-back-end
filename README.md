# Projeto Backend

Este projeto é uma aplicação backend construída com Node.js e Express.js, usando Sequelize ORM para gerenciar o banco de dados MySQL. Ele implementa funcionalidades básicas de um sistema que lida com usuários, categorias e produtos.


## Instalação

Para configurar e rodar este projeto em sua máquina local, siga estas etapas:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/eoivo/projeto-back-end.git
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
   npm start / node server.js
   ```

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

```
