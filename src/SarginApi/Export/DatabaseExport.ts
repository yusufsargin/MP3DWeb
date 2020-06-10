import admin from "firebase-admin";

export default class DatabaseConnection {
  _database: any;
  _baseRef: any;

  constructor() {
    this.initialize();
    this._baseRef = this._database.collection("MobilyaPlanApi");
  }

  initialize = () => {
    var serviceAccount = require("path/to/serviceAccountKey.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://mpwebengine.firebaseio.com",
    });

    this._database = admin.firestore();
  };
  getAllData = () => {
    const db = admin.firestore().collection("MobilyaPlanApi");
    let data: any[] = [];

    db.get()
      .then((snap) => {
        snap.forEach((doc) => {
          const addedData = doc.data();

          data.push(addedData);
        });
      })
      .catch((err) => console.log(err));

    return data;
  };

  objToDataBase = (customerInfo: any, objData: any) => {
    const db = this._baseRef.doc("Objects");

    db.set({
      customerInfo: customerInfo,
      objItem: objData,
    });
  };
}
