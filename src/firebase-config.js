import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCklXqejW5AFerJCbHFbJEzjZ_J2H6Dp-s',
	authDomain: 'blog-backend-2d425.firebaseapp.com',
	projectId: 'blog-backend-2d425',
	storageBucket: 'blog-backend-2d425.appspot.com',
	messagingSenderId: '44545276387',
	appId: '1:44545276387:web:a547ab70ee81798012c8d6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
