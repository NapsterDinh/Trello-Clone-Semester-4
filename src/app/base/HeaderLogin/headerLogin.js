import React from 'react'
import { Container , Row, Col} from 'react-bootstrap'

import './headerLogin.scss'

function HeaderLogin(props)
{
    const { pagination } = props

    return (
        <header id="header" className="light header-login">
                <Container className="header-container-inner">
                    <Row>
                        <Col md="3">
                            <div className="module module-logo dark">
                                <a href="/">
                                    <img src="/logo-light.svg" alt="" width="88"></img>
                                </a>
                            </div>
                        </Col>
                        <Col md="9">
                            <div className="pagination-container">
                                <h3>
                                    {
                                        pagination === 'LOGIN' && "Login"
                                    }
                                    {
                                        pagination === 'REGISTER' && "Register"
                                    }
                                    {
                                        pagination === 'FORGOT PASSWORD' && "Forgot Password"
                                    }
                                    {
                                        pagination === 'RESET PASSWORD' && "Reset Password"
                                    }
                                </h3>
                            </div>
                            <div className="help-container">
                                <a className="link-to-help" href="/">Need to help ?</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>
    )
}

export default HeaderLogin