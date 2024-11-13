import React, {useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SignUp = () => {
    const [username, addusername] = useState('');
    const [password, addpassword] = useState('');

    const addacc = (event) => {
        event.preventDefault();
        //handling for ensuring no duplicate account name, id, and password when we have that set up
        console.log("New account added!")
        addusername('');
        addpassword('');
    };
    return (
        <div className="content">
            <Header/>
            <div className="Main">
                <h1>Sign Up Here!</h1>
                <form onSubmit={addacc}>
                    <label>Username:
                        <input type="text" value={username} required
                        onChange={(event) => addusername(event.target.value)}></input>
                    </label>
                    <label>Password:
                    <input type="text" value={password} required
                        onChange={(event) => addpassword(event.target.value)}></input>
                    </label>
                    <button type="submit">Make Account</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};
export default SignUp;
