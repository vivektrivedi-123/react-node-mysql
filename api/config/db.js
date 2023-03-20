import mysql2 from 'mysql2'

// export const db = mysql2.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Shivam@up12",
//     database: "blog",
//     port: "3306"
// })

export const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})