import express from 'express'
import asyncHandler from 'express-async-handler'
import { body, param } from "express-validator"
import controller from '../controllers/users.controller.js'

const addUserRules = () => {
    return [
        body("name", "name does not Empty").not().isEmpty(),
        body("email", "Invalid does not Empty").not().isEmpty(),
        body("email", "Invalid email").isEmail(),
    ];
};

const updateUserRules = () => {
    return [
        body("name", "name does not Empty").not().isEmpty(),
        body("email", "Invalid does not Empty").not().isEmpty(),
        body("email", "Invalid email").isEmail(),
    ];
};

const deleteUserRules = () => {
    return [
        param("id", "ID must be integer!").isInt(),
    ];
};

var router = express.Router();

router.get('/', asyncHandler(controller.getAllUsersAsync));
router.put("/add", addUserRules(), asyncHandler(controller.addUserAsync));
router.post("/update", updateUserRules(), asyncHandler(controller.updateUserAsync));
router.delete("/delete/:id", deleteUserRules(), asyncHandler(controller.deleteUserAsync));

export default router;