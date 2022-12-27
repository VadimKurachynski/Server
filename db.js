const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: '243388',
    host: 'localhost',
    port: '5432',
    database: 'promnadzor'
})

module.exports = pool

