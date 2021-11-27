import React from "react";
import { Dropdown, Button  } from "react-bootstrap";

import './PaneSetting.scss'


const PaneSetting =  () => 
{
    return(
        <div className="pane-setting">
            <div>
                <div className="window-module u-clearfix">
                    <div className="window-module-title">
                        <h3 className="u-inline">Khả năng hiển thị trong Không gian làm việc</h3>
                    </div>
                    <div className="setting-item">
                        <div className="setting-item-detail">
                            <div>
                                <div>
                                    <p>
                                        <span class="sc-bdVaJa ckeJVZ" role="img" aria-label="PrivateIcon"><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 11C5 9.89543 5.89543 9 7 9H8H10H14H16H17C18.1046 9 19 9.89543 19 11V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V11ZM10 11H14H16H17V19H7V11H8H10ZM14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.3817 5.69846C10.0982 6.10344 10 6.63103 10 7V9H8V7C8 6.36897 8.15175 5.39656 8.74327 4.55154C9.37523 3.64874 10.4367 3 12 3C13.5633 3 14.6248 3.64874 15.2567 4.55154C15.8482 5.39656 16 6.36897 16 7V9H14V7C14 6.63103 13.9018 6.10344 13.6183 5.69846C13.3752 5.35126 12.9367 5 12 5C11.0633 5 10.6248 5.35126 10.3817 5.69846Z" fill="currentColor"></path></svg></span>
                                        <span><strong>Bí mật</strong> - Đây là Không gian làm việc riêng tư. Chỉ những người trong Không gian làm việc có thể truy cập hoặc nhìn thấy Không gian làm việc.</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="setting-item-action"><button className="btn btn-primary button-link u-text-align-center">Thay đổi</button></div>
                    </div>
                </div>
            </div>
            <div className="js-react-root">
                <div className="js-react-root">
                    <div className="_3DdUxqvSzSG8p0">
                    <Dropdown className="d-inline mx-2" autoClose="outside">
                        <Dropdown.Toggle id="dropdown-autoclose-outside">
                        Clickable Inside
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                        <a className="_1vnCcs3IT2OLf5 _3TTqkG5muwOzqZ _1RPBq-YNVksXzg _1Tu9wiuW4Te8Rx" data-test-id="delete-workspace-button" type="button" style={{margin: "0px 4px 0px 0px;"}}>Xóa Không gian làm việc này?</a></div>
                </div>
            </div>
        </div>
    )
}
export default PaneSetting