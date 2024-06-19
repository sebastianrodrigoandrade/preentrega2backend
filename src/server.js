import express from 'express'; 
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars  from 'express-handlebars';
import viewRouter from './routes/view.router.js'
import { __dirname } from './path.js'; 
import { Server } from 'socket.io'
import ProductManager from './manager/productManager.js';

const productManager = new ProductManager("./src/data/products.json");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static(`${__dirname}/public`)); 

app.use("/api/cart", cartsRouter); 
app.use("/api/products", productsRouter)

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars'); 
app.set('views', `${__dirname}/views`);

app.use('/', viewRouter); 


const PORT = 8080; 

const httpServer = app.listen(PORT, ()=>console.log(`servidor ok en http://localhost:${PORT}`)); 

const socketServer = new Server(httpServer);

socketServer.on('connection',(socket) => {
    socketServer.on('connection', async(socket) => {
        console.log(`Nuevo usuario conectado:  ${socket.id}`);
    })
    
    socket.on('newProduct', async(product) => {
        try {
            await productManager.addProduct(product);
            socket.emit('products', await productManager.getProducts());
        } catch (error) {
            console.error(`error en la creación del producto ${error.mensaje}`);
        }
    }); 

    socket.on('deleteProduct', async(id) =>{
        console.log (typeof(id)); 
        console.log(id);
        try {
            await productManager.deleteProducts(id)
            socket.emit('products', await productManager.getProducts());
        } catch (error) {
            console.error(`error en la eliminación del producto ${error.mensaje}`);
        }
    })


    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`)
    });
    

})