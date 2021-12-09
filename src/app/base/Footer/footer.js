import React, { useState, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl';

import './footer.scss'
import messages from 'app/core/msg/header.js';

function Footer() {
    
    const { formatMessage } = useIntl();

    return (
        <footer id="footer" className="bg-dark dark">
                <div className="container">
                    {/* <!-- Footer 1st Row --> */}
                    <div className="footer-first-row row">
                        <div className="col-lg-3 text-center">
                            <a href="index.html"><img src="/logo-light.svg" alt="" width="88" className="mt-5 mb-5"></img></a>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h5 className="text-muted">{formatMessage(messages.footer_lastNews)}</h5>
                            <ul className="list-posts">
                                <li>
                                    <a href="blog-post.html" className="title">How to create effective web design ?</a>
                                    <span className="date">February 14, 2015</span>
                                </li>
                                <li>
                                    <a href="blog-post.html" className="title">Awesome weekend in Polish mountains!</a>
                                    <span className="date">February 14, 2015</span>
                                </li>
                                <li>
                                    <a href="blog-post.html" className="title">How to create effective web design ?</a>
                                    <span className="date">February 14, 2015</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5 col-md-6">
                            <h5 className="text-muted">{formatMessage(messages.footer_subcribeUs)}</h5>
                            {/* <!-- MailChimp Form --> */}
                            <form action="" id="sign-up-form" className="sign-up-form validate-form mb-5" method="POST">
                                <div className="input-group">
                                    <input name="EMAIL" id="mce-EMAIL" type="email" className="form-control error" placeholder="Tap your e-mail..." required="" aria-invalid="true" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-primary btn-submit" type="submit">
                                            <span className="description">{formatMessage(messages.footer_subcribe)}</span>
                                            <span className="success">
                                                <svg x="0px" y="0px" viewBox="0 0 32 32">
                                                    <path fill="none" stroke="#FFFFFF" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"></path></svg>
                                            </span>
                                            <span className="error">{formatMessage(messages.footer_TryAgain)}</span>
                                        </button>
                                    </span>
                                </div>
                            </form>
                            <h5 className="text-muted mb-3">{formatMessage(messages.footer_socialMedia)}</h5>
                            <a href="www.fb.com/kingj812" className="icon icon-social icon-circle icon-sm icon-facebook">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.instagram.com/jking_812/" className="icon icon-social icon-circle icon-sm icon-google">
                                <i className="fa fa-google" aria-hidden="true"></i>
                            </a>
                            <a href="www.twitter.com/@VNeseRiven" className="icon icon-social icon-circle icon-sm icon-twitter">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.youtube.com/channel/UCricgcrkz4xn9KjuoBBInmw" className="icon icon-social icon-circle icon-sm icon-youtube">
                                <i className="fa fa-youtube-play" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.instagram.com/jking_812/" className="icon icon-social icon-circle icon-sm icon-instagram">
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    {/* <!-- Footer 2nd Row --> */}
                    <div className="footer-second-row">
                        <span className="text-muted">{formatMessage(messages.footer_copyRight)}</span>
                    </div>
                </div>
                {/* <!-- Back To Top --> */}
                <a type="button" href="#header" id="back-to-top" className="back-to-top visible"><i className="ti ti-angle-up"></i></a>

            </footer>
    );
}

export default Footer;
