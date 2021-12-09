import React, {useState} from "react";
import { Form , InputGroup} from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalAddNewBoard from "app/base/Modal/ModalAddNewBoard/ModalAddNewBoard";
import './PaneMainBoard.scss'
import { Link } from "react-router-dom";

const PaneMainBoard =  (props) => 
{
    const curWP = useSelector(state => state.workSpace.curWP)
    const ownerWP = useSelector(state => state.workSpace.owerWP)
    const guest = useSelector(state => state.workSpace.guestWP)
    const type = useSelector(state => state.workSpace.type)
    const { fetchWorkSpaceOwerAndGuest } = props
    const [ showAddNewBoard, setShowAddNewBoard ] = useState(false)
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
            {
                showAddNewBoard && <ModalAddNewBoard 
                                    showAddNewBoard={showAddNewBoard}
                                    setShowAddNewBoard={setShowAddNewBoard}
                                    ownerWP={ownerWP}
                                    fetchWorkSpaceOwerAndGuest={fetchWorkSpaceOwerAndGuest}
                                    />
            }
            <div className="boards-page-layout-list">
                <div className="boards-page-board-section">
                    <div>
                        <ul className="boards-page-board-section-list">
                            {
                                type === 'OWNER' && 
                                <li data-test-id="create-board-tile" className="boards-page-board-section-list-item boards-page-board-section-list-item--workspace-nav-expanded">
                                    <div className="board-tile mod-add" onClick={() => setShowAddNewBoard(true)}>
                                        <p><span>Tạo bảng mới</span></p>
                                    </div>
                                </li>
                            }
                            
                            {
                                curWP &&
                                curWP.boardId.map(item => (
                                    <li key={`board+${item._id}`} className="boards-page-board-section-list-item boards-page-board-section-list-item--workspace-nav-expanded">
                                        <a className="board-tile mod-light-background" 
                                            href={"/board/"+item._id} 
                                            style={{backgroundImage: `url(${item.avatar})`}}>
                                            <div className="board-tile mod-show">
                                                <p><span>{item.title}</span></p>
                                            </div>
                                        </a>
                                    </li>
                                ))
                            }
                            {
                                curWP?.boardId?.length === 0 && 
                                <div className="_3C1ARRDXoDx7-m">
                                    <img alt="Uh, không có ai ở đây có cái tên đó." className="_15AZHaZB4zq2Gi" src="https://a.trellocdn.com/prgb/dist/images/organization/missing.76c64abe1db1ea0f92df.svg"></img>
                                    <div className="N6pxYXUylS_c1r">
                                        Uh, bạn chưa tham gia vào bảng nào cả. Liên hệ quản trị viên để được thêm vào nhé
                                    </div>
                                </div>
                            }
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