import config from './config/db.config.js'
import Sequelize from 'sequelize'

//Using sequelize as ORM
const sequelize = new Sequelize(config.database.db, config.database.user, config.database.password, {
    host: config.database.host,
    dialect: 'mysql'
});

export default sequelize;