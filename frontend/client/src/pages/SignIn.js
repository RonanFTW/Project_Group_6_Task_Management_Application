import React, {useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SignIn = () => {
    const [id, retid] = useState('');
    const [pw, retpw] = useState('');

    const enter = (event) => {
        event.preventDefault();
        console.log("WE HAVE A BREACH, CLOSE THE GATES");
        retid('');
        retpw('');
    };
    return (
        <div className="content">
            <Header/>
            <div className="main">
                <h1>Sign in here!</h1>
                <form onSubmit={enter}>
                    <label>User ID
                    <input type="text" value={id} required
                        onChange={(event) => retid(event.target.value)}></input>
                    </label>
                    <label>Password
                    <input type="text" value={pw} required
                        onChange={(event) => retpw(event.target.value)}></input>
                    </label>
                    <button type="submit">Welcome Back!</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};
export default SignIn;
