import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signInUser } from '../api/Api'; 

const SignIn = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const enter = async (event) => {
        event.preventDefault();
        try {
            console.log('Attempting sign-in...');
            const response = await signInUser({ username: id, password: pw });
            console.log('Sign-in successful:', response);
            alert('Welcome back!');
        } catch (error) {
            console.error('Sign-in failed:', error);
            alert('Invalid username or password. Please try again.');
        } finally {
            setId(''); // Clear input 
            setPw('');
        }
    };

    return (
        <div className="content">
            <Header />
            <div className="main">
                <h1>Sign in here!</h1>
                <form onSubmit={enter}>
                    <label>
                        User ID
                        <input
                            type="text"
                            value={id}
                            required
                            onChange={(event) => setId(event.target.value)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password" 
                            value={pw}
                            required
                            onChange={(event) => setPw(event.target.value)}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;
