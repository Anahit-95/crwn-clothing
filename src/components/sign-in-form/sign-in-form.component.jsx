import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES} from "../button/button.component";

import { 
    signInAuthUserWithEmailAndPassword, 
    signInWithGooglePopup 
} from "../../utils/firebase/firebase.utils";

import {SignInContainer, ButtonsContainer} from './sign-in-form.styles.jsx';

const defaultFormField = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { email, password } = formField;
    
    const resetFormFields = () => {
        setFormField(defaultFormField);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
            resetFormFields();
        } 
        catch(error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert('Incorrect password for email.');
                    break
                case "auth/user-not-found":
                    alert('No user associeted with this email.');
                    break;
                default:
                    console.log(error);
            }
        }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({...formField, [name]: value})
    }
    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    inputOptions = {{
                        type: 'email', 
                        required: true,
                        onChange: handleChange,
                        name: 'email',
                        value: email,
                    }}
                />

                <FormInput
                    label="Password"
                    inputOptions = {{
                        type: 'password',
                        required: true, 
                        onChange: handleChange,
                        name: 'password',
                        value: password,
                    }}
                />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;
