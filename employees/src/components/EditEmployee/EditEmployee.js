import React, { Component } from 'react';
import Link from 'react-router-link';
import { Button, Glyphicon } from 'react-bootstrap';
import axios from 'axios';

class EditEmployee extends Component{

    editEventHandler = () => {
        console.log(this.props.id);
        const values = {
            "name" :document.getElementById("txtName").value,
            "mobile" : document.getElementById("txtMob").value,
            "telephone" : document.getElementById("txtTel").value,
            "address" : document.getElementById("txtAddr").value,
            "userName" : document.getElementById("txtUsername").value,
            "password" : document.getElementById("txtPass").value
        };
        axios.put("http://employeesintern.azurewebsites.net/api/employees/"+this.props.id , values )
            .then((response) => {
                console.log(response);
                if(response.status === 204){
                    window.location.assign("");
                }
            });
    };
    render(){
        const elementArr = [
            { spanClass : 'star', type : 'text', id:'txtId', placeholder: 'Id'},
            { spanClass : 'user', type : 'text', id:'txtName', placeholder: 'Name'},
            { spanClass : 'user', type : 'text', id:'txtUsername', placeholder: 'User Name'},
            { spanClass : 'phone-alt', type : 'text', id:'txtTel', placeholder: 'Telephone'},
            { spanClass : 'earphone', type : 'text', id:'txtMob', placeholder: 'Mobile'},
            { spanClass : 'lock', type : 'password', id:'txtPass', placeholder: 'Password'},
            { spanClass : 'home', type : 'text', id:'txtAddr', placeholder: 'Address'},
        ];

        const inputElements =  elementArr.map( (value, index) => { return (
            <div className={"form-group row"} key={index}>
                <label htmlFor={value.id} className="col-sm-3 col-form-label">{value.placeholder}</label>
                <div className={"input-group  col-sm-8"}>
                    <span className="input-group-addon">
                        <i className={"glyphicon glyphicon-"+value.spanClass}></i>
                    </span>
                    <input type={value.type} className="form-control" id={value.id} placeholder={value.placeholder}
                     disabled={index === 0} value={index === 0 ? this.props.id : null}/>
                </div>
            </div>
        );
        });

        return (
            <div className={"EditEmployee container-fluid col-sm-6 col-sm-offset-3"}>
                <div className="row">
                    <div className="small-xs-4" align="center">

                    </div>

                </div>

                <form className="form" autoComplete="on">
                    {inputElements}
                    <div id="dataValidationEdit">
                    </div>
                    <input type="button" value="Edit" className={"btn btn-primary"} id="subEdit"
                    onClick={this.editEventHandler}/>
                </form>
            </div>
        );
    }
}

export default EditEmployee;
