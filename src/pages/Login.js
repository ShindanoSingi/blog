import React from 'react';
import {auth, googleAuthProvider} from '../firebase-config';
import { signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = ({setIsAuth}) => {

	const navigate = useNavigate();

	const signUpWithGoogle = () => {
		signInWithPopup(auth, googleAuthProvider)
			.then((result) => {
				localStorage.setItem('auth', true);
				setIsAuth(true);
				navigate('/');
			})
	}

	return (
		<div className="container">
			<div className="card mt-5 text-center">
				<div className="card-body">
					<p className="display-6 mt-3">Sign in with Google</p>
                              <button className='btn btn-dark' onClick={signUpWithGoogle}>
                                    Google
                              </button>
				</div>
			</div>
		</div>
	);
};

export default Login;
