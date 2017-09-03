/**
 * Created by bikramkawan on 9/3/17.
 */
import  * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBCxPsFYlSSH-8VZ4yhYpX98gSHVUsW-no",
    authDomain: "personal-money-manager-1fd86.firebaseapp.com",
    databaseURL: "https://personal-money-manager-1fd86.firebaseio.com",
    projectId: "personal-money-manager-1fd86",
    storageBucket: "personal-money-manager-1fd86.appspot.com",
    messagingSenderId: "1053382130170"
};
export const firebaseApp = firebase.initializeApp(config);
export const users = firebaseApp.database().ref().child('users');
export const userdata = firebaseApp.database().ref().child('userdata');