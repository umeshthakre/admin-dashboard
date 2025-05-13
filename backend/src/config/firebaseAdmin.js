import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const adminAuth = admin.auth();
