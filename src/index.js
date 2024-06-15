const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8080;

// Middlewares
app.use(express.json());

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Routes
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Configurar el servidor de Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Manejar eventos de WebSocket aquí
});

// Ruta para la vista home
app.get('/', (req, res) => {
  // Suponiendo que tienes una función getProductos() que devuelve un array de productos
  const productos = getProductos();
  res.render('home', { products: productos });
});

// Ruta para la vista de productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
  // Suponiendo que tienes una función getProductos() que devuelve un array de productos
  const productos = getProductos();
  res.render('realTimeProducts', { products: productos });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
