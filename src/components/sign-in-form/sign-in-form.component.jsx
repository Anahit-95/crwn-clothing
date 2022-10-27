import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';

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
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
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
        <div className="sign-up-container">
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
