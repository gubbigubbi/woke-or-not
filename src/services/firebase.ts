import Firebase from 'firebase';

let config = {
    apiKey: 'AIzaSyDtazD13bd-dbDxH8IGfpD-5NZZEXV8SUo',
    authDomain: 'woke-or-not.firebaseapp.com',
    databaseURL: 'https://woke-or-not.firebaseio.com',
    projectId: 'woke-or-not',
    storageBucket: 'woke-or-not.appspot.com',
    messagingSenderId: '719809179488'
};
  
let app = Firebase.initializeApp(config);
let db = app.database();

/**
 * Database references
 */
let celebritiesRef = db.ref('celebrities');

export default class FirebaseService {

    public getCelebritiesRef(): Firebase.database.Reference {
        return celebritiesRef;
    }

    // TODO: Push with custom ID
    public addCelebrity(celebrity: any): void {
        celebritiesRef.push(celebrity);
    }

    // TODO: Check firebase first then get from api

}