import React, { useState} from "react";
import "./formResetPass.scss";
import { useIntl } from "react-intl";
import messages from "app/core/msg/resetpass";

import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import { setApiRequestToken } from "utilities/apis/configuration";
import { resetPass } from "app/core/apis/resetPass";
import { OverlayTrigger,Tooltip } from 'react-bootstrap'

import { showNotification, type } from "utilities/component/notification/Notification";

const FormResetPass = (props) => {
    const { formatMessage } = useIntl();
    const history = useHistory();
    const { token } = useParams();
    const [validationMsg, setValidationMsg] = useState({});
    const [reset, setData] = useState({
      password: "",
      confirm: "",
    });

    const [ isDisabled, setIsDisabled ] = useState(false)
    const { password } = reset;

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
  
      if (isEmpty(reset.password)) {
        msg.password = formatMessage(messages.inputpass);
      } else if (reset.password.length < 6) {
        msg.password = formatMessage(messages.verifypass);
      }
  
      if (isEmpty(reset.confirm)) {
        msg.confirm = formatMessage(messages.inputconfirm);
      } else if (reset.password !== reset.confirm) {
        msg.confirm = formatMessage(messages.verifypass);
      }
  
      setValidationMsg(msg);
      if (Object.keys(msg).length > 0) return false;
      return true;
    };
  
    const onHandleReset = async (event) => {
      event.preventDefault();
      const isValid = validateAll();
      if (!isValid) return;
      else {
        setIsDisabled(true)
        modalLoading(true)
        setApiRequestToken(token);
        const res = await resetPass({ password });
        if (res && res.data.result) {
          modalLoading(false)
          showNotification("Reset Password Successfully",'Now you can log in with new password!!!',
          type.succsess, 5000 )
          setTimeout(() => {
            history.push('/login')
          }, 5000);
        } else {
          modalLoading(false)
          showNotification("Reset Pass failed",res.data.msg,
          type.danger, 5000 )
          setIsDisabled(false)
        }
      }
    };

  return (
    <div className="reset form-container">
        <div className="title"> {formatMessage(messages.resetpass)}</div>
        <div className="fields">
          <div className={ !validationMsg.password ? "password input" : "password input error"}>
            <input
              type="password"
              className="pass-input"
              placeholder={formatMessage(messages.pass)}
              value={reset.password}
              name="password"
              onChange={onHandleChange}
            />
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-3">{validationMsg.password}</Tooltip>}
              >
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
              </OverlayTrigger>
          </div>
          <div className={ !validationMsg.confirm ? "confirm input" : "confirm input error"}>
            <input
              type="password"
              className="confirm-input"
              placeholder={formatMessage(messages.confirm)}
              value={reset.confirm}
              name="confirm"
              onChange={onHandleChange}
            />
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-3">{validationMsg.confirm}</Tooltip>}
              >
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
              </OverlayTrigger>
          </div>
          
          <button className="Verify-button form-btn" onClick={onHandleReset}>
            {formatMessage(messages.verify)}
          </button>
        </div>
      </div>
  );
};

export default FormResetPass;
