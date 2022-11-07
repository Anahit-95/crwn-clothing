import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {AuthenticationContainer} from './authentification.styles.jsx';

const Authentication = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication





// Sign in with redirect version

// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
// import { 
//     auth,
//     createUserDocumentFromAuth,
//     signInWithGoogleRedirect,
// } from "../../utils/firebase/firebase.utils";

// const SignIn = () => {
//     useEffect(() => {
//         logGoogleRedirectUser();
//     }, []);

//     const logGoogleRedirectUser = async () => {
//         const response = await getRedirectResult(auth);
//         if (response) {
//             const userDocRef = await createUserDocumentFromAuth(response.user)
//         }
//     }

//     return (
//         <div>
//             <h1>Sign in Page</h1>
//             <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
//         </div>
//     )
// }

// export default SignIn