import React from 'react'
import "./Login.css"
import { Button } from "@material-ui/core";
import { auth, authProvider } from "./firebase";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(authProvider).then(result =>
            console.log(result)).catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp Rooms</h1>
                </div>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
