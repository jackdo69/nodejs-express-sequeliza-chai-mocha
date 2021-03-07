/* Implement the sequelize ORM instead of usual SQL query */

import User from '../models/user.model.js'


// function getAllUsersAsync(conn) {
//     return new Promise((resolve, reject) => {
//         conn.query('SELECT * FROM users ORDER BY id DESC', function (err, rows) {
//             if (err) {
//                 reject({ message: err.message || "Something wrong happened" })
//             }
//             else {
//                 resolve(rows)
//             }
//         })
//     })
// }

async function getAllUsersAsync() {
    try {
        const users = await User.findAll();
        return users
    } catch (e) { throw e }
}

// function addUserAsync(conn, user) {
//     return new Promise((resolve, reject) => {
//         conn.query("INSERT INTO users SET ?", user, (err, result) => {
//             if (err) {
//                 reject({ message: err.message || "Something wrong happened" });
//             }
//             else {
//                 console.log(result);
//                 user.id = result.insertId;
//                 resolve(user);
//             }
//         })
//     })
// }

async function addUserAsync(user) {
    const { name, age, email } = user
    try {
        const result = await User.create({
            name, email, age
        })
        return result
    } catch (e) { throw e }
}

// function updateUserAsync(conn, user) {
//     return new Promise((resolve, reject) => {
//         conn.query("UPDATE users set name = ?, email = ?, age = ? WHERE id = ?", [user.name, user.email, user.age, user.id], (err, result) => {
//             if (err) {
//                 reject({ message: err.message || "Something wrong happened" });
//             }
//             else if (!result.affectedRows) {
//                 reject({ message: "User not found" });
//             }
//             else {
//                 resolve(user);
//             }
//         })
//     })
// }

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

// function deleteUserAsync(conn, userId) {
//     return new Promise((resolve, reject) => {
//         conn.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
//             if (err) {
//                 reject({ message: err.message || "Something wrong happened" });
//             }
//             else if (!result.affectedRows) {
//                 reject({ message: "User not found" });
//             }
//             else {
//                 resolve({ message: "User has been successfully deleted" });
//             }
//         })
//     })
// }

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