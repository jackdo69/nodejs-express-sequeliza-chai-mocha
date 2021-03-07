import express from 'express'
import mysql from 'mysql'
import myConnection from 'express-myconnection'
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import swaggerUi from 'swagger-ui-express'
import users from './api/users.api.js'
import swaggerDocument from './config/swagger.config.js'
import config from './config/db.config.js'

const app = express()

const dbOptions = {
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	port: config.database.port,
	database: config.database.db
}

app.use(myConnection(mysql, dbOptions, 'pool'))

app.use(urlencoded({ extended: true }))
app.use(json())

app.use('/users', users)

app.use('/api-docs-ui', (req, res, next) => {
	swaggerDocument.host = req.get('host');
	req.swaggerDoc = swaggerDocument;
	next();
}, swaggerUi.serve, swaggerUi.setup());

app.listen(3000, function () {
	console.log('Server running at port 3000')
})

export default app; //for testing purpose

// TODO use eslint
// TODO write unit tests
// TODO use ESLint