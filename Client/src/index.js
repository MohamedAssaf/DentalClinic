import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RootReducer from './Reducers/rootReducer.js';
import 'font-awesome/css/font-awesome.min.css';

// ENHANCING STORE WITH FIREBASE
// import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./Services/Firebase";
// const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
//   createStore
// );
const store = createStore(
  RootReducer,
  {},
  applyMiddleware(thunk)
);

// const rrfProps = {
//   firebase,
//   // config: rrfConfig,
//   dispatch: store.dispatch
//   // createFirestoreInstance // <- needed if using firestore
// }

// const store = createStore(RootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
      {/* <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider> */}
      <App />
    </Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
