import React, { useState } from 'react';
import firebase from '../../../Services/Firebase';
import { signInSuccess, signInFailed } from '../../../Actions/AuthActions';
import { connect } from 'react-redux';
import './Login.css';

const mapDispatchToProps = (dispatch) => {
    return {
        signInSuccess: click => dispatch(signInSuccess()),
        signInFailed: click => dispatch(signInFailed())
    };
}

function Login (props) {

    const [email, setEmail] = useState("");;
    const [validEmail, setEmailValidity] = useState(false);;
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState("");

    function googleLoginClicked(){
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            let user = result.user;
            console.log(user);
            props.signInSuccess();
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // props.signInFailed(errorMessage);
            setValidationError(errorMessage);
            console.log(errorCode);
          });
        console.log("Google Clicked")
    }

    function emailUsernameLogin(e){
        e.preventDefault();
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( res => {
            console.log(res);
            console.log("Successful");
            props.signInSuccess();

        })
        .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorMessage)
            // props.signInFailed(errorMessage);
            setValidationError(errorMessage);
            // ...
          });
        console.log("email Username clicked");
    }

    function validateEmail(){
        console.log("validatee")
    }

    function renderError() {
        if(validationError){
            return(
                <h5 className="login-error"> <small> {validationError} </small></h5>
            )
        }
        // if(props.authFailed){
        //     return (
        //         <h5 className="login-error"> <small> Error Please Try Again </small></h5>
        //     )
        // }
    }

    return(
        <div className="row no-gutters">
            <div className="col-md-12 no-gutters">
                <div className="left-side d-flex justify-content-center align-items-center">
                    <div className="login">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign In </h3>
                                {renderError()}
                                <div className="d-flex justify-content-end social_icon">
                                    {/* <span><i className="fa fa-facebook-square"></i></span> */}
                                    <span onClick={() => googleLoginClicked()}><i className="fa fa-google-plus-square"></i></span>
                                    {/* <span><i className="fa fa-twitter-square"></i></span> */}
                                </div>
                            </div>
                            <div className="card-body">
                                <form>
                                    {/* {validEmail ? null : <h5 className="login-error"> <small> Not a valid email </small></h5>} */}
                                    <div className="input-group form-group">
                                        <div className={validEmail ? "input-group-prepend" : "input-group-prepend error"}>
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input type="text" value={email} onBlur={e => validateEmail()} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="email" /> 
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-key"></i></span>
                                        </div>
                                        <input type="password" value={password} onChange={e => {setPassword(e.target.value)}}  className="form-control" placeholder="password" />
                                    </div>
                                    {/* <div className="row align-items-center remember">
                                        <input type="checkbox">Remember Me </input>
                                    </div> */}
                                    <div className="form-group" onClick={(e) => emailUsernameLogin(e)}>
                                        <input type="submit" value="Login" className="btn float-right login_btn" />
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<a href="/SignUp">Sign Up</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a href="/For,lpgot">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Login);