export default {
    PORT: process.env.PORT || 8080,
    mongodb: {
        cnxStr: 'mongodb://127.0.0.1/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    mongoRemote: {
        
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'coderhouse'
        }
    },
    fileSystem: {
        path: './DB'
    }
}
