import admin from "firebase-admin";
import serviceAccount from "./internetsoft-48c0c-firebase-adminsdk-fbsvc-0e0c855aac.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const adminAuth = admin.auth();

