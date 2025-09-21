import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'

const LoginPopup = ({ setShowLogin, setIsLogin }) => {

    const [currentState, setCurrentState] = useState("Login")
    const onLogin = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const email = form.get("email");
        const password = form.get("password");
        if (currentState === "Login") {
            try {
                const response = await axios.post("http://localhost:5000/api/auth/login", {
                    email,
                    password
                });
                if (response.data?.token) {
                    sessionStorage.setItem("token", response.data.token);
                }
                alert("Login successful");
                setShowLogin(false);
                setIsLogin(true);
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Login failed");
                }
                console.log("Login error: ", error);
            }
            
        } else {
            const phone = form.get("phone");
            const name = form.get("name");

            try {
                const response = await axios.post("http://localhost:5000/api/auth/register", {
                    name,
                    phone,
                    email,
                    password
                });
                if (response.data?.token) {
                    sessionStorage.setItem("token", response.data.token);
                }
                alert("User registration successful");
                setShowLogin(false);
                setIsLogin(true);
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Registration failed: ");
                }
                console.log("Error: ", error);
            }
        }

    }

    return (
        <div className='login'>
            <form onSubmit={onLogin} className='popup-container'>
                <div className="popup-title">
                    {currentState === "Login"?<h2>Login</h2>:<h2>Register</h2>}
                    <img onClick={() => setShowLogin(false)} src={assets.cross} alt="" />
                </div>
                <div className="popup-input">
                    {currentState !== "Login" && (
                        <>
                            <input type="text" name="name" placeholder='Name' required />
                            <input type="number" name="phone" placeholder='Phone number' required />
                        </>
                    )}
                    <input type="email" name="email" placeholder='Email' required />
                    <input type="password" name='password' placeholder='Password' required />
                </div>
                <div className="popup-condition">
                    {currentState !== "Login" && (
                        <>
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the Terms of use & Privacy Policy</p>
                        </>
                    )}
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                {currentState === "Login" ?
                    (<p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>)
                    :
                    (<p>Already a user? <span onClick={() => setCurrentState("Login")}>Login here</span></p>)
                }
            </form>
        </div>
    )
}

export default LoginPopup;