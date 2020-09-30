import database from "./firebase";

export const checkUser = (id, email, display_name, callback) => {
  console.log(id, email, display_name);
  const db = database.firestore();
  const doc = db.collection("users").doc(id);
  doc.get().then((docSnapshot) => {
    if (!docSnapshot.exists) {
      doc.set({
        access: false,
        display_name,
        email,
        tiles: 2,
      });
    }
    doc.onSnapshot((document) => callback(document.data()));
  });
};
