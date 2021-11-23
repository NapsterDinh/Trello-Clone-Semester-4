import React, { useState } from "react";
import "./formForgotPass.scss";
import { useIntl } from "react-intl";
import messages from "app/core/msg/forgotpass";

import { useHistory } from "react-router-dom";
import { forgot } from "app/core/apis/forgot";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { OverlayTrigger,Tooltip } from 'react-bootstrap'
import { showNotification, type } from "utilities/component/notification/Notification";


const FormForgotPass = (props) => {
    const [validationMsg, setValidationMsg] = useState({});
    const { formatMessage } = useIntl();
    const history = useHistory();
    const [reset, setData] = useState({
      email: "",
    });

    const [ isDisabled, setIsDisabled ] = useState(false)

    const { modalLoading } = props
  
    const onHandleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      let dataChange = { ...reset };
      dataChange[name] = value;
      setData(dataChange);
    };
  
    const validateAll = () => {
      const msg = {};
      if (isEmpty(reset.email)) {
        msg.email = formatMessage(messages.inputemail);
      } else if (!isEmail(reset.email)) {
        msg.email = formatMessage(messages.verifyemail);
      }
      setValidationMsg(msg);
      if (Object.keys(msg).length > 0) return false;
      return true;
    };
    const { email } = reset;
  
    const onHandleForgot = async (event) => {
      event.preventDefault();
      const isValid = validateAll();
      if (!isValid) return;
      else {
        modalLoading(true)
        setIsDisabled(true)
        const res = await forgot({ email });
        if (res && res.data) {
          modalLoading(false)
          showNotification("Forgot Pass Successfully",'We have sent to you a verification email. Please check your email to finish reset password',
          type.succsess, 5000 )
          setTimeout(() => {
            history.push('/login')
          }, 5000);
        } else {
          modalLoading(false)
          showNotification("Forgot Pass failed",res.data.msg,
          type.danger, 5000 )
          setIsDisabled(false)
        }
      }
    };

  return (
    <div className="forgot form-container">
        <a href="/login" className="arrow-prev">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a>
        <div className="title"> {formatMessage(messages.forgotpass)}</div>
        <div className="fields">
          <div className={ !validationMsg.email ? "forgotPass input" : "forgotPass input error"}>
            <input
              type="username"
              className="user-input"
              placeholder="Email"
              value={reset.email}
              name="email"
              onChange={onHandleChange}
            />
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-3">{validationMsg.email}</Tooltip>}
              >
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
              </OverlayTrigger>
          </div>
          
          <button disabled={isDisabled} className="Verify-button form-btn" onClick={onHandleForgot}>
            {formatMessage(messages.verify)}
          </button>
        </div>
      </div>
  );
};

export default FormForgotPass;
