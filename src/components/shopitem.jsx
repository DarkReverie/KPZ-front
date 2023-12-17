import React, { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getShopItemData, getShopItemById, updateShopItem, deleteShopItem, addShopItem } from '../services/shopitemservice.jsx';
import '../styles/shopitem.css';

const ShopItem = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [edit_id, setEditId] = useState("");
    const [edit_name, setEditName] = useState("");
    const [edit_description, setEditDescription] = useState("");
    const [edit_price, setEditPrice] = useState("");
    const [edit_quantity, setEditStockQuantity] = useState("");
    

    // const [data, setData] = useState([]);
    // const [id, setId] = useState("");
    // const [locker_number, setLockerNumber] = useState("");
    // const [is_available, setIsAvailable] = useState("");


    // const [edit_id, setEditId] = useState("");
    // const [edit_locker_number, setEditLockerNumber] = useState("");
    // const [edit_is_available, setEditIsAvailable] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getShopItemData()
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEdit = (id) => {
        handleShow();
        getShopItemById(id)
            .then((result) => {
                setEditId(result.id);
                setEditName(result.name);
                setEditDescription(result.description);
                setEditPrice(result.price);
                setEditStockQuantity(result.stockQuantity);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUpdate = () => {
        const shopItemData = {
            id: edit_id,
            name: edit_name,
            description: edit_description,
            price: edit_price,
            stockQuantity: edit_quantity,
        };
        updateShopItem(edit_id, shopItemData)
            .then(() => {
                getData();
                clear();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete the shop item?')) {
            deleteShopItem(id)
                .then(getData())
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleSave = async () => {
        const added = await addShopItem(id, name, description, price, stockQuantity);

        if (added) {
            handleClose();
            getData();
            clear();
            toast.success("New shop item is added");
        } else {
            console.error("Failed to add shop item");
        }
    };

    const clear = () => {
        setId('');
        setName('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
    };
    return(

        <Fragment>
            <ToastContainer/>
            <Container className="md-100" > 
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter id" 
                    value={id} onChange={(e) => setId(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter name" 
                    value={name} onChange={(e) => setName(e.target.value) }/></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter description"
                    value={description} onChange={(e) => setDescription(e.target.value) }/></Col>
                      <Col><input type="text" className="form-control" placeholder="Enter price"
                    value={price} onChange={(e) => setPrice(e.target.value) }/></Col>
                      <Col><input type="text" className="form-control" placeholder="Enter stock quantity"
                    value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value) }/></Col>
                    <Col><button className="btn btn-success" onClick={() => handleSave()}>Submit</button></Col>
                </Row>
                

            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
    {data && data.length > 0 ? (
        data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.stockQuantity}</td>
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
                            <Col><input type="text" className="form-control" placeholder="Enter name" 
                            value={edit_name} onChange={(e) => setEditName(e.target.value) }/></Col>
                            <Col><input type="text" className="form-control" placeholder="Enter description" 
                            value={edit_description} onChange={(e) => setEditDescription(e.target.value) }/></Col>
                            <Col><input type="text" className="form-control" placeholder="Enter price" 
                            value={edit_price} onChange={(e) => setEditPrice(e.target.value) }/></Col>
                            <Col><input type="text" className="form-control" placeholder="Enter quantity" 
                            value={edit_quantity} onChange={(e) => setEditStockQuantity(e.target.value) }/></Col>

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
export default ShopItem;
