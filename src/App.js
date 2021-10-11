import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Profile from './components/profile';
// import Passwordreset from './components/passwordreset';
// import Passwordforgot from './components/passwordforgot';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Handle Auth State
// Check if User is Logged In
const isLoggedIn = () => {
  return localStorage.getItem('TOKEN_KEY') != null;
};

// Protected Route (Create a Secured Route)
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition

      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
export default class App extends Component {
  // Prevent Logged In User from Visiting the Login Page
  // componentDidMount() {
    // if (localStorage.getItem('TOKEN_KEY') != null) {
      // console.log(this.props.history);
      // return this.props.history.goBack();
    // }
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('update');
  }

  render() {
    // const {pathname} = this.props.location;
    return (
      <Router>
        <Switch>
          <div>
            {isLoggedIn() && <Header />}
            {isLoggedIn() && <Sidebar />}
            <Route path="/register" exact component={Register} />
            <Route path="/login/:notify?" component={Login} />
            {/* <Route path="/password/reset/:token" component={Passwordreset} /> */}
            {/* <Route path="/password/forgot" component={Passwordforgot} /> */}
            <SecuredRoute path="/dashboard" component={Dashboard} />
            <SecuredRoute path="/profile" component={Profile} />
            <Route path="/" exact component={Login} />
            {isLoggedIn() && <Footer />}
          </div>
        </Switch>
      </Router>
    );
  }
}
