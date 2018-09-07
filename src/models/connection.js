const mysql = require('mysql');
connection= mysql.createPool({ 
	host: '50.62.209.120',
    user: 'clientes',
    password: 'z!cvH632',
    database: 'clientes',
    port: 3306
});
module.exports = connection;