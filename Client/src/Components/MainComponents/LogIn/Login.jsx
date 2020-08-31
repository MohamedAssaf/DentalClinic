import React, { useState } from 'react';
import firebase from '../../../Services/Firebase';
import { signInSuccess } from '../../../Actions/AuthActions';
import { connect } from 'react-redux';
import './Login.css';

const mapDispatchToProps = (dispatch) => {
    return {
        signInSuccess: click => dispatch(signInSuccess()),
    };
}

function Login (props) {

    const [email, setEmail] = useState("");;
    const [password, setPassword] = useState("");

    function googleLoginClicked(){
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            props.signInSuccess();
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
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
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        console.log("email Username clicked");
    }

    return(
        <div className="row no-gutters">
            <div className="col-md-12 no-gutters">
                <div className="left-side d-flex justify-content-center align-items-center">
                    <div className="login">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign In </h3>
                                <div className="d-flex justify-content-end social_icon">
                                    {/* <span><i className="fa fa-facebook-square"></i></span> */}
                                    <span onClick={() => googleLoginClicked()}><i className="fa fa-google-plus-square"></i></span>
                                    {/* <span><i className="fa fa-twitter-square"></i></span> */}
                                </div>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="username" /> 
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