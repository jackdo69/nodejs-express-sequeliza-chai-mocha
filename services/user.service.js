/* Implement the sequelize ORM instead of usual SQL query */

import User from '../models/user.model.js'


async function getAllUsersAsync() {
    try {
        const users = await User.findAll();
        return users
    } catch (e) { throw e }
}

async function addUserAsync(user) {
    const { name, age, email } = user
    try {
        const result = await User.create({
            name, email, age
        })
        return result
    } catch (e) { throw e }
}

async function updateUserAsync(user) {
    const { name, email, age, id } = user;
    try {
        const result = await User.update({
            name, email, age
        }, {
            where: {
                id: id
            }
        })
        return {
            message: 'User updated!', user: user
        }
    } catch (e) { throw e }
}

async function deleteUserAsync(id) {
    try {
        await User.destroy({
            where: {
                id: parseInt(id)
            }
        })
        return { message: "User deleted!" }
    } catch (e) { throw e }
}

export default {
    getAllUsersAsync,
    addUserAsync,
    updateUserAsync,
    deleteUserAsync
};