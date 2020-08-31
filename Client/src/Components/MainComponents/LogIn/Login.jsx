import React from 'react';
import './Login.css';

function Login () {
    return(
        <div className="row no-gutters">
            <div className="col-md-6 no-gutters">
                <div className="left-side d-flex justify-content-center align-items-center">
                    <div className="login">
                        <div class="card">
                            <div class="card-header">
                                <h3>Sign In </h3>
                                <div class="d-flex justify-content-end social_icon">
                                    <span><i class="fa fa-facebook-square"></i></span>
                                    <span><i class="fa fa-google-plus-square"></i></span>
                                    <span><i class="fa fa-twitter-square"></i></span>
                                </div>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-user"></i></span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="username" /> 
                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-key"></i></span>
                                        </div>
                                        <input type="password" class="form-control" placeholder="password" />
                                    </div>
                                    {/* <div class="row align-items-center remember">
                                        <input type="checkbox">Remember Me </input>
                                    </div> */}
                                    <div class="form-group">
                                        <input type="submit" value="Login" class="btn float-right login_btn" />
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-center links">
                                    Don't have an account?<a href="/SignUp">Sign Up</a>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <a href="/Forgot">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 no-gutters">
                <div className="right-side d-flex justify-content-center align-items-center">
                    Please Log In to start using KMDC's App
                </div>
            </div>
        </div>
    )
}

export default Login;