import React, { Component } from 'react'

export default class Login extends Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthDate: ''
        };

        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChangeFirstName(event)
    {
        this.setState({firstName: event.target.value});
    }

    handleChangeLastName(event)
    {
        this.setState({lastName: event.target.value});
    }

    handleChangeBirthDate(event)
    {
        this.setState({birthDate: event.target.value});
    }

    handleRegister(event){
        if(this.state.firstName == null || this.state.firstName === ''){
            alert('missing first name')
            event.preventDefault(); //what does it do?
        }
        else if(this.state.lastName == null || this.state.lastName === ''){
            alert('missing lastName name')
            event.preventDefault(); //what does it do?
        }
        else if(this.state.birthDate == null || this.state.birthDate === ''){
            alert('missing birth date name')
            event.preventDefault(); //what does it do?
        }
        else{
            //somewhere here call the backend createuser function
            alert('user createdddd')
        }
    }
}