import { 
    singInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sing-up-form/sing-up-form.component";

const SignIn = () => {    
    const logGoogleUser = async () => {
        const {user} = await singInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
  
    return (
        <div>
            <h1> Sign in Page</h1>
            <button onClick={logGoogleUser}> Sign in with Google Popup</button>
            <SignUpForm/>.            
        </div>
    );
}

export default SignIn;