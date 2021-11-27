import React, {useEffect, useState} from "react";
import { Modal,Button} from "react-bootstrap";
import { Form, Col, Row, InputGroup } from 'react-bootstrap'
import { Formik, Field } from "formik";

import boardEmpty from 'app/Images/features/empty-board.svg'

import FormSelectField from "app/Common/Form/FormSelect/FormSelect";
import * as yup from 'yup'

import './ModalAddWorkSpace.scss'

let schema = yup.object().shape({
    name: yup.string().trim().min(10).max(40).required('adadad').ensure().default(''),
    workspaceType: yup.string().required().ensure().default(''),
    description: yup.string().trim().min(0).max(60).ensure().default('')
  });

const workSpaceTypeList = [
    {
        _id: '123',
        name: 'Doanh nghiep nho'
    },
    {
        _id: '123',
        name: 'Marketing'
    },
    {
        _id: '123',
        name: 'Ky thuat cntt'
    },
    {
        _id: '123',
        name: 'Doanh nghiep nho'
    },
    {
        _id: '123',
        name: 'Doanh nghiep nho'
    },
    {
        _id: '123',
        name: 'Doanh nghiep nho'
    },
    {
        _id: '123',
        name: 'Doanh nghiep nho'
    },
    {
        _id: '123',
        name: 'Doanh nghiep nho'
    }
]

const ModalAddWorkSpace = (props) => {
    const { handleModal, show, handleModalInvite } = props

    const submitForm = () => 
    {
        handleModal('HIDE')
        //cho nay call API de them moi workspacee
        handleModalInvite('SHOW')
    }
    return (
        <Modal show={show} 
            onHide={() => handleModal('HIDE')}
            >
            <Row>
                <Col className="col-left" md={6}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo mới một không gian làm việc</Modal.Title>
                </Modal.Header>
                <Formik
                    validationSchema={schema}
                    onSubmit={submitForm}
                    initialValues={{
                        name: '',
                        workspaceType: undefined,
                        description: '',
                    }}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        isInvalid,
                        isSubmitting,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                <h6>Tăng năng suất của bạn bằng cách giúp mọi người dễ dàng truy cập bảng ở một vị trí.</h6>
                                <Form.Group  controlId="validationFormik01">
                                    <Form.Label>Tên không gian làm việc</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                        isInvalid={!!errors.name}
                                    />
                                    <span>Đây là tên của công ty, nhóm hoặc tổ chức của bạn.</span>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <FormSelectField
                                    controlId="validationFormik03"
                                    label="Loại không gian làm việc"
                                    type="text"
                                    name="workspaceType"
                                    array={workSpaceTypeList}
                                >
                                </FormSelectField>
                                <Form.Group  controlId="validationFormik03">
                                    <Form.Label>Mô tả không gian làm việc (Tùy chọn)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={!!errors.description}
                                        as="textarea"
                                    />
                                    <span>Đưa các thành viên của bạn vào bảng với mô tả ngắn về Không gian làm việc của bạn.</span>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                >Tiếp tục</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
                </Col>
                <Col className="col-right" md={6}>
                    <img src={boardEmpty} alt=""></img>
                </Col>
            </Row>
            
        </Modal>
    )
    
}

export default ModalAddWorkSpace


