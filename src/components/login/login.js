import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';
// import ReCaptcha from 'react-google-recaptcha';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'username is Too Short!')
    .max(50, 'username is Too Long!')
    .required('Username is Required'),
  recaptcha: Yup.string().required(),
  password: Yup.string().required('Password is required'),
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
    };
  }

  initilizeRecaptcha = (async) => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };

  componentDidMount() {
    if (localStorage.getItem('TOKEN_KEY') != null) {
      return this.props.history.push('/dashboard');
    }
    let notify = this.props.match.params['notify'];
    if (notify !== undefined) {
      if (notify === 'error') {
        swal('Activation Fail please try again !', '', 'error');
      } else if (notify === 'success') {
        swal('Activation Success your can login !', '', 'success');
      }
    }
    this.initilizeRecaptcha();
  }

  onChange(value) {
    console.log('Captcha value:', value);
  }

  submitForm = (values, history) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, values)
      .then((res) => {
        if (res.data.result === 'success') {
          localStorage.setItem('TOKEN_KEY', res.data.token);
          swal('Success!', res.data.message, 'success').then((value) => {
            history.push('/dashboard');
          });
        } else if (res.data.result === 'error') {
          swal('Error!', res.data.message, 'error');
        }
      })
      .catch((error) => {
        console.log(error);
        return swal('Error!', error.message, 'error');
      });
  };
  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group input-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            className="form-control"
            placeholder="Username"
            className={
              errors.username && touched.username
                ? 'form-control is-invalid'
                : 'form-control'
            }
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user"></span>
            </div>
          </div>
          {errors.username && touched.username ? (
            <small id="passwordHelp" className="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group input-group mb-3 has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className="form-control"
            placeholder="Password"
            className={
              errors.password && touched.password
                ? 'form-control is-invalid'
                : 'form-control'
            }
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>
        {/* <div className="form-group">
          <label>Recaptcha Validation</label>
          <ReCaptcha
            sitekey={`${process.env.REACT_APP_RECAPTCHA_KEY}`}
            onChange={this.onChange}
          />
          {errors.recaptcha && touched.recaptcha && <p>{errors.recaptcha}</p>}
        </div> */}
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">&nbsp; Remember Me</label>
            </div>
          </div>
          <div className="col-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    );
  };

  render() {
    return (
      <div className="login-page">
        <div className="register-box">
          <div className="register-logo">
            <a href="../../index2.html">
              <b>Invoice</b>POS
            </a>
          </div>
          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(values, this.props.history);
                  setSubmitting(false);
                }}
                validationSchema={LoginSchema}
              >
                {/* {this.showForm()}            */}
                {(props) => this.showForm(props)}
              </Formik>
              <p className="mb-1">
                <Link to="/password/forgot">I forgot my password</Link>
              </p>
              <p className="mb-0">
                <Link to="/register">Register a new membership</Link>
              </p>
            </div>
            {/* /.form-box */}
          </div>
          {/* /.card */}
        </div>
      </div>
    );
  }
}

export default Login;
