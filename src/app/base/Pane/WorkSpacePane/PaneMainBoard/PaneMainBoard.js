import React from "react";
import { Form , InputGroup} from "react-bootstrap";
import './PaneMainBoard.scss'

const PaneMainBoard =  () => 
{
    return(
        <>
            <div className="boards-page-layout-topbar">
                <div className="_21AuhdrdEh-HCV">
                    <Form.Group  controlId='filterBoard'>
                        <Form.Label>Sắp xếp theo</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                as="select"
                            >
                                <option value="0">Hoạt động gần đây nhất</option>
                                <option value="1">Ít hoạt động gần đây nhất</option>
                                <option value="2">Theo bảng chữ cái A-Z</option>
                                <option value="3">Theo bảng chữ cái Z-A</option>
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group  controlId='searchBoard'>
                        <Form.Label>Tìm kiếm</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm các bảng trong không giam làm việc"
                            >
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                </div>
            </div>
            <div className="boards-page-layout-list">
                <div className="boards-page-board-section">
                    <div>
                        <ul className="boards-page-board-section-list">
                            <li data-test-id="create-board-tile" className="boards-page-board-section-list-item boards-page-board-section-list-item--workspace-nav-expanded">
                                <div className="board-tile mod-add">
                                    <p><span>Tạo bảng mới</span></p>
                                </div>
                            </li>
                            <li className="boards-page-board-section-list-item boards-page-board-section-list-item--workspace-nav-expanded">
                                <a className="board-tile mod-light-background" 
                                    href="/b/CFEVhROl/1-on-1-meeting-agenda" 
                                    style={{backgroundImage: `url()`}}>
                                    <div className="board-tile mod-show">
                                        <p><span>Tạo bảng mới</span></p>
                                    </div>
                                </a>
                            </li>
                            <li className="boards-page-board-section-list-item boards-page-board-section-list-item--workspace-nav-expanded">
                                <a className="board-tile mod-light-background" 
                                    href="/b/CFEVhROl/1-on-1-meeting-agenda" 
                                    style={{backgroundImage: `url()`}}>
                                    <div className="board-tile mod-show">
                                        <p><span>Tạo bảng mới</span></p>
                                    </div>
                                </a>
                            </li>
                            <li className="boards-page-board-section-list-item boards-page-board-section-list-item--workspace-nav-expanded">
                                <a className="board-tile mod-light-background" 
                                    href="/b/CFEVhROl/1-on-1-meeting-agenda" 
                                    style={{backgroundImage: `url()`}}>
                                    <div className="board-tile mod-show">
                                        <p><span>Tạo bảng mới</span></p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="boards-page-closed-boards-button-container">
                    <div className="js-react-root"></div>
                </div>
            </div>
        </>
    )
}
export default PaneMainBoard