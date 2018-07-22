import React, {Component} from 'react';
import './Home.css';
import axios from 'axios';
import EditEmployee from '../EditEmployee/EditEmployee';
import {Modal} from 'react-bootstrap'

class Home extends Component {

    state = {
        employees: [],
        view: null,
        idNeed: null,
        idDelete: null,
        modalShow: false
    };

    editEventHandle = (id) => {
        this.setState({
            view: 'Edit',
            idNeed: id
        });
    };

    componentDidMount() {
        axios.get("http://employeesintern.azurewebsites.net/api/employees")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        employees: response.data
                    })
                } else {

                }
            });
    }

    modalDeleteEventHandler = (id) => {
        this.setState({
            idDelete: id,
            modalShow: true
        });
    };

    modalHideEventHandler = () => {
        this.setState({
            modalShow: false
        });
    };

    deleteEventHandler = () => {
        axios.delete("http://employeesintern.azurewebsites.net/api/employees/" + this.state.idDelete)
            .then(response => {
                if (response.status === 204) {
                    console.log(response);
                    this.modalHideEventHandler();
                    this.componentDidMount();
                }
            });
    };

    render() {

        const employee = this.state.employees.map(((emp, index) => {
            return (<tr key={index}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.mobile}</td>
                <td>{emp.telephone}</td>
                <td>{emp.address}</td>
                <td>{emp.username}</td>
                <td>{emp.password}</td>
                <td>
                    <button className={"btn btn-primary"} style={{margin: '0 5px 5px 0'}}
                            onClick={() => this.editEventHandle(emp.id)}>Edit
                    </button>

                    <button className={"btn btn-danger"} style={{margin: '0 5px 5px 0'}}
                            onClick={() => this.modalDeleteEventHandler(emp.id)}>Delete
                    </button>
                </td>
            </tr>);
        }));

        return (
            <div>
                {this.state.view !== 'Edit' ?
                    <div className={'Home'}>
                        <div style={{marginBottom:'20px'}}>
                            <button id="btnCreate" className={"btn btn-success"} onClick={this.props.click}>
                                <span className={"glyphicon glyphicon-plus"}> </span> Create New
                            </button>
                        </div>
                        <table className={"table table-responsive table-hover table-condensed"}>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Tel</th>
                                <th>Address</th>
                                <th>User Name</th>
                                <th>Pass</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody id="tablebody">
                            {employee}
                            </tbody>
                        </table>
                        <Modal show={this.state.modalShow} container={this} onHide={this.modalHideEventHandler}>
                            <Modal.Body>
                                <p>Are You sure to delete this employee</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-default" onClick={this.modalHideEventHandler}>Close
                                </button>
                                <button className="btn btn-danger" id="btncondel"
                                        onClick={this.deleteEventHandler}>Delete
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    : <EditEmployee id={this.state.idNeed}/>
                }
            </div>
        );
    }
}

export default Home