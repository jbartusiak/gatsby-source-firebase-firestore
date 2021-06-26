const admin = require('firebase-admin');

const initFirebase = credential => {
  const app = admin.initializeApp({
    credential: admin.credential.cert(credential),
  });
  return app.firestore();
};

module.exports = { initFirebase };
