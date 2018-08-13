
var options = {
    host: '50.62.209.120',
    user: 'clientes',
    password: 'z!cvH632',
    database: 'clientes',
    port: 3306,
    schema: {
		tableName: 'sessions',
		columnNames: {
			idSession: 'idSession',
			idUser: 'idUser',
            ip: 'ip',
            lastAccess:'lastAccess'
		}
	}
};

var sessionStore = new MySQLStore(options);
app.use(session({
	key: 'VITECHD_SESSION',
	secret: 'secret.vitechdsecret.clientes.Secret',
	resave: false,
	saveUninitialized: false
}));
