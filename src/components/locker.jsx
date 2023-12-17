import React, { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/locker.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLockerData, getLockerById, updateLocker, deleteLocker, addLocker } from '../services/lockerservice.jsx';

const Locker = () =>{
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [locker_number, setLockerNumber] = useState("");
    const [is_available, setIsAvailable] = useState("");


    const [edit_id, setEditId] = useState("");
    const [edit_locker_number, setEditLockerNumber] = useState("");
    const [edit_is_available, setEditIsAvailable] = useState("");

    useEffect(()=>{
        getData();
    },[])
    const getData = () => {
        getLockerData()
        .then((data) => {
            setData(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleEdit= (id) =>{
        handleShow(); 
        getLockerById(id)
        .then((result) => {
            setEditId(id);
            setEditLockerNumber(result.lockerNumber);
            setEditIsAvailable(result.isAvailable);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleUpdate = () => {
        const lockerData = {
            id: edit_id,
            lockerNumber: edit_locker_number,   
            isAvailable: edit_is_available,
        };
        
        updateLocker(edit_id, lockerData)
            .then(() => {
                getData();
                clear();
                toast.success('Updated successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete the locker?')) {
            deleteLocker(id).then(getData())
                .catch((error) => {
                    console.log(error);
                });
        }
};
    
const handleSave = async () => {
    setIsAvailable(true);
    const added = await addLocker(id, locker_number, setIsAvailable(true));

        if (added) {
        handleClose();
        getData();
        clear();
        toast.success("New locker is added");
        } else {
            console.error("Failed to add locker");
        }
        clear();
};


    const clear = () => {
        setId('');
        setLockerNumber('');
        setIsAvailable('');
    }
    
    return(

        <Fragment>
            <ToastContainer/>
            <Container className="md-100" > 
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter id" 
                    value={id} onChange={(e) => setId(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter locker number" 
                    value={locker_number} onChange={(e) => setLockerNumber(e.target.value) }/></Col>
                    {/* <Col>
                            <select
                                className="form-control"
                                value={is_available}
                                onChange={(e) => setIsAvailable(e.target.value === 'true')}
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </Col> */}
                    <Col><button className="btn btn-success" onClick={() => handleSave()}>Submit</button></Col>
                </Row>
                

            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>LockerNumber</th>
                        <th>IsAvailable</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
    {data && data.length > 0 ? (
        data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.lockerNumber}</td>
                <td>{item.isAvailable ? 'True' : 'False'}</td>
                <td colSpan={2}>
                    <button className="btn btn-secondary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={5}>Loading</td>
        </tr>
    )}
</tbody>

            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Locker</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <Container>
                        <Row>
                            <Col><input type="text" className="form-control" placeholder="Enter locker number" 
                            value={edit_locker_number} onChange={(e) => setEditLockerNumber(e.target.value) }/></Col>
                            <Col>
                            <select
                                className="form-control"
                                value={edit_is_available}
                                onChange={(e) => setEditIsAvailable(e.target.value === 'true')}
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </Col>

                            </Row>
                        </Container>
                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"  onClick={() => handleUpdate()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>

    )
}
export default Locker;