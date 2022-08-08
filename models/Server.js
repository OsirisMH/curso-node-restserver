const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            search: '/api/search',
            categories: '/api/categories',
            products: '/api/products',
            users: '/api/users',
        }
        
        // Conectar a base de datos
        this.connectDB();
        
        // Middlewares
        this.middlewares();

        // Rutas de mí aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo de body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth.routes') );
        this.app.use( this.paths.search, require('../routes/search.routes') );
        this.app.use( this.paths.categories, require('../routes/category.routes') );
        this.app.use( this.paths.products, require('../routes/product.routes') );
        this.app.use( this.paths.users, require('../routes/user.routes') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;