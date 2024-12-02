import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signUpUser } from '../api/Api'; 

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const addAccount = async (event) => {
        event.preventDefault();
        try {
            console.log('Attempting sign-up...');
            const response = await signUpUser({ username, password });
            console.log('Sign-up successful:', response);
            alert('Account created successfully! You can now sign in.');
        } catch (error) {
            console.error('Sign-up failed:', error);
            alert(error.response?.data?.error || 'Sign-up failed. Please try again.');
        } finally {
            setUsername(''); // Clear input 
            setPassword('');
        }
    };

    return (
        <div className="content">
            <Header />
            <div className="main">
                <h1>Sign Up Here!</h1>
                <form onSubmit={addAccount}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            required
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password" 
                            value={password}
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                    <button type="submit">Make Account</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};
export default SignUp;