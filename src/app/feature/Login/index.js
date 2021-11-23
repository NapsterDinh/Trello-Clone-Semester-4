import React, { useState } from "react";
import "./login.scss";
import { Switch, Route } from "react-router-dom";

import  HeaderLogin  from 'app/base/HeaderLogin/headerLogin';
import  Footer  from 'app/base/Footer/footer';
import FormLogin from "app/base/Form/FormLogin/formLogin";
import FormForgotPass from "app/base/Form/FormForgotPass/formForgotPass";
import FormRegsiter from "app/base/Form/FormRegister/formRegister";
import ResetPass from "app/base/Form/FormResetPass/formResetPass";

import LoadingOverlay from 'react-loading-overlay';

const LoginPage = () => {
  const [ isActive, setIsActive ] = useState(false)

  const [ content, setContent ] = useState('')

  const configLoadingModal = (isOn, content='Please wait a second...') => 
  {
    setIsActive(isOn)
    setContent(content)
  }

  return (
    <>
          <Switch> 
            <Route path="/login" render={props => <HeaderLogin {...props} pagination="LOGIN" />} />;
            <Route path="/register" render={props => <HeaderLogin {...props} pagination="REGISTER" />} />
            <Route path="/forgot_password" render={props => <HeaderLogin {...props} pagination="FORGOT PASSWORD" />} />
            <Route path="/reset/:token"render={props => <HeaderLogin {...props} pagination="RESET PASSWORD" />} />
          </Switch>
            <section class="section section-lg dark bg-dark section-middle">
              {
                isActive &&
                <LoadingOverlay
                  active={isActive}
                  spinner
                  text={content}
                  >
                  <p>Some content or children or something.</p>
                </LoadingOverlay>
              }
                <div class="bg-image bg-fixed">
                  <img src="" alt=""></img>
                </div>
            <Switch> 
              <Route path="/login" render={props => <FormLogin {...props} modalLoading={configLoadingModal} />} />;
              <Route path="/register" render={props => <FormRegsiter {...props} modalLoading={configLoadingModal} />} />
              <Route path="/forgot_password" render={props => <FormForgotPass {...props} modalLoading={configLoadingModal} />} />
              <Route path="/reset/:token" render={props => <ResetPass {...props} modalLoading={configLoadingModal} />} />
            </Switch>
            </section>
            <Footer/>
    </>
  );
};
export default LoginPage;
