import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import _ from "lodash";
import Rodal from "rodal";

import Layout from "../../components/Layout/Layout";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);

    this.state = {
      email: "",
      password: "",
      active: "login"
    };
  }

  handleEmail(event) {
    const email = event.target.value;
    this.setState({ email });
  }

  handlePass(event) {
    const password = event.target.value;
    this.setState({ password });
  }

  render() {
    const { active } = this.state;
    const formData = [
      { title: "Username:", placeholder: "Enter your username" },
      { title: "Email:", placeholder: "Enter your email" },
      { title: "Password:", placeholder: "Type your password" },
      { title: "*Password:", placeholder: "Retype your password" }
    ];

    const formData2 = [
      { title: "Username:", placeholder: "Enter your username" },
      { title: "Password:", placeholder: "Type your password" }
    ];

    return (
      <Layout activeRoute={3} user={this.props.user}>
        <div className="loginContainer">
          <div
            className="loginBox"
            style={{ height: active === "login" ? 240 : 400 }}
          >
            <div className="loginButtonBox">
              <button
                className="loginBtn"
                onClick={() => this.setState({ active: "login" })}
              >
                <p
                  className="loginText"
                  style={{ opacity: active === "login" ? 1 : 0.3 }}
                >
                  LOGIN
                </p>
              </button>
              <button
                className="loginBtn"
                onClick={() => this.setState({ active: "signup" })}
              >
                <p
                  className="loginText"
                  style={{ opacity: active === "signup" ? 1 : 0.3 }}
                >
                  SIGNUP
                </p>
              </button>
            </div>
            <div className="loginCard">
              <div className="loginInfoBox">
                <p className="loginTitle">{`Complete your ${active} information:`}</p>
                <div className="loginForm">
                  {(active === "signup" ? formData : formData2).map(
                    (item, key) => {
                      const isLast =
                        key ===
                        (active === "signup" ? formData : formData2).length - 1;
                      return (
                        <div
                          className="loginRow"
                          style={{
                            borderBottomStyle: isLast ? "none" : "solid"
                          }}
                          key={item.title}
                        >
                          <div className="formTextBox">
                            <p className="formText">{item.title}</p>
                          </div>
                          <input
                            type={
                              item.title.includes("Password")
                                ? "password"
                                : "text"
                            }
                            //   value={this.props.value}
                            //   onChange={this.handleChange}
                            placeholder={item.placeholder}
                            className="formBox"
                          ></input>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="submitBtnBox">
                <button
                  className="submitBtn"
                  onClick={() => alert("Accounts coming soon!")}
                >
                  <p className="submitBtnText">
                    {active.charAt(0).toUpperCase() + active.slice(1)}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;
