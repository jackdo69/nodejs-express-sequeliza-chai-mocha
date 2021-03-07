import sequelize from '../sequelize.js'
import pkg from 'sequelize';
const { DataTypes } = pkg;

const User = sequelize.define('user', {
    // attributes
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
}, {
    // options
    timestamps: false
});

export default User;