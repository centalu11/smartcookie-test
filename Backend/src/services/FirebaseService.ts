import { initializeApp, cert } from "firebase-admin/app";

class FirebaseService {
  static initialize = () => {
    try {
      initializeApp({
        credential: cert(
          process.env.SERVICE_ACCOUNT_PATH || "./secrets/firebase-key.json"
        ),
      });
    } catch (error) {
      throw error;
    }
  };
}

export default FirebaseService;
