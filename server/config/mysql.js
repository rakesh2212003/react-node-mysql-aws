import mysql from 'mysql2/promise'

export const getConnection = async() => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
        return connection;
    } catch (error) {
        console.error('Database Error:', error.message);
    }
}