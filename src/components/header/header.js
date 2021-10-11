import React, { Component } from "react";
import swal from "sweetalert";
import { withRouter, Link } from "react-router-dom";

class Header extends Component {

  Logout = () => {
    swal("Are your sure SignOut?", {
      buttons: {
        nope: {
          text: "Let me back",
          value: "nope"
        },
        sure: {
          text: "I'm, Sure",
          value: "sure"
        }
      }
    }).then(value => {
      switch (value) {
        case "sure":
          swal(" SignOut Successfully", "success").then(val => {
            localStorage.removeItem("TOKEN_KEY");
            return this.props.history.push("/login");
          });
          break;
        case "nope":
          swal("Ok", "success");
          break;
        default:
          swal("Got away safely!");
      }
    });
  };
  
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-widget="pushmenu" to="#">
              <i className="fas fa-bars" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="../../index3.html" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="#" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
        {/* SEARCH FORM */}
        <form className="form-inline ml-3">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Messages Dropdown Menu */}
          {/* Notifications Dropdown Menu */}

          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to="#">
              <i className="far fa-user" />
            </Link>

            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">menu</span>
              <div className="dropdown-divider" />
              <Link to="/profile" className="dropdown-item">
                <i className="fas fa-user-alt mr-2" /> Update Profile
              </Link>
              <div className="dropdown-divider" />
              <Link
                to="#"
                onClick={() => this.Logout()}
                className="dropdown-item"
              >
                <i className="fas fa-sign-out-alt mr-2" /> Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Header);
