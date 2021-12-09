import React, { useState } from "react";
import "./formRegister.scss";
import { useIntl } from "react-intl";
import messages from "app/core/msg/register";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { signup } from "app/core/apis/signup";
import { showNotification, type } from "utilities/component/notification/Notification";

const FormRegister = (props) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [validationMsg, setValidationMsg] = useState({});

  const [isDisabled, setIsDisabled] = useState(false);

  const [user, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { modalLoading } = props;

  const { name, email, password } = user;

  const onHandleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    let dataChange = { ...user };
    dataChange[name] = value;
    setData(dataChange);
  };

  const validateAll = () => {
    const msg = {};
    if (isEmpty(user.email)) {
      msg.email = formatMessage(messages.verifyemail);
    } else if (!isEmail(user.email)) {
      msg.email = formatMessage(messages.inputemail);
    }
    if (isEmpty(user.name)) {
      msg.name = formatMessage(messages.inputname);
    }

    if (isEmpty(user.password)) {
      msg.password = formatMessage(messages.inputpass);
    } else if (user.password.length < 6)
      msg.password = formatMessage(messages.verifypass);

    if (isEmpty(user.confirm)) {
      msg.confirm = formatMessage(messages.inputconfirm);
    } else if (user.password !== user.confirm)
      msg.confirm = formatMessage(messages.verifyconfirm);

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const onHandleSignUp = async (event) => {
    event.preventDefault();
    try {
      const isValid = validateAll();
      if (!isValid) {
        return;
      } else {
        modalLoading(true);
        setIsDisabled(true);
        const res = await signup({ name, email, password });
        if (res && res.data.result && res.status == 200) {
          // dispatch(getTokenReducer(res.data.data.token));
          // setApiRequestToken(res.data.data.token.access.token);
          modalLoading(false);
          showNotification(
            "Register sucessfully",
            "We have sent to you a verification email. Please check your email to finish register!!!",
            type.succsess,
            5000
          );
          setTimeout(() => {
            history.push("/login");
          }, 5000);
        } else {
          modalLoading(false);
          switch (res.data.msg) {
            case "Email is already taken":
              setValidationMsg({
                ...validationMsg,
                email: res.data.msg,
              });
              break;

            default:
              showNotification("Register error", res.data.msg, type.danger, 5000);
              break;
          }
          setIsDisabled(false);
        }
      }
    } catch (error) {
      modalLoading(false);
      showNotification("Register error", error.message, type.danger, 5000);
          setIsDisabled(false);
    }
    
  };

  return (
    <div className="signup-div form-container">
      <a href="/login" className="arrow-prev">
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
      </a>
      <div className="title">{formatMessage(messages.signup)}</div>
      <div className="fields">
        <form onSubmit={onHandleSignUp}>
          <div
            className={
              !validationMsg.name ? "username input" : "username input error"
            }
          >
            <input
              type={formatMessage(messages.userName)}
              className="user-input"
              placeholder={formatMessage(messages.userName)}
              value={user.name}
              name="name"
              onChange={onHandleChange}
            />
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="button-tooltip-1">{validationMsg.name}</Tooltip>
              }
            >
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            </OverlayTrigger>
          </div>
          <div
            className={
              !validationMsg.email ? "email input" : "email input error"
            }
          >
            <input
              type="email"
              className="user-input"
              placeholder={formatMessage(messages.email)}
              value={user.email}
              name="email"
              onChange={onHandleChange}
            />
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="button-tooltip-2">{validationMsg.email}</Tooltip>
              }
            >
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            </OverlayTrigger>
          </div>
          <div
            className={
              !validationMsg.password
                ? "password input"
                : "password input error"
            }
          >
            <input
              type="password"
              className="pass-input"
              placeholder={formatMessage(messages.passWord)}
              value={user.password}
              name="password"
              onChange={onHandleChange}
            />
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="button-tooltip-3">
                  {validationMsg.password}
                </Tooltip>
              }
            >
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            </OverlayTrigger>
          </div>
          <div
            className={
              !validationMsg.confirm ? "confirm input" : "confirm input error"
            }
          >
            <input
              type="password"
              className="pass-input"
              placeholder={formatMessage(messages.confirm)}
              value={user.confirm}
              name="confirm"
              onChange={onHandleChange}
            />
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="button-tooltip-3">{validationMsg.confirm}</Tooltip>
              }
            >
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            </OverlayTrigger>
          </div>
          <button disabled={isDisabled} className="signin-button form-btn">
            {formatMessage(messages.signup)}
          </button>
          <div className="link">
            <a href="/login">{formatMessage(messages.gotologin)}</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegister;
