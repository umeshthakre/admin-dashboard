import { createUserWithEmailAndPassword } from "firebase/auth";
import authService from "../services/authService.js";
import { body, validationResult } from 'express-validator';
import { auth } from "../config/firebaseConfig.js";
import { generateToken } from "../helpers/jwt.js";

class AuthController {

    async login(req, res) {
        try {

            const email = req.body.email;
            const password = req.body.password;


            let login = await authService.login({ email, password });
            // console.log('login', login)
            if (login.success === false && login.error == 'Invalid Credentials') {
                console.log('error invalid credentials')
                return res.status(500).send({ success: false, error: 'Invalid Credentials' })
            }


            const mongoUser = await authService.findMongoUser(email);

            let token;

            if (mongoUser.success) {
                token = generateToken(mongoUser);
            }


            return res.status(200).send({ login, token, user: mongoUser })



        } catch (error) {
            console.log('error', error);
            return res.status(500).send("error while logging in")
        }
    }

    async signup(req, res) {
        try {

            const email = req.body.email;
            const password = req.body.password;
            const name = req.body.name;

            const mongoUser = await authService.findMongoUser(email);

            if (mongoUser.success) {
                return res.status(500).send({ error: "User with same email address already exists" });
            }

            if (mongoUser.error) {
                return res.status(500).send("error while registering user")
            }


            const userCredential = await authService.registerUser(email,password);

            if(userCredential.success === false){
                return res.status(500).send(userCredential)
            }

            if (userCredential.success) {

                const mongoUser = await authService.createMongoDBUser({ email, password, name })

                if (mongoUser.success) {
                    const token = generateToken(mongoUser)
                    return res.status(200).send( userCredential, mongoUser, token);
                }

            }

        } catch (error) {
            console.log(error);
            return res.status(500).send("error while registering user")
        }


    }

}




export default new AuthController()