import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig.js";
import User from "../models/user.js";
import { adminAuth } from "../config/firebaseAdmin.js";

class AuthService {

    async login({ email, password }) {
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('login running')
            console.log('res', userCredential.user)

            return userCredential;

        } catch (error) {
            let errorMsg;
            console.log('error',error)
            switch (error.code) {
                case 'auth/invalid-credential':
                    errorMsg = "Invalid Credentials"
                    break;
                case 'auth/user-not-found':
                    errorMsg = 'No user found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMsg = 'Incorrect password.';
                    break;
                case 'auth/invalid-email':
                    errorMsg = 'The email address is not valid.';
                    break;
                case 'auth/user-disabled':
                    errorMsg = 'This user account has been disabled.';
                    break;
                case 'auth/too-many-requests':
                    errorMsg = 'Too many attempts. Try again later.';
                    break;
                default:
                    errorMsg = 'Login failed. Please try again.';
            }

            console.error('Login error:', error.code, error.message);
            return { success: false, error: errorMsg };
        }
    }

    async registerUser( email, password) {
        try {

            console.log('user',{email,password})
            // Attempt to create a new user with the provided email and password
            const userCredential = await adminAuth.createUser({
                email,
                password,
            });

            console.log('User created successfully:')

            // If successful, userCredential will contain the user info
            console.log('User created successfully:', userCredential.user);


            // You can return a success response or perform additional actions
            return {
                success: true,
                message: 'User created successfully!',
                user: userCredential.user,
            };
        } catch (error) {
            // Handle errors appropriately
            console.error('Error creating user:', error.message);

            let errorMsg;

            // You can handle specific Firebase auth error codes here
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMsg = 'This email is already in use. Please choose another one.';
                    break;
                case 'auth/invalid-email':
                    errorMsg = 'The email address is not valid.';
                    break;
                case 'auth/weak-password':
                    errorMsg = 'The password is too weak. Please choose a stronger one.';
                    break;
                default:
                    errorMsg = 'An error occurred while creating the user. Please try again.';
            }

            // Return an error response
            return {
                success: false,
                message: errorMsg,
                error: error.message,
            };
        }
    }

    async createMongoDBUser(userBody){
        try {
            const newUser = await User.create(userBody);

            return {success:true,newUser}
            
        } catch (errors) {
            console.log('error',errors);
            return {error:true,errors}
        }
    }

    async findMongoUser(email){
        try {

            const mongoUser = await User.findOne({email});

            if(mongoUser){
                return {success:true,mongoUser};
            }else{
                return {success:false};
            }
            
        } catch (error) {
            console.log('error',error);
            return {error:true}
        }
    }

}

export default new AuthService();