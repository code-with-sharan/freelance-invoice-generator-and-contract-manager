import admin from 'firebase-admin'
// import serviceAccount from "../freelancerinvmanagement-firebase-adminsdk-fbsvc-3bc6e18d65.json" assert { type: "json" };
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('../freelancerinvmanagement-firebase-adminsdk-fbsvc-3bc6e18d65.json');

// initialize admin sdk with your service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware to check token
export async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).send("Unauthorized");
  }
}
