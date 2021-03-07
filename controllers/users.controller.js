import userService from '../services/user.service.js'
import expressValidator from 'express-validator'

const getAllUsersAsync = async (req, res) => {
	try {
		// const conn = await connectDbAsync(req);
		// const users = await userService.getAllUsersAsync(conn);
		const users = await userService.getAllUsersAsync();
		res.send(users);
	}
	catch (error) {
		res.status(500).send(error);
	}
}

const addUserAsync = async (req, res) => {
	try {
		validateRequest(req);
		// const conn = await connectDbAsync(req);
		// const user = await userService.addUserAsync(conn, req.body);
		const user = await userService.addUserAsync(req.body);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
}

const updateUserAsync = async (req, res) => {
	try {
		validateRequest(req);
		// const conn = await connectDbAsync(req);
		// const user = await userService.updateUserAsync(conn, req.body);
		const user = await userService.updateUserAsync(req.body);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
}

const deleteUserAsync = async (req, res) => {
	try {
		validateRequest(req);
		// const conn = await connectDbAsync(req);
		// const result = await userService.deleteUserAsync(conn, req.params.id);
		const result = await userService.deleteUserAsync(req.params.id);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
}

// const connectDbAsync = (request) => {
// 	return new Promise((resolve, reject) => {
// 		request.getConnection((err, conn) => {
// 			if (!err) {
// 				resolve(conn);
// 			}
// 			else {
// 				reject({ message: err.message || "Something wrong happened" })
// 			}
// 		})
// 	})
// }

const validateRequest = (req) => {
	const errors = expressValidator.validationResult(req)?.array();
	if (errors.length) {
		throw { errors: errors }
	}
}

export default {
	getAllUsersAsync, addUserAsync, updateUserAsync, deleteUserAsync
}
