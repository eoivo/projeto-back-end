const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./src/routes/userRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/usersVisuals', express.static(path.join(__dirname, 'usersVisuals')));
app.use('/productVisuals', express.static(path.join(__dirname, 'productVisuals')));
app.use('/categoryVisuals', express.static(path.join(__dirname, 'categoryVisuals')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'usersVisuals', 'users.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'productVisuals', 'product.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'categoryVisuals', 'categories.html'));
});

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo quebrou!');
});

module.exports = app;
