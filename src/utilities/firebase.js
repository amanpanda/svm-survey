import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyBNkrmdblPhTSD8so5nYDVKRymgzRS6r5s",
  authDomain: "svm-survey.firebaseapp.com",
  databaseURL: "https://svm-survey.firebaseio.com",
  projectId: "svm-survey",
  storageBucket: "",
  messagingSenderId: "928669787746",
  appId: "1:928669787746:web:dd7a2246946be0f3"
};

app.initializeApp(config);

const auth = app.auth();
const firestore = app.firestore();
const storage = app.storage();

export {
  auth,
  storage,
  firestore,
};
