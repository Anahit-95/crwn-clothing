import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn





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