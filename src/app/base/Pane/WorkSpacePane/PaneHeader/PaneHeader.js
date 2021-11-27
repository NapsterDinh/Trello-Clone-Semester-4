import React from "react";
import logo  from 'app/Images/features/1.jpg'
import './PaneHeader.scss'

const PaneHeader =  () => 
{
    return(
        <div className="tabbed-pane-header">
            <div className="tabbed-pane-header-wrapper u-clearfix">
                <div className="tabbed-pane-header-content">
                    <div className="org-profile-avatar">
                        <div className="js-react-root">
                            <img src={logo} alt="thay doi logo"></img>
                            <span>Thay đổi</span>
                        </div>
                    </div>
                    <div className="tabbed-pane-header-details">
                        <div className="js-current-details">
                            <div className="js-react-root">
                                <div className="_3Tv3BQB32z31NL">
                                    <h1 className="_2bvXXmbrsPh8Ck">CNPM</h1><span className="_3LRjT6kbhThjbJ"><span className="nch-icon _3W-26fmi3tFfon j0fswhntKdStWa _1Xh35mJ-vlW3nT"><span className="sc-bdVaJa ckeJVZ" role="img" aria-label="PrivateIcon"><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5 11C5 9.89543 5.89543 9 7 9H8H10H14H16H17C18.1046 9 19 9.89543 19 11V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V11ZM10 11H14H16H17V19H7V11H8H10ZM14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M10.3817 5.69846C10.0982 6.10344 10 6.63103 10 7V9H8V7C8 6.36897 8.15175 5.39656 8.74327 4.55154C9.37523 3.64874 10.4367 3 12 3C13.5633 3 14.6248 3.64874 15.2567 4.55154C15.8482 5.39656 16 6.36897 16 7V9H14V7C14 6.63103 13.9018 6.10344 13.6183 5.69846C13.3752 5.35126 12.9367 5 12 5C11.0633 5 10.6248 5.35126 10.3817 5.69846Z" fill="currentColor"></path></svg></span></span>Riêng
                                    tư</span>
                                </div>
                                <div>
                                    <div className="Et7qpeaH3d--pj">
                                        <p>Nhóm CNPM UTE - App giao hàng nhanh</p>
                                    </div>
                                </div>
                                <button className="btn _3nslPxx5w1nLQy _3TTqkG5muwOzqZ _1Tu9wiuW4Te8Rx" type="button"><span className="nch-icon _3W-26fmi3tFfon j0fswhntKdStWa _1AxACHDBxA21Su"><span className="sc-bdVaJa jKipYA" role="img" aria-label="EditIcon"><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z" fill="currentColor"></path></svg></span></span>Chỉnh sửa chi tiết Không gian làm việc</button></div>
                        </div>
                        <form className="js-profile-form hide"></form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PaneHeader