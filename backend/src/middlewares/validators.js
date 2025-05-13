import { body } from "express-validator";

export const loginValidator = [
    body('email')
    .isEmail()
    .withMessage('Email is not valid'),
    body('password')
    .notEmpty()
    .withMessage("Password must be present")
]

export const signupValidator = [
    body('email')
    .isEmail()
    .withMessage("Invalid Email"),

    body('password')
    .notEmpty()
    .withMessage("Password is required"),

    body("name")
    .notEmpty()
    .isString()
    .withMessage("Name must be present")
]

export const reportValidator = [
    body("name")
    .isString()
    .withMessage("Name must be present and valid"),

    body("email")
    .isEmail()
    .withMessage("Email must be valid")
]

export const updateUserValidator = [
    body("name")
    .isString()
    .withMessage("Name must be present and valid"),

    body("phone")
    .isString()
    .withMessage("Phone must be present and valid")
]